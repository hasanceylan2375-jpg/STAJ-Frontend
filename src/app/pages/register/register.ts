import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { finalize, timeout } from 'rxjs';

@Component({ selector:'app-register', imports:[FormsModule, RouterLink], templateUrl:'./register.html', styleUrl:'./register.css' })
export class Register {
  kullaniciAdi=''; sifre=''; sifreTekrar=''; hata=''; yukleniyor=false;
  get isEnglish():boolean { return localStorage.getItem('language') === 'en-US'; }
  private http=inject(HttpClient); private router=inject(Router);

  kayitOl(){
    if(this.yukleniyor) return;
    this.hata='';
    if(this.sifre!==this.sifreTekrar){
      this.hata=this.isEnglish?'Passwords do not match.':'Şifreler eşleşmiyor.';
      return;
    }

    this.yukleniyor=true;
    this.http.post<any>('https://localhost:7233/api/Auth/register',{
      kullaniciAdi:this.kullaniciAdi.trim(),
      sifre:this.sifre
    }).pipe(
      timeout(10000),
      finalize(()=>this.yukleniyor=false)
    ).subscribe({
      next:()=>{
        alert(this.isEnglish?'Registration successful. You can now log in.':'Kayıt başarılı. Şimdi giriş yapabilirsiniz.');
        this.router.navigate(['/login']);
      },
      error:(e)=>{
        if(e?.name==='TimeoutError'){
          this.hata=this.isEnglish?'The server did not respond. Please make sure the backend is running.':'Sunucudan yanıt alınamadı. Backend’in çalıştığından emin olun.';
          return;
        }
        this.hata=e?.error?.mesaj||e?.error|| (this.isEnglish?'Registration failed.':'Kayıt oluşturulamadı.');
      }
    });
  }
}
