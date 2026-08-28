import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  private authService = inject(AuthService);
  private router = inject(Router);
  showLogoutMessage = false;
  selectedLanguage = localStorage.getItem('language') ?? 'tr-TR';

  constructor() {
    this.applyLanguageClass();
  }

  setLanguage(language: string): void {
    this.selectedLanguage = language;
    localStorage.setItem('language', language);
    this.applyLanguageClass();
  }

  private applyLanguageClass(): void {
    document.documentElement.classList.toggle('lang-en', this.selectedLanguage === 'en-US');
    document.documentElement.classList.toggle('lang-tr', this.selectedLanguage !== 'en-US');
  }

  logout(): void {
    this.authService.logout();
    this.showLogoutMessage = true;

    setTimeout(() => {
      this.router.navigate(['/']);
      this.showLogoutMessage = false;
    }, 1200);
  }
}
