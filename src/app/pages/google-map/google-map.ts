import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

interface MapPlace {
  name: string;
  lat: number;
  lng: number;
  type: 'merkez' | 'sube';
}

@Component({
  selector: 'app-google-map',
  imports: [CommonModule, FormsModule],
  templateUrl: './google-map.html',
  styleUrl: './google-map.css'
})
export class GoogleMap {
  arama = '';
  rotaBaslangic = '';
  rotaVaris = '';
  seciliYer: MapPlace | null = null;
  private readonly sanitizer = inject(DomSanitizer);

  readonly yerler: MapPlace[] = [
    { name: 'Merkez Ofis', lat: 41.4564, lng: 31.7987, type: 'merkez' },
    { name: 'Şube Ofis', lat: 41.4500, lng: 31.7920, type: 'sube' }
  ];

  get filtrelenmisYerler(): MapPlace[] {
    const term = this.arama.trim().toLocaleLowerCase('tr-TR');
    if (!term) return this.yerler;
    return this.yerler.filter(y => y.name.toLocaleLowerCase('tr-TR').includes(term));
  }

  get merkez(): MapPlace {
    return this.seciliYer ?? this.yerler[0];
  }

  get mapUrl(): SafeResourceUrl {
    const url = `https://www.google.com/maps?q=${this.merkez.lat},${this.merkez.lng}&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get mapsSearchUrl(): string {
    const query = encodeURIComponent(this.arama.trim() || this.merkez.name);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  get directionsUrl(): string {
    const origin = encodeURIComponent(this.rotaBaslangic || this.yerler[0].name);
    const destination = encodeURIComponent(this.rotaVaris || this.yerler[1].name);
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
  }

  yerSec(place: MapPlace): void {
    this.seciliYer = place;
    this.arama = place.name;
  }

  ara(): void {
    const firstMatch = this.filtrelenmisYerler[0];
    if (firstMatch) this.yerSec(firstMatch);
  }

  rotaOlustur(): void {
    if (!this.rotaBaslangic) this.rotaBaslangic = this.yerler[0].name;
    if (!this.rotaVaris) this.rotaVaris = this.yerler[1].name;
  }
}
