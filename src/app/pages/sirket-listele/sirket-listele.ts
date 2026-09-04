import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SirketService } from '../../services/sirket.service';

@Component({ selector: 'app-sirket-listele', imports: [FormsModule], templateUrl: './sirket-listele.html', styleUrl: './sirket-listele.css' })
export class SirketListele implements OnInit {
  sirketler = signal<any[]>([]); search = '';
  constructor(private service: SirketService) {}
  ngOnInit() { this.getir(); }
  getir() { this.service.getir(this.search).subscribe(r => this.sirketler.set(r)); }
}
