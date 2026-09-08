import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private http = inject(HttpClient);
  private readonly api = 'https://localhost:7233/api/Images';

  upload(file: File): Observable<{ id: string; url: string }> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<{ id: string; url: string }>(this.api, form);
  }

  url(id: string | null | undefined): string {
    if (!id) return '';
    return id.startsWith('http') || id.startsWith('data:') ? id : `${this.api}/${id}`;
  }
}
