import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KonutService } from '../../services/konut.service';
@Component({selector:'app-konut-listele',imports:[CommonModule,FormsModule],templateUrl:'./konut-listele.html',styleUrl:'./konut-listele.css'})
export class KonutListele implements OnInit { konutlar=signal<any[]>([]);search='';constructor(private service:KonutService){} ngOnInit(){this.getir();} getir(){this.service.getir(this.search).subscribe(r=>this.konutlar.set(r));} }