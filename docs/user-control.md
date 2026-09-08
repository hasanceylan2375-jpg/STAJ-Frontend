# User Control Component

`app-user-control`, farklı ekranlarda tekrar kullanılabilecek kullanıcı kartı/kontrol bileşenidir.

## Tasarım

- **Input:** `user`, `editable`, `compact`, `loading`, `showActions`
- **Output:** `save`, `cancel`, `logout`
- Görüntüleme ve düzenleme state'i bileşenin içinde tutulur.
- Kaydetmeden önce ad-soyad ve e-posta doğrulanır.
- Loading durumunda kaydetme butonu devre dışı bırakılır.
- Kullanıcı avatarı varsa görsel, yoksa adın ilk harfi gösterilir.
- Responsive CSS ile küçük ekranlara uyarlanır.

## Örnek kullanım

```html
<app-user-control
  [user]="user"
  [editable]="true"
  [showActions]="true"
  (save)="onSave($event)"
  (cancel)="onCancel()"
  (logout)="onLogout()"
/>
```

## UI Catalog / Storybook karşılığı

Projede ayrı bir Storybook paketi bulunmadığı için örnek kullanım ve Props/Events kataloğu `/user-control` sayfasında tutulmuştur. Bu sayfa bileşenin farklı state'lerini elle doğrulamak için kullanılabilir.

## Test

`user-control.spec.ts` temel oluşturma, başarılı kaydetme ve geçersiz e-posta validasyonu senaryolarını kapsar.

Çalıştırmak için:

```bash
npm test
```
