import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, timeout } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private http = inject(HttpClient);
  private readonly api = 'https://localhost:7233/api/Images';

  upload(file: File): Observable<{ url: string }> {
    const form = new FormData();
    form.append('file', file);

    return this.http.post<{ url: string }>(`${this.api}/upload`, form).pipe(
      timeout(30000),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          const message = typeof error.error === 'string'
            ? error.error
            : error.error?.message;
          return throwError(() => new Error(message || `Görsel yüklenemedi. HTTP ${error.status}`));
        }
        if (error instanceof Error) return throwError(() => error);
        return throwError(() => new Error('Görsel yükleme isteği zaman aşımına uğradı.'));
      })
    );
  }

  url(value: string | null | undefined): string {
    return value ?? '';
  }
}
