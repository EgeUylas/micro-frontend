'use client';

import { Suspense, useState, useEffect } from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';
import Toast from '../components/ui/Toast';
import { storageUtils } from '../utils/storage';

export default function Home() {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  useEffect(() => {
    // Listen for cart updates to show notifications
    const unsubscribe = storageUtils.onCartUpdate((cartData) => {
      if (cartData && cartData.items.length > 0) {
        const lastItem = cartData.items[cartData.items.length - 1];
        setToast({
          message: `${lastItem.name} sepete eklendi!`,
          type: 'success',
          isVisible: true
        });
      }
    });

    return unsubscribe;
  }, []);

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Ürünlerimiz
        </h1>
        <Suspense fallback={<Loading />}>
          <ProductList />
        </Suspense>
      </main>
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={handleCloseToast}
      />
    </div>
  );
}
