import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-musteri-card',
  standalone: true,
  templateUrl: './musteri-card.html',
  styleUrl: './musteri-card.css'
})
export class MusteriCard {
  @Input() customer: any = {};
  @Input() variant: 'normal' | 'compact' | 'loading' | 'empty' = 'normal';
  @Input() status: 'active' | 'passive' | 'potential' = 'active';
  @Input() showStats = true;

  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  get initials(): string {
    const first = String(this.customer?.ad ?? '').trim().charAt(0);
    const last = String(this.customer?.soyad ?? '').trim().charAt(0);
    return (first + last || 'M').toUpperCase();
  }

  get fullName(): string {
    return `${this.customer?.ad ?? ''} ${this.customer?.soyad ?? ''}`.trim() || 'Müşteri';
  }

  get statusLabel(): string {
    return this.status === 'active' ? 'Aktif' : this.status === 'passive' ? 'Pasif' : 'Potansiyel';
  }

  handleView(): void { this.view.emit(this.customer); }
  handleEdit(): void { this.edit.emit(this.customer); }
  handleDelete(): void { this.delete.emit(this.customer); }
}
