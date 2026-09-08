import { environment } from '../../environments/environment';

const configuredBaseUrl = environment.apiBaseUrl?.trim();

export const API_CONFIG = {
  BASE_URL: (configuredBaseUrl || 'https://localhost:7233').replace(/\/$/, ''),
  TIMEOUT_MS: 10000
} as const;

if (!configuredBaseUrl && !environment.production) {
  console.warn('[API] apiBaseUrl tanımlı değil. Fallback olarak https://localhost:7233 kullanılıyor.');
}
