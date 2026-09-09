import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MusteriService } from '../../services/musteri.service';
import { ToastService } from '../../services/toast.service';
import { ImageService } from '../../services/image.service';
import { WorkflowService } from '../../services/workflow.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({ selector: 'app-musteri-ekle', imports: [FormsModule], templateUrl: './musteri-ekle.html', styleUrl: './musteri-ekle.css' })
export class MusteriEkle implements OnInit {
  ad = ''; soyad = ''; telefon = ''; email = ''; tcKimlikNo = ''; dogumTarihi = '';
  maxDogumTarihi = this.onSekizYasSiniri(); profilFotoUrl: string | null = null; secilenDosya: File | null = null; guncellenenId: number | null = null; yukleniyor = false;

  constructor(private musteriService: MusteriService, private toastService: ToastService, private imageService: ImageService, private workflowService: WorkflowService, private authService: AuthService, private router: Router) {}
  ngOnInit(): void { const state = history.state || {}; if (state.musteri) { this.guncellenenId = Number(state.musteri.id); this.ad = state.musteri.ad ?? ''; this.soyad = state.musteri.soyad ?? ''; this.telefon = state.musteri.telefon ?? ''; this.email = state.musteri.email ?? ''; this.tcKimlikNo = state.musteri.tcKimlikNo ?? ''; this.dogumTarihi = state.musteri.dogumTarihi ? state.musteri.dogumTarihi.substring(0, 10) : ''; this.profilFotoUrl = state.musteri.profilFotoUrl ?? null; } }
  private onSekizYasSiniri(): string { const tarih = new Date(); tarih.setFullYear(tarih.getFullYear() - 18); return tarih.toISOString().split('T')[0]; }
  fotografSec(event: Event): void { const input = event.target as HTMLInputElement; this.secilenDosya = input.files?.[0] ?? null; }

  kaydet(): void {
    this.yukleniyor = true;
    if (this.secilenDosya) {
      this.imageService.upload(this.secilenDosya).subscribe({
        next: r => { this.profilFotoUrl = r.url; this.musteriKaydiniGonder(); },
        error: e => { this.yukleniyor = false; this.toastService.error(e?.message || 'Fotoğraf yüklenemedi!'); }
      });
      return;
    }
    this.musteriKaydiniGonder();
  }

  private musteriKaydiniGonder(): void {
    const musteri = { id: 0, ad: this.ad, soyad: this.soyad, telefon: this.telefon, email: this.email, tcKimlikNo: this.tcKimlikNo, dogumTarihi: this.dogumTarihi ? `${this.dogumTarihi}T00:00:00Z` : null, profilFotoUrl: this.profilFotoUrl };

    if (this.guncellenenId !== null) {
      this.musteriService.musteriGuncelle(this.guncellenenId, { ...musteri, id: this.guncellenenId }).subscribe({
        next: (r: any) => { this.yukleniyor = false; this.toastService.success(r?.message || 'Müşteri başarıyla güncellendi!'); this.formuTemizle(); },
        error: (e: any) => { this.yukleniyor = false; this.toastService.error(this.hataMesaji(e) || 'Güncelleme başarısız!'); }
      });
      return;
    }

    if (this.authService.isAdmin()) {
      const idempotencyKey = crypto.randomUUID();
      this.musteriService.musteriEkle(musteri, idempotencyKey).subscribe({
        next: (r: any) => { this.yukleniyor = false; this.toastService.success(r?.message || 'Müşteri başarıyla oluşturuldu.'); this.formuTemizle(); },
        error: (e: any) => { this.yukleniyor = false; this.toastService.error(this.hataMesaji(e) || 'Müşteri oluşturulamadı!'); }
      });
      return;
    }

    this.workflowService.start(musteri).subscribe({
      next: () => { this.yukleniyor = false; this.toastService.success('Müşteri ekleme talebi müdür onayına gönderildi.'); this.formuTemizle(); this.router.navigate(['/workflow-taleplerim']); },
      error: (e: any) => { this.yukleniyor = false; this.toastService.error(this.hataMesaji(e) || 'Müşteri ekleme talebi oluşturulamadı!'); }
    });
  }

  private hataMesaji(e: any): string {
    if (Array.isArray(e?.error)) return e.error.join(' ');
    if (Array.isArray(e?.error?.errors)) return e.error.errors.join(' ');
    return e?.error?.message || e?.error || e?.message || '';
  }

  formuTemizle(): void { this.ad = ''; this.soyad = ''; this.telefon = ''; this.email = ''; this.tcKimlikNo = ''; this.dogumTarihi = ''; this.profilFotoUrl = null; this.secilenDosya = null; this.guncellenenId = null; }
}
