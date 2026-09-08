# STAJFrontend

This project was generated using Angular CLI version 22.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## API Base URL / Environment Management

Backend API adresi servislerin içine sabit URL olarak yazılmaz. Ortama göre `src/environments` altındaki dosyalardan yönetilir:

- `environment.development.ts` — development
- `environment.test.ts` — test
- `environment.ts` — production

HTTP isteklerinde `/api/...` veya `/hubs/...` şeklinde göreli endpoint kullanılır. `api-base-url.interceptor.ts`, BaseUrl'i merkezi olarak ekler; aynı interceptor istek timeout'u ve development loglamasını da yönetir.

Detaylı açıklama için [`docs/api-base-url.md`](docs/api-base-url.md) dosyasına bakabilirsiniz.

## Building

To build the project run:

```bash
ng build
```

Environment seçerek build almak için:

```bash
ng build --configuration development
ng build --configuration test
ng build --configuration production
```

## Running unit tests

To execute the unit tests with the Vitest test runner, use:

```bash
ng test
```

## Additional Resources

For more information on Angular, visit the Angular CLI documentation.
