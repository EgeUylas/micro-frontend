'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { storageUtils, CartData } from '../utils/storage';

export default function Header() {
  const [cartData, setCartData] = useState<CartData | null>(null);

  useEffect(() => {
    // Load initial cart data
    const loadCartData = () => {
      const cart = storageUtils.getCart();
      setCartData(cart);
    };

    loadCartData();

    // Listen for cart updates
    const unsubscribe = storageUtils.onCartUpdate((updatedCart) => {
      setCartData(updatedCart);
    });

    return unsubscribe;
  }, []);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            E-Ticaret
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Ana Sayfa
            </Link>
            
            <a 
              href="http://localhost:3001" 
              target="_blank"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors relative"
            >
              <span className="text-xl">🛒</span>
              <span>Sepet</span>
              {cartData && cartData.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartData.itemCount}
                </span>
              )}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
