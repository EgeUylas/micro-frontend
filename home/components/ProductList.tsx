'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '../../share/types/product';
import ProductCard from './ProductCard';
import Loading from './Loading';
import { storageUtils, CartData } from '../utils/storage';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartData, setCartData] = useState<CartData | null>(null);

  useEffect(() => {
    // Load cart data from storage
    const loadCartData = () => {
      const cart = storageUtils.getCart();
      setCartData(cart);
    };

    loadCartData();

    // Listen for cart updates from other apps
    const unsubscribe = storageUtils.onCartUpdate((updatedCart) => {
      setCartData(updatedCart);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'iPhone 15 Pro',
            price: 999,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
            description: 'Apple iPhone 15 Pro with A17 Pro chip',
            category: 'Electronics',
            rating: 4.8,
            stock: 50
          },
          {
            id: '2',
            name: 'MacBook Air M2',
            price: 1199,
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
            description: 'Apple MacBook Air with M2 chip',
            category: 'Electronics',
            rating: 4.9,
            stock: 30
          },
          {
            id: '3',
            name: 'Sony WH-1000XM5',
            price: 349,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
            description: 'Sony WH-1000XM5 Wireless Headphones',
            category: 'Electronics',
            rating: 4.7,
            stock: 25
          },
          {
            id: '4',
            name: 'Nike Air Max 270',
            price: 150,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
            description: 'Nike Air Max 270 Running Shoes',
            category: 'Sports',
            rating: 4.6,
            stock: 100
          },
          {
            id: '5',
            name: 'Samsung 4K Smart TV',
            price: 799,
            image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
            description: 'Samsung 55" 4K Ultra HD Smart TV',
            category: 'Electronics',
            rating: 4.5,
            stock: 20
          },
          {
            id: '6',
            name: 'Adidas Ultraboost 22',
            price: 180,
            image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
            description: 'Adidas Ultraboost 22 Running Shoes',
            category: 'Sports',
            rating: 4.8,
            stock: 75
          }
        ];
        
        setProducts(mockProducts);
      } catch (err) {
        setError('Ürünler yüklenirken hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    storageUtils.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const getCartQuantity = (productId: string): number => {
    if (!cartData) return 0;
    const item = cartData.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Hata: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Ürün bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          onAddToCart={handleAddToCart}
          cartQuantity={getCartQuantity(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
