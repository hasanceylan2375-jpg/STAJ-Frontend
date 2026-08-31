import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MusteriService } from '../../services/musteri.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-musteri-ekle',
  imports: [FormsModule],
  templateUrl: './musteri-ekle.html',
  styleUrl: './musteri-ekle.css'
})
export class MusteriEkle implements OnInit {
  ad = '';
  soyad = '';
  telefon = '';
  email = '';
  profilFotoUrl: string | null = null;
  secilenDosya: File | null = null;
  guncellenenId: number | null = null;

  constructor(
    private musteriService: MusteriService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const state = history.state || {};
    if (state.musteri) {
      this.guncellenenId = Number(state.musteri.id);
      this.ad = state.musteri.ad ?? '';
      this.soyad = state.musteri.soyad ?? '';
      this.telefon = state.musteri.telefon ?? '';
      this.email = state.musteri.email ?? '';
      this.profilFotoUrl = state.musteri.profilFotoUrl ?? null;
    }
  }

  fotografSec(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.secilenDosya = input.files?.[0] ?? null;
  }

  kaydet(): void {
    if (this.secilenDosya) {
      this.musteriService.fotografYukle(this.secilenDosya).subscribe({
        next: (response) => {
          this.profilFotoUrl = response.url;
          this.musteriyiKaydet();
        },
        error: () => this.toastService.error('Fotoğraf yüklenirken hata oluştu!')
      });
      return;
    }

    this.musteriyiKaydet();
  }

  private musteriyiKaydet(): void {
    const musteri = {
      id: this.guncellenenId ?? 0,
      ad: this.ad,
      soyad: this.soyad,
      telefon: this.telefon,
      email: this.email,
      profilFotoUrl: this.profilFotoUrl
    };

    if (this.guncellenenId !== null) {
      this.musteriService.musteriGuncelle(this.guncellenenId, musteri).subscribe({
        next: (response: any) => {
          this.toastService.success(response?.message || 'Müşteri başarıyla güncellendi!');
          this.formuTemizle();
        },
        error: (error) => {
          console.error('Güncelleme hatası:', error);
          this.toastService.error(error?.error?.message || `Güncelleme başarısız (${error?.status ?? 'bilinmeyen hata'}).`);
        }
      });
      return;
    }

    this.musteriService.musteriEkle(musteri).subscribe({
      next: (response: any) => {
        this.toastService.success(response?.message || 'Müşteri başarıyla eklendi!');
        this.formuTemizle();
        this.router.navigate(['/musteri-listele']);
      },
      error: (error) => {
        console.error(error);
        this.toastService.error(error?.error?.message || 'Müşteri eklenirken hata oluştu!');
      }
    });
  }

  formuTemizle(): void {
    this.ad = '';
    this.soyad = '';
    this.telefon = '';
    this.email = '';
    this.profilFotoUrl = null;
    this.secilenDosya = null;
    this.guncellenenId = null;
  }
}