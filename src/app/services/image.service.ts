import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private http = inject(HttpClient);
  private readonly api = 'https://localhost:7233/api/Images';

  upload(file: File): Observable<{ url: string }> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<{ url: string }>(`${this.api}/upload`, form);
  }

  url(value: string | null | undefined): string {
    return value ?? '';
  }
}
