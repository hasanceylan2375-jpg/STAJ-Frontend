import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusteriEkle } from './musteri-ekle';

describe('MusteriEkle', () => {
  let component: MusteriEkle;
  let fixture: ComponentFixture<MusteriEkle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusteriEkle],
    }).compileComponents();

    fixture = TestBed.createComponent(MusteriEkle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
