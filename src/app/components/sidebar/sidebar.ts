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
  isLoggingOut = false;

  logout(): void {
    if (this.isLoggingOut) return;

    this.isLoggingOut = true;

    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/']);
    }, 900);
  }
}
