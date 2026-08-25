import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return authService.isLoggedIn();
};