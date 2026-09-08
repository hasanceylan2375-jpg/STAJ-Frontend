import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SirketService } from '../../services/sirket.service';
import { ImageService } from '../../services/image.service';

@Component({selector:'app-sirket-ekle',imports:[FormsModule],templateUrl:'./sirket-ekle.html',styleUrl:'./sirket-ekle.css'})
export class SirketEkle{
  ad=''; sektor=''; email=''; telefon=''; logoUrl=''; hata=''; secilenDosya:File|null=null; yukleniyor=false;
  constructor(private service:SirketService,private imageService:ImageService,private router:Router){}
  dosyaSecildi(event:Event){const input=event.target as HTMLInputElement;this.secilenDosya=input.files?.[0]??null;}
  kaydet(){
    this.hata='';this.yukleniyor=true;
    const kaydetSirket=(url:string|null)=>this.service.ekle({ad:this.ad,sektor:this.sektor,email:this.email,telefon:this.telefon,logoUrl:url}).subscribe({next:()=>this.router.navigate(['/sirket-listele']),error:e=>{this.hata=e?.error?.message||'Şirket kaydedilemedi.';this.yukleniyor=false;}});
    if(this.secilenDosya)this.imageService.upload(this.secilenDosya).subscribe({next:r=>kaydetSirket(r.url),error:e=>{this.hata=e?.message||'Logo Cloudinary\'ye yüklenemedi.';this.yukleniyor=false;}});else kaydetSirket(this.logoUrl||null);
  }
}
