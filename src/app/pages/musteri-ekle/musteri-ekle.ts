import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusteriService } from '../../services/musteri.service';

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

  constructor(private musteriService: MusteriService) {}
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
  kaydet() {

    const musteri = {
      ad: this.ad,
      soyad: this.soyad,
      telefon: this.telefon,
      email: this.email
    };

    // Güncelleme modu
    if (this.guncellenenId !== null) {

      this.musteriService.musteriGuncelle(this.guncellenenId, musteri).subscribe({
        next: () => {
          alert('Müşteri başarıyla güncellendi!');

          this.formuTemizle();
        },
        error: (error) => {
          console.error(error);
          alert('Müşteri güncellenirken hata oluştu!');
        }
      });

      return;
    }

    // Yeni müşteri ekleme
    this.musteriService.musteriEkle(musteri).subscribe({
      next: () => {
        alert('Müşteri başarıyla eklendi!');

        this.formuTemizle();
      },
      error: (error) => {
        console.error(error);
        alert('Müşteri eklenirken hata oluştu!');
      }
    });
  }

  formuTemizle() {
    this.ad = '';
    this.soyad = '';
    this.telefon = '';
    this.email = '';
    this.guncellenenId = null;
  }
}