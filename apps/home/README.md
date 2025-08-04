# Home Uygulaması

Ürün listeleme ve ana sayfa mikro-frontend uygulaması.

## 🎯 Özellikler

- Ürün listeleme ve görüntüleme
- Sepete ekleme işlemleri
- ISR (Incremental Static Regeneration) ile performans optimizasyonu
- Responsive ürün kartları
- Toast bildirimleri

## ⚙️ Yapılandırma

### Port Ayarları

Varsayılan port: `3000`

Port değiştirmek için:

```bash
# package.json scripts bölümünde
"dev": "next dev --turbopack --port YENI_PORT"
"start": "next start --port YENI_PORT"
```

### ISR Parametreleri

API rotalarında revalidation süreleri:

```typescript
// app/api/products/route.ts
export async function GET() {
  return NextResponse.json(products, {
    headers: {
      'Cache-Control': 's-maxage=60, stale-while-revalidate=300'
    }
  });
}
```

### Ürün Verileri

Mock ürün verileri `app/api/products/route.ts` dosyasında bulunur. Gerçek API ile değiştirmek için:

1. API endpoint URL'ini güncelle
2. Veri tiplerini kontrol et (`@repo/ui` types)
3. Error handling ekle

## 🔧 Geliştirme

### Yerel Geliştirme

```bash
# Sadece home uygulaması
pnpm --filter home run dev

# Build
pnpm --filter home run build

# Production start
pnpm --filter home run start
```

### Environment Variables

`.env.local` dosyası oluşturarak:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🎨 UI Bileşenleri

Paylaşılan bileşenler `@repo/ui` paketinden import edilir:

```typescript
import { ProductCard, Toast, useLocalStorage } from '@repo/ui';
```

### Mevcut Bileşenler

- `ProductCard` - Ürün kartı
- `Button` - Buton bileşeni
- `Toast` - Bildirim bileşeni
- `useLocalStorage` - LocalStorage hook'u

## 🚀 Deployment

### Docker ile

```bash
# Production build
docker build -t home-app .
docker run -p 3000:3000 home-app
```

### Vercel/Netlify

Next.js 15 otomatik deployment destekler. `next.config.ts` dosyasındaki `output: 'standalone'` ayarı Docker için gereklidir.

## 🔄 Multi-Zone Integration

Cart uygulaması ile entegrasyon `next.config.ts` dosyasında yapılandırılır:

```typescript
async rewrites() {
  return [
    {
      source: '/cart/:path*',
      destination: 'http://localhost:3001/cart/:path*',
    },
  ];
}
```

## 📊 State Management

LocalStorage tabanlı state yönetimi:

```typescript
const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

// Sepete ekleme
const handleAddToCart = (product: Product) => {
  // localStorage otomatik güncellenir
  // Cart uygulaması storage event ile dinler
};
```