import { Component } from '@angular/core';

interface AccordionItem { title: string; content: string; }
interface CarouselItem { image: string; title: string; text: string; }

@Component({
  selector: 'app-accordion-carousel',
  standalone: true,
  templateUrl: './accordion-carousel.html',
  styleUrl: './accordion-carousel.css'
})
export class AccordionCarousel {
  activeAccordion = 0;
  currentSlide = 0;

  readonly accordionItems: AccordionItem[] = [
    { title: 'Siparişime nasıl ulaşabilirim?', content: 'Siparişlerinizi müşteri hesabınızdaki siparişler bölümünden görüntüleyebilirsiniz.' },
    { title: 'Ürünler nereden takip edilir?', content: 'Ürün ve müşteri hareketlerini ilgili yönetim ekranlarından takip edebilirsiniz.' },
    { title: 'İade süreci nasıl çalışır?', content: 'İade talebi oluşturmak için müşteri destek ekibiyle iletişime geçebilirsiniz.' }
  ];

  readonly carouselItems: CarouselItem[] = [
    { image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80', title: 'Yeni Sezon Ürünlerde', text: '%30 indirim fırsatını kaçırmayın.' },
    { image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80', title: 'Yeni Koleksiyon', text: 'Sezonun öne çıkan ürünlerini keşfedin.' },
    { image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80', title: 'Özel Fırsatlar', text: 'Seçili ürünlerde avantajlı fiyatlar.' }
  ];

  toggleAccordion(index: number): void {
    this.activeAccordion = this.activeAccordion === index ? -1 : index;
  }

  nextSlide(): void { this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length; }
  previousSlide(): void { this.currentSlide = (this.currentSlide - 1 + this.carouselItems.length) % this.carouselItems.length; }
  selectSlide(index: number): void { this.currentSlide = index; }

  trackByIndex(index: number): number { return index; }
}
