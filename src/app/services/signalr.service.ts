import { Injectable, inject } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';

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

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private readonly authService = inject(AuthService);
  private connection?: HubConnection;
  private baslatiliyor = false;

  readonly musteriEklendi$ = new Subject<MusteriDegisikligi>();
  readonly musteriGuncellendi$ = new Subject<MusteriDegisikligi>();
  readonly musteriSilindi$ = new Subject<{ id: number; ad?: string; soyad?: string }>();
  readonly baglantiDurumu$ = new Subject<'baglandi' | 'koptu' | 'hata'>();

  async start(): Promise<void> {
    if (this.connection?.state === 'Connected' || this.baslatiliyor || !this.authService.isLoggedIn()) return;

    this.baslatiliyor = true;
    this.connection = new HubConnectionBuilder()
      .withUrl('https://localhost:7233/hubs/notifications', {
        accessTokenFactory: () => this.authService.getToken() ?? ''
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.on('baglantiKuruldu', () => this.baglantiDurumu$.next('baglandi'));
    this.connection.on('musteriEklendi', (musteri: MusteriDegisikligi) => this.musteriEklendi$.next(musteri));
    this.connection.on('musteriGuncellendi', (musteri: MusteriDegisikligi) => this.musteriGuncellendi$.next(musteri));
    this.connection.on('musteriSilindi', (musteri: { id: number; ad?: string; soyad?: string }) => this.musteriSilindi$.next(musteri));
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
