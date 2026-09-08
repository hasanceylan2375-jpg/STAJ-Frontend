import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError, timeout } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { environment } from '../../environments/environment';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const isApiRequest = req.url.startsWith('/api/') || req.url.startsWith('/hubs/');

  if (!isApiRequest) {
    return next(req);
  }

  const url = `${API_CONFIG.BASE_URL}${req.url}`;
  const request = req.clone({ url });

  if (!environment.production) {
    console.debug('[API]', req.method, url);
  }

  return next(request).pipe(
    timeout(API_CONFIG.TIMEOUT_MS),
    catchError((error: unknown) => {
      if (!environment.production) {
        if (error instanceof HttpErrorResponse) {
          console.error(`[API] ${error.status} ${req.method} ${url}`, error.error);
        } else {
          console.error(`[API] İstek başarısız: ${req.method} ${url}`, error);
        }
      }

      return throwError(() => error);
    })
  );
};
