import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';

interface Preference { theme: 'light' | 'dark'; language: 'tr-TR' | 'en-US'; }
interface ProfileForm { name: string; email: string; phone: string; }
interface CartItem { id: number; name: string; price: number; quantity: number; }

@Component({
  selector: 'app-local-storage',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './local-storage.html',
  styleUrl: './local-storage.css'
})
export class LocalStorage implements OnInit {
  private readonly storage = inject(LocalStorageService);
  readonly keys = { preferences: 'staj.preferences', form: 'staj.profile-form', cart: 'staj.cart' };

  preference: Preference = { theme: 'light', language: 'tr-TR' };
  profile: ProfileForm = { name: '', email: '', phone: '' };
  cart: CartItem[] = [];
  rawKey = 'staj.demo';
  rawValue = '';
  message = '';
  products = [
    { id: 1, name: 'Laptop', price: 25000 },
    { id: 2, name: 'Klavye', price: 1200 },
    { id: 3, name: 'Mouse', price: 850 }
  ];

  ngOnInit(): void {
    this.preference = this.storage.get<Preference>(this.keys.preferences, this.preference);
    this.profile = this.storage.get<ProfileForm>(this.keys.form, this.profile);
    this.cart = this.storage.get<CartItem[]>(this.keys.cart, []);
  }

  setDemo(): void {
    this.storage.set(this.rawKey, this.rawValue);
    this.message = `${this.rawKey} kaydedildi.`;
  }

  getDemo(): void {
    this.rawValue = this.storage.get<string>(this.rawKey, '');
    this.message = this.storage.has(this.rawKey) ? `${this.rawKey} okundu.` : 'Kayıt bulunamadı.';
  }

  removeDemo(): void { this.storage.remove(this.rawKey); this.rawValue = ''; this.message = 'Kayıt silindi.'; }

  clearDemo(): void {
    this.storage.clear();
    this.preference = { theme: 'light', language: 'tr-TR' };
    this.profile = { name: '', email: '', phone: '' };
    this.cart = [];
    this.message = 'Local Storage temizlendi.';
  }

  savePreferences(): void {
    this.storage.set(this.keys.preferences, this.preference);
    document.documentElement.dataset['theme'] = this.preference.theme;
    localStorage.setItem('language', this.preference.language);
    this.message = 'Kullanıcı tercihleri kaydedildi.';
  }

  saveProfile(): void {
    if (!this.profile.name.trim() || !this.profile.email.includes('@')) {
      this.message = 'Ad ve geçerli e-posta zorunludur.';
      return;
    }
    this.storage.set(this.keys.form, this.profile);
    this.message = 'Form bilgileri kaydedildi.';
  }

  addToCart(product: { id: number; name: string; price: number }): void {
    const existing = this.cart.find(x => x.id === product.id);
    if (existing) existing.quantity++;
    else this.cart.push({ ...product, quantity: 1 });
    this.saveCart();
  }

  removeFromCart(id: number): void {
    this.cart = this.cart.filter(x => x.id !== id);
    this.saveCart();
  }

  saveCart(): void { this.storage.set(this.keys.cart, this.cart); this.message = 'Sepet Local Storage\'a kaydedildi.'; }
  get total(): number { return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0); }
  get storageKeys(): string[] { return this.storage.keys(); }
}
