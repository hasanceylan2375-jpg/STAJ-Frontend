import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface WorkflowRequest {
  id: number;
  type: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected';
  requestedBy: string;
  musteri: any;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewComment?: string;
}

@Injectable({ providedIn: 'root' })
export class WorkflowService {
  private readonly http = inject(HttpClient);
  private readonly url = '/api/workflows';

  start(musteri: any) { return this.http.post<WorkflowRequest>(`${this.url}/start`, { musteri }); }
  mine() { return this.http.get<WorkflowRequest[]>(this.url); }
  pending() { return this.http.get<WorkflowRequest[]>(`${this.url}/pending`); }
  approve(id: number, comment = '') { return this.http.post<WorkflowRequest>(`${this.url}/${id}/approve`, { comment }); }
  reject(id: number, comment = '') { return this.http.post<WorkflowRequest>(`${this.url}/${id}/reject`, { comment }); }
}
