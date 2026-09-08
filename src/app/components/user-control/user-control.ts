import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface UserControlModel {
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  avatarUrl?: string;
}

@Component({
  selector: 'app-user-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-control.html',
  styleUrl: './user-control.css'
})
export class UserControl {
  @Input() user: UserControlModel = {
    name: '', email: '', role: 'User', status: 'active'
  };
  @Input() editable = false;
  @Input() compact = false;
  @Input() loading = false;
  @Input() showActions = true;

  @Output() save = new EventEmitter<UserControlModel>();
  @Output() cancel = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  editing = false;
  draft: UserControlModel = this.copy(this.user);
  error = '';

  ngOnChanges(): void {
    if (!this.editing) this.draft = this.copy(this.user);
  }

  startEdit(): void {
    this.error = '';
    this.draft = this.copy(this.user);
    this.editing = true;
  }

  cancelEdit(): void {
    this.error = '';
    this.draft = this.copy(this.user);
    this.editing = false;
    this.cancel.emit();
  }

  submit(): void {
    this.error = '';
    if (!this.draft.name.trim()) {
      this.error = 'Ad Soyad zorunludur.';
      return;
    }
    if (!this.draft.email.trim() || !this.isEmailValid(this.draft.email)) {
      this.error = 'Geçerli bir e-posta adresi giriniz.';
      return;
    }
    this.save.emit(this.copy(this.draft));
    this.editing = false;
  }

  private isEmailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  private copy(user: UserControlModel): UserControlModel {
    return { ...user };
  }
}
