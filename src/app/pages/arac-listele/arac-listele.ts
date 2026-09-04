import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AracService } from '../../services/arac.service';
@Component({selector:'app-arac-listele',imports:[CommonModule,FormsModule],templateUrl:'./arac-listele.html',styleUrl:'./arac-listele.css'})
export class AracListele implements OnInit { araclar=signal<any[]>([]);search='';constructor(private service:AracService){} ngOnInit(){this.getir();} getir(){this.service.getir(this.search).subscribe(r=>this.araclar.set(r));} }