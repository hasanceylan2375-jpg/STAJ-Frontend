import { Component, OnInit } from '@angular/core';
import { WorkflowService, WorkflowRequest } from '../../services/workflow.service';

@Component({ selector: 'app-workflow-onay', standalone: true, templateUrl: './workflow-onay.html', styleUrl: './workflow-onay.css' })
export class WorkflowOnay implements OnInit {
  talepler: WorkflowRequest[] = [];
  yorum: Record<number, string> = {};
  yukleniyor = false;
  mesaj = '';

  constructor(private workflow: WorkflowService) {}
  ngOnInit(): void { this.yukle(); }
  yukle(): void { this.yukleniyor = true; this.workflow.pending().subscribe({ next: x => this.talepler = x, error: e => this.mesaj = e?.error || 'Bekleyen talepler alınamadı.', complete: () => this.yukleniyor = false }); }
  onayla(talep: WorkflowRequest): void { this.workflow.approve(talep.id, this.yorum[talep.id] || '').subscribe({ next: () => { this.mesaj = `#${talep.id} onaylandı ve müşteri oluşturuldu.`; this.talepler = this.talepler.filter(x => x.id !== talep.id); }, error: e => this.mesaj = e?.error || 'Onay işlemi başarısız.' }); }
  reddet(talep: WorkflowRequest): void { this.workflow.reject(talep.id, this.yorum[talep.id] || '').subscribe({ next: () => { this.mesaj = `#${talep.id} reddedildi.`; this.talepler = this.talepler.filter(x => x.id !== talep.id); }, error: e => this.mesaj = e?.error || 'Red işlemi başarısız.' }); }
}
