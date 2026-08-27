import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MusteriService } from '../../services/musteri.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-musteri-listele',
  imports: [FormsModule],
  templateUrl: './musteri-listele.html',
  styleUrl: './musteri-listele.css'
})
export class MusteriListele implements OnInit {
  musteriler = signal<any[]>([]);
  search = '';

  constructor(
    private musteriService: MusteriService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.musterileriGetir();
  }

  musterileriGetir(): void {
    this.musteriService.getMusteriler(this.search).subscribe({
      next: (response: any) => {
        this.musteriler.set(response.data ?? []);
      },
      error: (error) => {
        console.error('Müşteriler alınamadı:', error);
        this.toastService.error(error?.error?.message || 'Müşteriler alınırken hata oluştu.');
      }
    });
  }

  ara(): void {
    this.musterileriGetir();
  }

  musteriSil(id: number): void {
    if (confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) {
      this.musteriService.musteriSil(id).subscribe({
        next: (response: any) => {
          this.musteriler.update(liste => liste.filter(musteri => musteri.id !== id));
          this.toastService.success(response?.message || 'Müşteri başarıyla silindi.');
        },
        error: (error) => {
          console.error('Müşteri silinemedi:', error);
          this.toastService.error(error?.error?.message || 'Müşteri silinirken hata oluştu.');
        }
      });
    }
  }

  musteriGuncelle(musteri: any): void {
    this.router.navigate(['/musteri-ekle'], {
      state: { musteri }
    });
  }
}