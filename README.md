# Micro-Frontend E-Commerce Projesi

Next.js 15 ve TypeScript kullanılarak geliştirilmiş modern bir mikro-frontend e-ticaret uygulaması.

## 🏗️ Proje Mimarisi

Bu proje monorepo yapısında, iki bağımsız Next.js uygulaması içerir:

- **Home App** (`apps/home`) - Ürün listeleme ve ana sayfa (Port: 3000)
- **Cart App** (`apps/cart`) - Sepet yönetimi (Port: 3001)
- **Shared UI** (`packages/ui`) - Ortak bileşenler ve hooks

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18 veya üzeri
- pnpm 9.0.0 veya üzeri
- Docker (opsiyonel)

### Kurulum

```bash
# Proje dizinine git
cd micro-frontend-ecommerce

# Bağımlılıkları yükle
pnpm install

# Development modunda çalıştır
npm run dev
```

Bu komut hem home (3000) hem de cart (3001) uygulamalarını aynı anda başlatır.

### Tekil Uygulama Çalıştırma

```bash
# Sadece home uygulaması
pnpm --filter home run dev

# Sadece cart uygulaması  
pnpm --filter cart run dev
```

## 🐳 Docker ile Çalıştırma

### Development Modu

```bash
# Development servisleri başlat
docker-compose --profile dev up

# Veya sadece production build
docker-compose up
```

### Production Build

```bash
# Tüm uygulamaları build et
pnpm build

# Docker production servisleri
docker-compose up --build
```

## 📦 Proje Yapısı

```
micro-frontend-ecommerce/
├── apps/
│   ├── home/                 # Ana ürün listeleme uygulaması
│   │   ├── app/
│   │   ├── next.config.ts
│   │   └── package.json
│   └── cart/                 # Sepet yönetimi uygulaması
│       ├── app/
│       ├── next.config.ts
│       └── package.json
├── packages/
│   └── ui/                   # Paylaşılan UI bileşenleri
│       ├── components/
│       ├── hooks/
│       └── types/
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

## 🔄 Mikro-Frontend İletişimi

Uygulamalar arası veri paylaşımı `localStorage` ve `storage` event'leri ile gerçekleştirilir:

1. **Home uygulaması**: Ürün sepete eklenir → localStorage güncellenir
2. **Cart uygulaması**: Storage event'ini dinler → UI otomatik güncellenir

## 🛠️ Geliştirme Komutları

```bash
# Tüm uygulamaları build et
pnpm build

# Lint kontrolü
pnpm lint  

# Type check
pnpm type-check

# Temizlik
pnpm clean
```

## 🎨 Teknolojiler

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Turbo** - Build system
- **pnpm** - Package manager
- **Docker** - Containerization

## 📋 Özellikler

- ✅ Server-side rendering (SSR)
- ✅ Incremental Static Regeneration (ISR) 
- ✅ Hot reload ve geliştirme deneyimi
- ✅ Shared component library
- ✅ Cross-app state management
- ✅ Docker desteği
- ✅ TypeScript desteği
- ✅ Responsive tasarım

## 🔗 URL Yapısı

- Ana sayfa: `http://localhost:3000`
- Sepet: `http://localhost:3000/cart` (proxy ile cart uygulamasına yönlendirilir)

## 📝 Katkıda Bulunma

1. Proje klonla
2. Feature branch oluştur
3. Değişiklikleri commit et
4. Pull request gönder