'use client';

import { useState, useEffect } from 'react';
import { Button, Toast, useLocalStorage } from '@repo/ui';
import type { CartItem } from '@repo/ui';

export default function CartPage() {
  const [cartItems, setCartItems, isClient] = useLocalStorage<CartItem[]>('cart', []);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }

    const currentCartItems = Array.isArray(cartItems) ? cartItems : [];
    setCartItems(currentCartItems.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeItem = (id: string) => {
    const currentCartItems = Array.isArray(cartItems) ? cartItems : [];
    const item = currentCartItems.find(item => item.id === id);
    setCartItems(currentCartItems.filter(item => item.id !== id));
    
    if (item) {
      setToast({
        message: `${item.name} sepetten kaldırıldı`,
        type: 'info'
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setToast({
      message: 'Sepet temizlendi',
      type: 'info'
    });
  };

  const getTotalPrice = () => {
    const currentCartItems = Array.isArray(cartItems) ? cartItems : [];
    return currentCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    const currentCartItems = Array.isArray(cartItems) ? cartItems : [];
    return currentCartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const currentCartItems = Array.isArray(cartItems) ? cartItems : [];
  
  if (currentCartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sepetiniz boş</h2>
          <p className="text-gray-600 mb-6">Alışverişe başlamak için ürün ekleyin</p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Alışverişe Devam Et
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Alışveriş Sepeti ({getTotalItems()} ürün)
              </h1>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Sepeti Temizle
              </Button>
            </div>

            <div className="space-y-4">
              {currentCartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} adet
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 p-0"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeItem(item.id)}
                      className="mt-1 text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Kaldır
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Ara Toplam</span>
                <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kargo</span>
                <span className="font-medium">Ücretsiz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vergi</span>
                <span className="font-medium">${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Toplam</span>
                  <span className="text-lg font-semibold">
                    ${(getTotalPrice() * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Button className="w-full mb-3" size="lg">
              Ödemeye Geç
            </Button>
            
            <a
              href="/"
              className="block text-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Alışverişe Devam Et
            </a>
          </div>
        </div>
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