# Shared UI Package (@repo/ui)

Mikro-frontend uygulamaları arasında paylaşılan UI bileşenleri ve utility fonksiyonları.

## 📦 İçerik

### Bileşenler

- `Button` - Temel buton bileşeni
- `ProductCard` - Ürün kartı bileşeni  
- `Toast` - Bildirim bileşeni
- `Modal` - Modal dialog bileşeni

### Hooks

- `useLocalStorage` - LocalStorage yönetimi ve cross-app senkronizasyon

### Types

- `Product` - Ürün veri tipi
- `CartItem` - Sepet öğesi tipi (Product + quantity)

## 🎨 Tasarım Sistemi

### Renk Paleti

```css
/* Primary Colors */
--primary-600: #2563eb;    /* Mavi - Ana renk */
--primary-700: #1d4ed8;    /* Koyu mavi - Hover durumu */

/* Secondary Colors */  
--gray-50: #f9fafb;       /* Açık gri - Arka plan */
--gray-600: #4b5563;      /* Orta gri - İkincil butonlar */
--gray-900: #111827;      /* Koyu gri - Metin */

/* Status Colors */
--green-600: #059669;     /* Yeşil - Başarı */
--red-600: #dc2626;       /* Kırmızı - Hata */
--blue-600: #2563eb;      /* Mavi - Bilgi */
```

### Spacing Sistemi

Spacing rem-based sistemle tutarlılık sağlar:

```css
/* Spacing Scale */
xs: 0.5rem    /* 8px */
sm: 0.75rem   /* 12px */  
md: 1rem      /* 16px */
lg: 1.5rem    /* 24px */
xl: 2rem      /* 32px */
2xl: 3rem     /* 48px */
```

### Typography

```css
/* Font Sizes */
text-sm: 0.875rem     /* 14px */
text-base: 1rem       /* 16px */
text-lg: 1.125rem     /* 18px */
text-xl: 1.25rem      /* 20px */
text-2xl: 1.5rem      /* 24px */

/* Font Weights */
font-medium: 500
font-semibold: 600  
font-bold: 700
```

## 🧩 Bileşen Kullanımı

### Button

```typescript
import { Button } from '@repo/ui';

// Temel kullanım
<Button onClick={handleClick}>Click me</Button>

// Varyant ve boyut
<Button variant="secondary" size="lg">Large Button</Button>
<Button variant="outline" size="sm">Small Outline</Button>

// Props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  // + tüm HTML button props
}
```

### ProductCard

```typescript
import { ProductCard } from '@repo/ui';

<ProductCard
  product={productData}
  onAddToCart={handleAddToCart}
  showAddToCart={true}
/>

// Props
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  showAddToCart?: boolean;
}
```

### Toast

```typescript
import { Toast } from '@repo/ui';

<Toast
  message="İşlem başarılı!"
  type="success"
  duration={3000}
  onClose={() => setToast(null)}
/>

// Props
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number; // milliseconds
  onClose?: () => void;
}
```

### Modal

```typescript
import { Modal, Button } from '@repo/ui';

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Confirmation"
  footer={
    <>
      <Button variant="outline" onClick={() => setShowModal(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

## 🔗 useLocalStorage Hook

Cross-app state management için geliştirilmiş hook:

```typescript
import { useLocalStorage } from '@repo/ui';

const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

// Otomatik özellikleri:
// 1. localStorage read/write
// 2. Storage event dispatching  
// 3. Cross-tab synchronization
// 4. SSR safety (window check)
// 5. Error handling
```

### Hook Özellikleri

1. **SSR Güvenli**: `window` kontrolü ile server-side rendering uyumlu
2. **Event Dispatch**: Değer değiştiğinde custom storage event gönderir
3. **Cross-tab Sync**: Farklı tab'lardaki değişiklikleri dinler
4. **Error Handling**: JSON parse/stringify hatalarını yakalar
5. **TypeScript**: Generic tip desteği

## 🎯 Tasarım Prensipleri

### Hover ve Active Durumları

Tüm interaktif elementler tutarlı hover/active efektleri kullanır:

```css
/* Button hover */
.hover\:bg-blue-700:hover { background-color: #1d4ed8; }

/* Card hover */
.hover\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }

/* Transition */
.transition-colors { transition-property: color, background-color; }
.transition-shadow { transition-property: box-shadow; }
```

### Responsive Grid

Ürün kartları için responsive grid sistemi:

```css
/* Grid Layout */
.grid-cols-1              /* Mobile: 1 column */
.sm\:grid-cols-2         /* Small: 2 columns */  
.lg\:grid-cols-3         /* Large: 3 columns */
.xl\:grid-cols-4         /* Extra large: 4 columns */
```

## 📝 Yeni Bileşen Ekleme

1. `components/` dizinine yeni dosya oluştur
2. Bileşeni export et
3. `index.ts` dosyasına export ekle
4. TypeScript tiplerini `types/` dizininde tanımla
5. README'ye dokümantasyon ekle

### Örnek Bileşen Template

```typescript
import React from 'react';

interface NewComponentProps {
  // Props tanımla
}

export const NewComponent: React.FC<NewComponentProps> = ({
  // Props destructure
}) => {
  return (
    <div className="base-classes">
      {/* Component content */}
    </div>
  );
};
```

## 🧪 Test ve Kalite

- TypeScript strict modu aktif
- ESLint kuralları uygulanır
- Peer dependencies ile React sürüm kontrolü
- Component props doğrulaması