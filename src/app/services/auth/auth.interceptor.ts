import {
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { LoadingService } from '../loading.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const loadingService = inject(LoadingService);

  const token = authService.getToken();
  const language = localStorage.getItem('language') ?? 'tr-TR';

  loadingService.show();

  const headers: Record<string, string> = {
    'Accept-Language': language
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  req = req.clone({ setHeaders: headers });

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isRefreshRequest = req.url.includes('/api/Auth/refresh');
      const isLoginRequest = req.url.includes('/api/Auth/login');

      if (error.status === 401 && !isRefreshRequest && !isLoginRequest && authService.getRefreshToken()) {
        return authService.refreshAccessToken().pipe(
          switchMap(() => {
            const newToken = authService.getToken();
            const retryRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
                'Accept-Language': language
              }
            });

            return next(retryRequest);
          }),
          catchError(refreshError => {
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    }),
    finalize(() => {
      loadingService.hide();
    })
  );
};
