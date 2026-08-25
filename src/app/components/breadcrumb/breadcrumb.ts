import { Component, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  imports: [],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css'
})
export class Breadcrumb {

  currentPage = signal('Ana Sayfa');

  constructor(private router: Router) {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {

        if (event.urlAfterRedirects.includes('musteri-ekle')) {
          this.currentPage.set('Müşteri Ekle');

        } else if (event.urlAfterRedirects.includes('musteri-listele')) {
          this.currentPage.set('Müşteri Listele');

        } else {
          this.currentPage.set('Ana Sayfa');
        }

      });
  }
}