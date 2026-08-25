import { TestBed } from '@angular/core/testing';
import { Musteri } from './musteri';

describe('Musteri', () => {
  let service: Musteri;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Musteri);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
