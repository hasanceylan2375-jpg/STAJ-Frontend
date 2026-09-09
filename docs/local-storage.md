# STAJ 42 — Local Storage

Bu çalışma Web Storage API içindeki `localStorage` kullanımını uygulamalı olarak gösterir.

## Temel işlemler

- `setItem` — anahtar-değer kaydeder.
- `getItem` — kaydedilen değeri okur.
- `removeItem` — belirli bir anahtarı siler.
- `clear` — tüm Local Storage kayıtlarını temizler.

Uygulamadaki `LocalStorageService`, JSON verilerini güvenli biçimde saklamak ve okumak için bu işlemleri tek bir servis altında toplar.

## Kullanıcı tercihleri

Tema ve dil tercihleri `staj.preferences` anahtarıyla saklanır. Sayfa yeniden açıldığında tercihler okunur ve tema tekrar uygulanır.

## Form

Ad, e-posta ve telefon alanları Local Storage'a kaydedilir. Sayfa yenilendiğinde kayıt geri yüklenir. Ad ve geçerli e-posta kontrolü yapılmadan kayıt alınmaz.

## Sepet

Ürün sepete eklendiğinde sepet `staj.cart` anahtarında saklanır. Aynı ürün tekrar eklenirse miktarı artırılır. Sayfa yenilense bile sepet geri yüklenir.

## Veri temizliği

Demo sayfasındaki temizleme işlemi yalnızca `staj.*` anahtarlarını kaldırır. Böylece uygulamanın JWT/oturum gibi başka Local Storage kayıtları yanlışlıkla silinmez. Bu, gerçek uygulamada `localStorage.clear()` kullanımının neden dikkatli ele alınması gerektiğine iyi bir örnektir.
