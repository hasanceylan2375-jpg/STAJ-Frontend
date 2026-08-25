import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { LoadingService } from './services/loading.service';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Breadcrumb],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(public loadingService: LoadingService) {}

}