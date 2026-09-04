# Görsel Kullanım ve Depolama Rehberi

## Desteklenen formatlar
- JPG/JPEG: Fotoğraflar için uygundur.
- PNG: Şeffaflık gereken görseller ve logolar için uygundur.
- WebP: Web uygulamasında daha küçük dosya boyutu için önerilir.
- SVG: Logo ve ikonlar için ölçeklenebilir vektör formatıdır.

## Proje standartları
1. Şirket kayıtlarında logo için öncelikle SVG veya PNG tercih edilir.
2. Konut ve araç fotoğraflarında WebP veya JPG tercih edilir.
3. Görsel URL'si boş bırakılabilir; liste ekranında 'Görsel yok' gösterilir.
4. Desteklenmeyen uzantılar kayıt sırasında reddedilir.
5. Bozuk veya erişilemeyen URL'ler kırık görsel yerine 'Görsel yok' olarak gösterilir.

## Cloud Storage ve CDN mimarisi
Görsel dosyaları uygulama veritabanında binary olarak saklanmak yerine bir Cloud Storage sağlayıcısında tutulacak şekilde tasarlanmıştır. Veritabanında yalnızca görselin URL adresi saklanır. Cloud Storage görseli depolar; CDN ise görseli kullanıcıya yakın bir noktadan hızlı şekilde sunmak için kullanılabilir.

Önerilen akış:
Kullanıcı -> Görsel yükleme/URL -> Cloud Storage -> CDN URL -> API/Veritabanı -> Angular liste ekranı

Mevcut uygulamada görsel URL alanları bu mimariye hazırdır. Bir Cloud Storage hesabı bağlandığında sağlayıcının ürettiği CDN veya public URL doğrudan ilgili logoUrl/gorselUrl alanında kullanılabilir.
