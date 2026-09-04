import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SirketService } from '../../services/sirket.service';
@Component({selector:'app-sirket-ekle',imports:[FormsModule],templateUrl:'./sirket-ekle.html',styleUrl:'./sirket-ekle.css'})
export class SirketEkle{
  ad=''; sektor=''; email=''; telefon=''; logoUrl=''; hata='';
  constructor(private service:SirketService,private router:Router){}
  gorselGecerli(){return !this.logoUrl || /\.(jpg|jpeg|png|webp|svg)(\?.*)?$/i.test(this.logoUrl);}
  kaydet(){
    this.hata='';
    if(!this.gorselGecerli()){this.hata='Sadece JPG, JPEG, PNG, WebP veya SVG formatında görsel kullanabilirsiniz.';return;}
    this.service.ekle({ad:this.ad,sektor:this.sektor,email:this.email,telefon:this.telefon,logoUrl:this.logoUrl||null}).subscribe({next:()=>this.router.navigate(['/sirket-listele'])});
  }
}