# Frontend Google Map

`/google-map` rotasında staj37 görevindeki Google Maps arayüzü hazırlanmıştır.

## Karşılanan maddeler

- Arama alanı: Bilinen Merkez Ofis / Şube Ofis kayıtlarında hızlı seçim yapar; farklı bir arama metni girilirse Google Maps arama sayfasını açar.
- Rota Tarifi: başlangıç ve varış alanlarından Google Maps Directions bağlantısı oluşturur.
- Harita / Uydu / Arazi sekmeleri: gömülü haritanın Google Maps görünüm parametresini değiştirir.
- Google Haritalar'da Aç: seçilen aramayı Google Maps üzerinde yeni sekmede açar.
- İşaretler: Merkez Ofis ve Şube Ofis koordinatları frontend tarafında tanımlıdır ve listeden seçilebilir.

## Not

Bu çözüm Google Maps'in normal embed/search/directions URL'lerini kullanır; bu nedenle repoya gerçek bir Google Maps API anahtarı koymaz. Google Maps JavaScript API ile özel marker, autocomplete ve harita içi rota gibi daha gelişmiş özellikler istenirse API anahtarı environment üzerinden ayrıca yapılandırılmalıdır.
