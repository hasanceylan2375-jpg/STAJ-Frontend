import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SirketService {
  private apiUrl = 'https://localhost:7233/api/Sirket';
  constructor(private http: HttpClient) {}
  getir(search = '') { let params = new HttpParams(); if (search.trim()) params = params.set('search', search.trim()); return this.http.get<any[]>(this.apiUrl, { params }); }
}
