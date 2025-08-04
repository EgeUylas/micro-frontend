'use client';

import { useState, useEffect } from 'react';
import { ProductCard, Toast, useLocalStorage } from '@repo/ui';
import type { Product, CartItem } from '@repo/ui';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems, isClient] = useLocalStorage<CartItem[]>('cart', []);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setToast({
        message: 'Ürünler yüklenirken hata oluştu',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (!isClient) return; // Don't add to cart during SSR
    
    const currentCartItems = Array.isArray(cartItems) ? cartItems : [];
    const existingItem = currentCartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(currentCartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...currentCartItems, { ...product, quantity: 1 }]);
    }

    setToast({
      message: `${product.name} sepete eklendi!`,
      type: 'success'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Öne Çıkan Ürünler</h1>
        <p className="text-gray-600">Kaliteli ürünlerimizin en yeni koleksiyonunu keşfedin</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}