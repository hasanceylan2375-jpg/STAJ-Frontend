import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  guncellenenId: number | null = null;

  constructor(
    private musteriService: MusteriService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const state = history.state || {};

    if (state.musteri) {
      this.guncellenenId = state.musteri.id;
      this.ad = state.musteri.ad;
      this.soyad = state.musteri.soyad;
      this.telefon = state.musteri.telefon;
      this.email = state.musteri.email;
    }
  }

  kaydet(): void {
    const musteri = {
      ad: this.ad,
      soyad: this.soyad,
      telefon: this.telefon,
      email: this.email
    };

    if (this.guncellenenId !== null) {
      this.musteriService.musteriGuncelle(this.guncellenenId, musteri).subscribe({
        next: (response: any) => {
          this.toastService.success(response?.message || 'Müşteri başarıyla güncellendi!');
          this.formuTemizle();
        },
        error: (error) => {
          console.error(error);
          this.toastService.error(error?.error?.message || 'Müşteri güncellenirken hata oluştu!');
        }
      });
      return;
    }

    this.musteriService.musteriEkle(musteri).subscribe({
      next: (response: any) => {
        this.toastService.success(response?.message || 'Müşteri başarıyla eklendi!');
        this.formuTemizle();
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
    this.guncellenenId = null;
  }
}