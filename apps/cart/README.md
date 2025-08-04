# Cart Uygulaması

Sepet yönetimi mikro-frontend uygulaması.

## 🎯 Özellikler

- Sepet ürünlerini görüntüleme
- Ürün miktarı güncelleme
- Ürün silme işlemleri
- Toplam fiyat hesaplama
- Gerçek zamanlı localStorage senkronizasyonu
- Boş sepet durumu yönetimi

## ⚙️ Yapılandırma

### Port Ayarları

Varsayılan port: `3001`

Port değiştirmek için:

```bash
# package.json scripts bölümünde
"dev": "next dev --turbopack --port YENI_PORT"
"start": "next start --port YENI_PORT"
```

**Önemli:** Port değişikliği durumunda `next.config.ts` dosyasındaki proxy ayarlarını da güncellemeyi unutmayın.

### Base Path

Cart uygulaması `/cart` base path'i ile çalışır:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  basePath: '/cart',
  // ...
};
```

## 🔧 Geliştirme

### Yerel Geliştirme

```bash
# Sadece cart uygulaması
pnpm --filter cart run dev

# Build
pnpm --filter cart run build

# Production start
pnpm --filter cart run start
```

## 📡 Storage Event Dinleme

Cart uygulaması Home uygulamasından gelen değişiklikleri otomatik olarak dinler:

```typescript
// useLocalStorage hook'u otomatik olarak storage event'lerini dinler
useEffect(() => {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'cart' && e.newValue !== null) {
      // Sepet güncellendiğinde UI otomatik yenilenir
      setStoredValue(JSON.parse(e.newValue));
    }
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, []);
```

## 🎨 UI Bileşenleri

Paylaşılan bileşenler kullanımı:

```typescript
import { Button, Toast, useLocalStorage } from '@repo/ui';
import type { CartItem } from '@repo/ui';
```

### Sepet İşlemleri

```typescript
// Miktar güncelleme
const updateQuantity = (id: string, newQuantity: number) => {
  if (newQuantity === 0) {
    removeItem(id);
    return;
  }
  // localStorage otomatik güncellenir
};

// Ürün silme
const removeItem = (id: string) => {
  setCartItems(cartItems.filter(item => item.id !== id));
};

// Sepeti temizleme
const clearCart = () => {
  setCartItems([]);
};
```

## 💰 Fiyat Hesaplamaları

```typescript
// Toplam fiyat
const getTotalPrice = () => {
  return cartItems.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );
};

// Toplam ürün sayısı
const getTotalItems = () => {
  return cartItems.reduce((total, item) => 
    total + item.quantity, 0
  );
};

// Vergi hesaplaması (%8)
const taxAmount = getTotalPrice() * 0.08;
const finalTotal = getTotalPrice() * 1.08;
```

## 🚀 Deployment

### Docker ile

```bash
# Production build
docker build -t cart-app .
docker run -p 3001:3001 cart-app
```

### Environment Variables

```env
NEXT_PUBLIC_HOME_URL=http://localhost:3000
```

## 🔄 Multi-Zone Integration

Home uygulaması ile entegrasyon ayarları:

```typescript
// next.config.ts rewrites
async rewrites() {
  return [
    {
      source: '/',
      destination: 'http://localhost:3000/',
    },
    {
      source: '/home/:path*',
      destination: 'http://localhost:3000/:path*',
    },
  ];
}
```

## 🎨 Responsive Tasarım

Cart uygulaması mobil öncelikli tasarım prensiplerine uyar:

- Flexbox layout sistem
- Grid sistem (lg:w-2/3, lg:w-1/3)
- Responsive spacing ve typography
- Touch-friendly buton boyutları

## 🧪 Test Senaryoları

1. **Boş sepet durumu**
   - Boş sepet mesajı görüntülenir
   - "Continue Shopping" butonu çalışır

2. **Ürün ekleme/çıkarma**
   - Home'dan eklenen ürünler görünür
   - Miktar artırma/azaltma çalışır
   - Sıfıra indiğinde ürün silinir

3. **Fiyat hesaplama**
   - Subtotal doğru hesaplanır
   - Vergi (%8) eklenir
   - Final total doğru görüntülenir