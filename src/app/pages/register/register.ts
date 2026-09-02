import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({ selector:'app-register', imports:[FormsModule], templateUrl:'./register.html', styleUrl:'./register.css' })
export class Register {
  kullaniciAdi=''; sifre=''; sifreTekrar=''; hata=''; yukleniyor=false;
  get isEnglish():boolean { return localStorage.getItem('language') === 'en-US'; }
  private http=inject(HttpClient); private router=inject(Router);
  kayitOl(){
    this.hata='';
    if(this.sifre!==this.sifreTekrar){this.hata=this.isEnglish?'Passwords do not match.':'Şifreler eşleşmiyor.';return;}
    this.yukleniyor=true;
    this.http.post<any>('https://localhost:7233/api/Auth/register',{kullaniciAdi:this.kullaniciAdi,sifre:this.sifre}).subscribe({
      next:()=>{this.yukleniyor=false;alert(this.isEnglish?'Registration successful. You can now log in.':'Kayıt başarılı. Şimdi giriş yapabilirsiniz.');this.router.navigate(['/login']);},
      error:(e)=>{this.yukleniyor=false;this.hata=e?.error?.mesaj||e?.error|| (this.isEnglish?'Registration failed.':'Kayıt oluşturulamadı.');}
    });
  }
}
