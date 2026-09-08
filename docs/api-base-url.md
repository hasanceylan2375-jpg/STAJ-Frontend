# API Base URL Yönetimi

Frontend tarafında backend adresi artık component veya service dosyalarına sabit URL olarak yazılmıyor.

## Ortamlar

- `src/environments/environment.development.ts` — geliştirme ortamı
- `src/environments/environment.test.ts` — test ortamı
- `src/environments/environment.ts` — production ortamı

Her ortam `apiBaseUrl` değerini tanımlar.

## Çalışma şekli

1. Angular uygulaması ortam dosyasındaki `apiBaseUrl` değerini kullanır.
2. `API_CONFIG` bu değeri merkezi olarak dışarı açar ve istek zaman aşımını tanımlar.
3. `apiBaseUrlInterceptor`, `/api/` ve `/hubs/` ile başlayan göreli adresleri otomatik olarak BaseUrl ile birleştirir.
4. Böylece servisler yalnızca `/api/Musteri`, `/api/Auth/login` gibi endpoint yollarını bilir.
5. Geliştirme ortamında kullanılan gerçek URL console üzerinde loglanabilir; production ortamında bu debug logları kapalıdır.
6. API istekleri 10 saniyelik merkezi timeout ile sınırlandırılır. Görsel yükleme gibi özel işlemler kendi daha uzun timeout değerini kullanabilir.

## Ortam değiştirme

Geliştirme:

```bash
ng serve --configuration development
```

Test:

```bash
ng serve --configuration test
```

Production:

```bash
ng build --configuration production
```

Şu anda test backend'i ayrı bir sunucuda yayınlanmadığı için `environment.test.ts` geliştirme backend adresini kullanır. Gerçek test API'si hazır olduğunda yalnızca bu dosyadaki `apiBaseUrl` değiştirilir; servis/component koduna dokunulmaz.
