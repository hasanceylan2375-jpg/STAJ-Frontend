import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SendMailRequest {
  to: string;
  subject: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class MailService {
  private readonly apiUrl = 'https://localhost:7233/api/Mail';

  constructor(private http: HttpClient) {}

  sendMail(request: SendMailRequest): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/send`, request);
  }
}
