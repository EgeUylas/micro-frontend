import { Suspense } from 'react';
import CartList from '../components/CartList';
import Loading from '../components/Loading';

export default function Cart() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Sepetim</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loading />}>
          <CartList />
        </Suspense>
      </main>
    </div>
  );
}
