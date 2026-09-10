import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SignalRService } from '../../services/signalr.service';

interface CaptchaChallenge {
  id: string;
  question: string;
}

@Component({ selector:'app-login', imports:[FormsModule, RouterLink], templateUrl:'./login.html', styleUrl:'./login.css' })
export class Login implements OnInit {
  kullaniciAdi='';
  sifre='';
  captchaId='';
  captchaQuestion='';
  captchaAnswer='';
  captchaLoading=false;
  get isEnglish():boolean { return localStorage.getItem('language') === 'en-US'; }
  private http=inject(HttpClient); private authService=inject(AuthService); private router=inject(Router); private signalRService=inject(SignalRService);

  ngOnInit(){ this.loadCaptcha(); }

  loadCaptcha(){
    this.captchaLoading=true;
    this.captchaAnswer='';
    this.http.get<CaptchaChallenge>('/api/Captcha').subscribe({
      next:(response)=>{
        this.captchaId=response.id;
        this.captchaQuestion=response.question;
        this.captchaLoading=false;
      },
      error:()=>{
        this.captchaId='';
        this.captchaQuestion='';
        this.captchaLoading=false;
        alert(this.isEnglish?'CAPTCHA could not be loaded. Please try again.':'CAPTCHA yüklenemedi. Lütfen tekrar deneyin.');
      }
    });
  }

  login(){
    if(!this.captchaId || !this.captchaAnswer.trim()){
      alert(this.isEnglish?'Please solve the CAPTCHA.':'Lütfen CAPTCHA sorusunu çözün.');
      return;
    }

    const headers={
      'X-Captcha-Id':this.captchaId,
      'X-Captcha-Answer':this.captchaAnswer.trim()
    };

    this.http.post<any>('/api/Auth/login',{kullaniciAdi:this.kullaniciAdi,sifre:this.sifre},{headers}).subscribe({
      next:async (response)=>{
        this.authService.login(response.accessToken,response.refreshToken);
        await this.signalRService.start();
        this.router.navigate(['/musteri-listele']);
      },
      error:(error)=>{
        const message=error?.error?.mesaj;
        alert(message || (this.isEnglish?'Invalid username or password.':'Kullanıcı adı veya şifre hatalı.'));
        this.loadCaptcha();
      }
    });
  }
}
