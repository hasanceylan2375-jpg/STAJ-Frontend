import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) },
  { path: 'features', loadComponent: () => import('./pages/features/features').then(m => m.Features) },
  { path: 'faq', loadComponent: () => import('./pages/faq/faq').then(m => m.Faq) },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: 'forbidden', loadComponent: () => import('./pages/forbidden/forbidden').then(m => m.Forbidden) },
  { path: 'profile', canActivate: [authGuard], loadComponent: () => import('./pages/profile/profile').then(m => m.Profile) },
  { path: 'musteri-ekle', canActivate: [authGuard], loadComponent: () => import('./pages/musteri-ekle/musteri-ekle').then(m => m.MusteriEkle) },
  { path: 'musteri-listele', canActivate: [authGuard], loadComponent: () => import('./pages/musteri-listele/musteri-listele').then(m => m.MusteriListele) },
  { path: 'mail', canActivate: [authGuard], loadComponent: () => import('./pages/mail/mail').then(m => m.Mail) },
  { path: 'not-found', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) },
  { path: '**', redirectTo: 'not-found' }
];
