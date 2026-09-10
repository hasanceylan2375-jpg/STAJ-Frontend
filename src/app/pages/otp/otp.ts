import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './otp.html',
  styleUrl: './otp.css'
})
export class Otp {
  private http = inject(HttpClient);
  hedef = '';
  kod = '';
  gonderildi = false;
  kalanSure = 0;
  mesaj = '';
  hata = '';

  gonder() {
    this.mesaj = '';
    this.hata = '';
    this.http.post<any>('api/Otp/gonder', { hedef: this.hedef, kanal: 'Eposta' }).subscribe({
      next: r => {
        this.gonderildi = true;
        this.kalanSure = 60;
        this.mesaj = r.mesaj;
        const timer = setInterval(() => {
          this.kalanSure--;
          if (this.kalanSure <= 0) clearInterval(timer);
        }, 1000);
      },
      error: e => this.hata = e?.error?.mesaj || 'OTP gönderilemedi.'
    });
  }

  dogrula() {
    this.mesaj = '';
    this.hata = '';
    this.http.post<any>('api/Otp/dogrula', { hedef: this.hedef, kod: this.kod }).subscribe({
      next: r => this.mesaj = r.mesaj,
      error: e => this.hata = e?.error?.mesaj || 'OTP doğrulanamadı.'
    });
  }
}
