import { Component, AfterViewInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SignalRService } from '../../services/signalr.service';
import { RECAPTCHA_SITE_KEY } from '../../config/recaptcha.config';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

@Component({ selector:'app-login', imports:[FormsModule, RouterLink], templateUrl:'./login.html', styleUrl:'./login.css' })
export class Login implements AfterViewInit {
  kullaniciAdi='';
  sifre='';
  captchaToken='';
  captchaWidgetId: number | null = null;
  captchaReady=false;
  captchaError=false;
  private captchaRetryCount=0;
  get isEnglish():boolean { return localStorage.getItem('language') === 'en-US'; }
  private http=inject(HttpClient); private authService=inject(AuthService); private router=inject(Router); private signalRService=inject(SignalRService);

  ngAfterViewInit(){ this.renderCaptchaWhenReady(); }

  private renderCaptchaWhenReady(){
    if (this.captchaWidgetId !== null) return;
    if (RECAPTCHA_SITE_KEY.startsWith('BURAYA_')) {
      this.captchaError=true;
      return;
    }
    if (window.grecaptcha?.render) {
      try {
        this.captchaWidgetId=window.grecaptcha.render('recaptcha-container', {
          sitekey: RECAPTCHA_SITE_KEY,
          callback: (token: string) => {
            this.captchaToken=token;
            this.captchaReady=true;
            this.captchaError=false;
          },
          'expired-callback': () => {
            this.captchaToken='';
            this.captchaReady=false;
          },
          'error-callback': () => {
            this.captchaToken='';
            this.captchaReady=false;
            this.captchaError=true;
          }
        });
      } catch {
        this.captchaError=true;
      }
      return;
    }
    if (this.captchaRetryCount < 20) {
      this.captchaRetryCount++;
      setTimeout(() => this.renderCaptchaWhenReady(), 250);
    } else {
      this.captchaError=true;
    }
  }

  login(){
    if (!this.captchaToken) {
      alert(this.isEnglish ? 'Please confirm that you are not a robot.' : 'Lütfen robot olmadığınızı doğrulayın.');
      return;
    }

    const headers={ 'X-Captcha-Token': this.captchaToken };
    this.http.post<any>('/api/Auth/login',{kullaniciAdi:this.kullaniciAdi,sifre:this.sifre},{headers}).subscribe({
      next:async (response)=>{
        this.authService.login(response.accessToken,response.refreshToken);
        await this.signalRService.start();
        this.router.navigate(['/musteri-listele']);
      },
      error:(error)=>{
        const message=error?.error?.mesaj;
        alert(message || (this.isEnglish?'Invalid username or password.':'Kullanıcı adı veya şifre hatalı.'));
        this.resetCaptcha();
      }
    });
  }

  private resetCaptcha(){
    this.captchaToken='';
    this.captchaReady=false;
    if (this.captchaWidgetId !== null && window.grecaptcha?.reset) {
      window.grecaptcha.reset(this.captchaWidgetId);
    }
  }
}
