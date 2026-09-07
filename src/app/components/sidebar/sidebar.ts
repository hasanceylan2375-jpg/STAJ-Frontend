import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SignalRService } from '../../services/signalr.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  private authService = inject(AuthService);
  private signalRService = inject(SignalRService);
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
    window.dispatchEvent(new CustomEvent('app-language-changed', { detail: language }));
  }

  private applyLanguageClass(): void {
    document.documentElement.classList.toggle('lang-en', this.selectedLanguage === 'en-US');
    document.documentElement.classList.toggle('lang-tr', this.selectedLanguage !== 'en-US');
  }

  logout(): void {
    void this.signalRService.stop();
    this.authService.logout();
    this.showLogoutMessage = true;

    setTimeout(() => {
      this.router.navigate(['/']);
      this.showLogoutMessage = false;
    }, 1200);
  }
}
