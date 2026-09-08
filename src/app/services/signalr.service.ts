import { Injectable, inject } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { API_CONFIG } from '../config/api.config';
import { environment } from '../../environments/environment';

export interface MusteriDegisikligi {
  id?: number;
  ad?: string;
  soyad?: string;
  telefon?: string;
  email?: string;
  tcKimlikNo?: string;
  dogumTarihi?: string;
  profilFotoUrl?: string;
}

export interface BackgroundJobEvent {
  job: string;
  message: string;
  completedAt?: string;
  occurredAt?: string;
  deletedCount?: number;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private readonly authService = inject(AuthService);
  private connection?: HubConnection;
  private baslatiliyor = false;

  readonly musteriEklendi$ = new Subject<MusteriDegisikligi>();
  readonly musteriGuncellendi$ = new Subject<MusteriDegisikligi>();
  readonly musteriSilindi$ = new Subject<{ id: number; ad?: string; soyad?: string }>();
  readonly backgroundJobTamamlandi$ = new Subject<BackgroundJobEvent>();
  readonly backgroundJobHatasi$ = new Subject<BackgroundJobEvent>();
  readonly baglantiDurumu$ = new Subject<'baglandi' | 'koptu' | 'hata'>();

  async start(): Promise<void> {
    if (this.connection?.state === 'Connected' || this.baslatiliyor || !this.authService.isLoggedIn()) return;

    this.baslatiliyor = true;
    const hubUrl = `${API_CONFIG.BASE_URL}/hubs/notifications`;

    if (!environment.production) {
      console.debug('[SignalR]', hubUrl);
    }

    this.connection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => this.authService.getToken() ?? ''
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.on('baglantiKuruldu', () => this.baglantiDurumu$.next('baglandi'));
    this.connection.on('musteriEklendi', (musteri: MusteriDegisikligi) => this.musteriEklendi$.next(musteri));
    this.connection.on('musteriGuncellendi', (musteri: MusteriDegisikligi) => this.musteriGuncellendi$.next(musteri));
    this.connection.on('musteriSilindi', (musteri: { id: number; ad?: string; soyad?: string }) => this.musteriSilindi$.next(musteri));
    this.connection.on('backgroundJobTamamlandi', (job: BackgroundJobEvent) => this.backgroundJobTamamlandi$.next(job));
    this.connection.on('backgroundJobHatasi', (job: BackgroundJobEvent) => this.backgroundJobHatasi$.next(job));
    this.connection.onreconnecting(() => this.baglantiDurumu$.next('koptu'));
    this.connection.onreconnected(() => this.baglantiDurumu$.next('baglandi'));
    this.connection.onclose(() => this.baglantiDurumu$.next('koptu'));

    try {
      await this.connection.start();
      this.baglantiDurumu$.next('baglandi');
    } catch (error) {
      console.error('SignalR bağlantısı kurulamadı.', error);
      this.baglantiDurumu$.next('hata');
      this.connection = undefined;
    } finally {
      this.baslatiliyor = false;
    }
  }

  async stop(): Promise<void> {
    if (!this.connection) return;
    const connection = this.connection;
    this.connection = undefined;
    this.baslatiliyor = false;
    await connection.stop();
  }
}
