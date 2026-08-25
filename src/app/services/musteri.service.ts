import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusteriService {

  private apiUrl = 'https://localhost:7233/api/Musteri';

  constructor(private http: HttpClient) {}

  getMusteriler() {
    return this.http.get<any[]>(this.apiUrl);
  }

  musteriEkle(musteri: any) {
    return this.http.post(this.apiUrl, musteri);
  }
musteriGuncelle(id: number, musteri: any) {
  return this.http.put(`${this.apiUrl}/${id}`, musteri);
}

musteriSil(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
}