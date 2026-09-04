import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class SirketService {
  private apiUrl='https://localhost:7233/api/Sirket';
  constructor(private http:HttpClient){}
  getir(search=''){let params=new HttpParams();if(search.trim())params=params.set('search',search.trim());return this.http.get<any[]>(this.apiUrl,{params});}
  ekle(sirket:any){return this.http.post<any>(this.apiUrl,sirket);}
  guncelle(id:number,sirket:any){return this.http.put<any>(`${this.apiUrl}/${id}`,sirket);}
  sil(id:number){return this.http.delete(`${this.apiUrl}/${id}`);}
}