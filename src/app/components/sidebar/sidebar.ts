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

  logout(): void {
    this.authService.logout();
    this.showLogoutMessage = true;

    setTimeout(() => {
      this.router.navigate(['/']);
      this.showLogoutMessage = false;
    }, 1200);
  }
}
