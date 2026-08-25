import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusteriListele } from './musteri-listele';

describe('MusteriListele', () => {
  let component: MusteriListele;
  let fixture: ComponentFixture<MusteriListele>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusteriListele],
    }).compileComponents();

    fixture = TestBed.createComponent(MusteriListele);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
