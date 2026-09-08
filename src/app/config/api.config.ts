import { environment } from '../../environments/environment';

export const API_CONFIG = {
  BASE_URL: environment.apiBaseUrl.replace(/\/$/, ''),
  TIMEOUT_MS: 10000
} as const;
