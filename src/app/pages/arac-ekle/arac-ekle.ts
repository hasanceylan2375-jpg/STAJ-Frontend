import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AracService } from '../../services/arac.service';
import { ImageService } from '../../services/image.service';

@Component({selector:'app-arac-ekle',imports:[FormsModule],templateUrl:'./arac-ekle.html',styleUrl:'./arac-ekle.css'})
export class AracEkle {
  marka=''; model=''; yil:number|null=null; fiyat:number|null=null;
  secilenDosya:File|null=null; hata=''; yukleniyor=false;
  constructor(private service:AracService,private imageService:ImageService,private router:Router){}
  dosyaSecildi(event:Event){const input=event.target as HTMLInputElement;this.secilenDosya=input.files?.[0]??null;}
  kaydet(){
    this.hata='';this.yukleniyor=true;
    const kaydetArac=(gorselUrl:string|null)=>this.service.ekle({marka:this.marka,model:this.model,yil:this.yil,fiyat:this.fiyat,gorselUrl}).subscribe({next:()=>this.router.navigate(['/arac-listele']),error:e=>{this.hata=e?.error?.message||'Araç kaydedilemedi.';this.yukleniyor=false;}});
    if(this.secilenDosya)this.imageService.upload(this.secilenDosya).subscribe({next:r=>kaydetArac(r.url),error:e=>{this.hata=e?.error||'Görsel Cloudinary\'ye yüklenemedi.';this.yukleniyor=false;}});else kaydetArac(null);
  }
}
