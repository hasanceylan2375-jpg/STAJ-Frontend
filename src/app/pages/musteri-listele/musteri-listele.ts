import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MusteriService } from '../../services/musteri.service';

@Component({
  selector: 'app-musteri-listele',
  imports: [],
  templateUrl: './musteri-listele.html',
  styleUrl: './musteri-listele.css'
})
export class MusteriListele implements OnInit {

  musteriler = signal<any[]>([]);

  constructor(
    private musteriService: MusteriService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.musteriService.getMusteriler().subscribe({
      next: (data) => {
        console.log('Gelen müşteriler:', data);
        this.musteriler.set(data);
        console.log('Atandıktan sonra:', this.musteriler().length);
      },
      error: (error) => {
        console.error('Müşteriler alınamadı:', error);
      }
    });
  }

  musteriSil(id: number): void {
    if (confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) {
      this.musteriService.musteriSil(id).subscribe({
        next: () => {
          this.musteriler.update(
            liste => liste.filter(musteri => musteri.id !== id)
          );
          alert('Müşteri silindi.');
        },
        error: (error) => {
          console.error('Müşteri silinemedi:', error);
          alert('Müşteri silinirken hata oluştu.');
        }
      });
    }
  }

  musteriGuncelle(musteri: any): void {
    this.router.navigate(['/musteri-ekle'], {
      state: { musteri: musteri }
    });
  }
}