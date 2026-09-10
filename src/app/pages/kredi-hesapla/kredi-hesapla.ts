import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-kredi-hesapla',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kredi-hesapla.html',
  styleUrl: './kredi-hesapla.css'
})
export class KrediHesapla {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  krediTutari = 100000;
  vade = 120;
  faizOrani = 3;
  bsmvOrani = 15;
  kkdfOrani = 15;
  periyot = 1;
  tip = 'EsitTaksitli';
  sonuc: any = null;
  hata = '';
  hesapliyor = false;

  hesapla() {
    if (this.hesapliyor) return;

    this.hata = '';
    this.sonuc = null;
    this.hesapliyor = true;
    this.cdr.detectChanges();

    this.http.post<any>('/api/Kredi/odeme-plani', {
      krediTutari: this.krediTutari,
      vade: this.vade,
      faizOrani: this.faizOrani,
      bsmvOrani: this.bsmvOrani,
      kkdfOrani: this.kkdfOrani,
      periyot: this.periyot,
      tip: this.tip
    }).subscribe({
      next: r => {
        this.sonuc = r;
        this.hesapliyor = false;
        this.cdr.detectChanges();
      },
      error: e => {
        this.hata = e?.error?.mesaj || 'Ödeme planı oluşturulamadı.';
        this.hesapliyor = false;
        this.cdr.detectChanges();
      }
    });
  }

  tipSec(tip: 'EsitTaksitli' | 'EsitAnaparali') {
    this.tip = tip;
    this.sonuc = null;
    this.hata = '';
    this.cdr.detectChanges();
  }

  konutOrnegi() {
    this.krediTutari = 100000;
    this.vade = 120;
    this.faizOrani = 3;
    this.periyot = 1;
  }

  aracOrnegi() {
    this.krediTutari = 500000;
    this.vade = 48;
    this.faizOrani = 3;
    this.periyot = 1;
  }
}
