import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({ selector:'app-login', imports:[FormsModule], templateUrl:'./login.html', styleUrl:'./login.css' })
export class Login {
  kullaniciAdi=''; sifre='';
  get isEnglish():boolean { return localStorage.getItem('language') === 'en-US'; }
  private http=inject(HttpClient); private authService=inject(AuthService); private router=inject(Router);
  login(){this.http.post<any>('https://localhost:7233/api/Auth/login',{kullaniciAdi:this.kullaniciAdi,sifre:this.sifre}).subscribe({next:(response)=>{this.authService.login(response.accessToken,response.refreshToken);this.router.navigate(['/musteri-listele']);},error:()=>{alert(this.isEnglish?'Invalid username or password.':'Kullanıcı adı veya şifre hatalı.');}});}
}