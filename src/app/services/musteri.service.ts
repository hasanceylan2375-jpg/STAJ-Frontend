import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MusteriService {
  private apiUrl = 'https://localhost:7233/api/Musteri';
  constructor(private http: HttpClient) {}

  getMusteriler(search = '', sort = '', page = 1, pageSize = 5) {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    if (search.trim()) params = params.set('search', search.trim());
    if (sort) params = params.set('sort', sort);
    return this.http.get<any>(this.apiUrl, { params });
  }

  getMusterilerCursor(lastId: number | null = null, pageSize = 5) {
    let params = new HttpParams().set('pageSize', pageSize);
    if (lastId !== null) params = params.set('lastId', lastId);
    return this.http.get<any>(`${this.apiUrl}/cursor`, { params });
  }

  excelAktar(search = '', sort = '') {
    let params = new HttpParams();
    if (search.trim()) params = params.set('search', search.trim());
    if (sort) params = params.set('sort', sort);
    return this.http.get(`${this.apiUrl}/excel`, { params, responseType: 'blob' });
  }

  fotografYukle(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/fotoğraf`, formData);
  }

  fotografIndir(dosyaAdi: string) {
    return this.http.get(`${this.apiUrl}/fotoğraf/indir/${encodeURIComponent(dosyaAdi)}`, { responseType: 'blob' });
  }

  musteriEkle(musteri: any, idempotencyKey: string) {
    const headers = new HttpHeaders({ 'Idempotency-Key': idempotencyKey });
    return this.http.post(this.apiUrl, musteri, { headers });
  }

  musteriGuncelle(id: number, musteri: any) { return this.http.put(`${this.apiUrl}/${id}`, musteri); }
  musteriSil(id: number) { return this.http.delete(`${this.apiUrl}/${id}`); }
}
