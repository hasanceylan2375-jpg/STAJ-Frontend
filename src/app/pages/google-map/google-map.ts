import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface MapPlace {
  name: string;
  lat: number;
  lng: number;
  type: 'merkez' | 'sube';
}

@Component({
  selector: 'app-google-map',
  imports: [FormsModule],
  templateUrl: './google-map.html',
  styleUrl: './google-map.css'
})
export class GoogleMap {
  arama = '';
  aktifHarita = 'roadmap';
  rotaBaslangic = '';
  rotaVaris = '';
  seciliYer: MapPlace | null = null;

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

  get mapUrl(): string {
    const place = `${this.merkez.lat},${this.merkez.lng}`;
    return `https://www.google.com/maps/embed/v1/view?center=${this.merkez.lat},${this.merkez.lng}&zoom=13&maptype=${this.aktifHarita}&key=YOUR_GOOGLE_MAPS_API_KEY`;
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
