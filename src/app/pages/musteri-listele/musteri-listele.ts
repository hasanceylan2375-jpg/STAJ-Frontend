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
  sort = '';
  page = 1;
  pageSize = 5;
  cursorModu = false;
  nextCursor: number | null = null;
  currentCursor: number | null = null;
  cursorGecmisi: (number | null)[] = [];

  constructor(private musteriService: MusteriService, private router: Router, private toastService: ToastService) {}

  ngOnInit(): void { this.musterileriGetir(); }

  musterileriGetir(): void {
    this.musteriService.getMusteriler(this.search, this.sort, this.page, this.pageSize).subscribe({
      next: (response: any) => this.musteriler.set(response.data ?? []),
      error: (error) => {
        console.error('Müşteriler alınamadı:', error);
        this.toastService.error(error?.error?.message || 'Müşteriler alınırken hata oluştu.');
      }
    });
  }

  cursorIleGetir(): void {
    this.musteriService.getMusterilerCursor(this.currentCursor, this.pageSize).subscribe({
      next: (response: any) => {
        const data = response.data ?? {};
        this.musteriler.set(data.items ?? []);
        this.nextCursor = data.nextCursor ?? null;
      },
      error: (error) => {
        console.error('Cursor pagination hatası:', error);
        this.toastService.error(error?.error?.message || 'Müşteriler alınırken hata oluştu.');
      }
    });
  }

  cursorModunuDegistir(): void {
    this.cursorModu = !this.cursorModu;
    this.currentCursor = null;
    this.nextCursor = null;
    this.cursorGecmisi = [];
    this.page = 1;
    this.cursorModu ? this.cursorIleGetir() : this.musterileriGetir();
  }

  cursorSonraki(): void {
    if (this.nextCursor === null || this.musteriler().length < this.pageSize) return;
    this.cursorGecmisi.push(this.currentCursor);
    this.currentCursor = this.nextCursor;
    this.cursorIleGetir();
  }

  cursorOnceki(): void {
    if (this.cursorGecmisi.length === 0) return;
    this.currentCursor = this.cursorGecmisi.pop() ?? null;
    this.cursorIleGetir();
  }

  ara(): void { this.page = 1; this.musterileriGetir(); }
  sirala(): void { this.page = 1; this.musterileriGetir(); }

  temizle(): void {
    this.search = '';
    this.sort = '';
    this.page = 1;
    this.musterileriGetir();
  }

  oncekiSayfa(): void {
    if (this.page > 1) { this.page--; this.musterileriGetir(); }
  }

  sonrakiSayfa(): void {
    if (this.musteriler().length === this.pageSize) { this.page++; this.musterileriGetir(); }
  }

  musteriSil(id: number): void {
    if (confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) {
      this.musteriService.musteriSil(id).subscribe({
        next: (response: any) => {
          this.toastService.success(response?.message || 'Müşteri başarıyla silindi.');
          this.cursorModu ? this.cursorIleGetir() : this.musterileriGetir();
        },
        error: (error) => this.toastService.error(error?.error?.message || 'Müşteri silinirken hata oluştu.')
      });
    }
  }

  musteriGuncelle(musteri: any): void { this.router.navigate(['/musteri-ekle'], { state: { musteri } }); }
}