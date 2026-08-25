import {
  HttpInterceptorFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { AuthService } from './auth.service';
import { LoadingService } from '../loading.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const loadingService = inject(LoadingService);

  const token = authService.getToken();

  loadingService.show();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    finalize(() => {
      loadingService.hide();
    })
  );
};