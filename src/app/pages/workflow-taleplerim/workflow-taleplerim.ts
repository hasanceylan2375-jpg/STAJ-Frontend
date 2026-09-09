import { Component, OnInit } from '@angular/core';
import { WorkflowService, WorkflowRequest } from '../../services/workflow.service';

@Component({
  selector: 'app-workflow-taleplerim',
  standalone: true,
  templateUrl: './workflow-taleplerim.html',
  styleUrl: './workflow-taleplerim.css'
})
export class WorkflowTaleplerim implements OnInit {
  talepler: WorkflowRequest[] = [];
  yukleniyor = false;
  hata = '';

  constructor(private workflow: WorkflowService) {}
  ngOnInit(): void { this.yukle(); }
  yukle(): void { this.yukleniyor = true; this.workflow.mine().subscribe({ next: x => this.talepler = x, error: e => this.hata = e?.error || 'Talepler alınamadı.', complete: () => this.yukleniyor = false }); }
  durum(status: string): string { return status === 'Pending' ? 'Müdür Onayı Bekliyor' : status === 'Approved' ? 'Onaylandı' : status === 'Rejected' ? 'Reddedildi' : 'Taslak'; }
}
