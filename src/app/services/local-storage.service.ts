import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string, fallback: T): T {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    try { return JSON.parse(raw) as T; } catch { return fallback; }
  }

  remove(key: string): void { localStorage.removeItem(key); }
  clear(): void { localStorage.clear(); }
  has(key: string): boolean { return localStorage.getItem(key) !== null; }
  keys(): string[] { return Object.keys(localStorage); }
}
