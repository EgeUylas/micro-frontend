'use client';

import React, { useState, useEffect } from 'react';
import { CartItem } from '../../share/types/cart';
import CartItemComponent from './CartItem';
import Button from './ui/Button';
import { storageUtils, CartData } from '../utils/storage';

const CartList: React.FC = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart data from storage
    const loadCartData = () => {
      const cart = storageUtils.getCart();
      setCartData(cart);
      setLoading(false);
    };

    loadCartData();

    // Listen for cart updates from other apps
    const unsubscribe = storageUtils.onCartUpdate((updatedCart) => {
      setCartData(updatedCart);
    });

    return unsubscribe;
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    storageUtils.updateCartItemQuantity(id, quantity);
  };

  const removeItem = (id: string) => {
    storageUtils.removeFromCart(id);
  };

  const clearCart = () => {
    storageUtils.clearCart();
  };

  const goToShopping = () => {
    window.open('http://localhost:3000', '_blank');
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sepetiniz Boş</h2>
        <p className="text-gray-600 mb-6">Sepetinizde henüz ürün bulunmuyor.</p>
        <Button 
          variant="primary"
          onClick={goToShopping}
        >
          Alışverişe Başla
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Sepetiniz ({cartData.itemCount} ürün)
          </h2>
        </div>
        
        <div className="divide-y">
          {cartData.items.map((item) => (
            <CartItemComponent
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>
        
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900">Toplam:</span>
            <span className="text-2xl font-bold text-gray-900">${cartData.total.toFixed(2)}</span>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              variant="outline"
              onClick={clearCart}
              className="flex-1"
            >
              Sepeti Temizle
            </Button>
            <Button 
              variant="primary"
              className="flex-1"
            >
              Ödemeye Geç
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList; 