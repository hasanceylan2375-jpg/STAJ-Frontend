import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { LoadingService } from './services/loading.service';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { Toast } from './components/toast/toast';
import { AuthService } from './services/auth/auth.service';
import { SignalRService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Breadcrumb, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(public loadingService: LoadingService, private authService: AuthService, private signalRService: SignalRService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      void this.signalRService.start();
    }
  }
}
