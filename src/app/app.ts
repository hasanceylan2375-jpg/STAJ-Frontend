import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { LoadingService } from './services/loading.service';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { Toast } from './components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Breadcrumb, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public loadingService: LoadingService) {}
}