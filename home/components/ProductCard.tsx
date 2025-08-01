'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '../../share/types/product';
import Button from './ui/Button';
import ProductDetail from './ProductDetail';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  cartQuantity?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  cartQuantity = 0 
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleViewDetail = () => {
    setShowDetail(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 bg-gray-200 cursor-pointer" onClick={handleViewDetail}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate cursor-pointer hover:text-blue-600" onClick={handleViewDetail}>
              {product.name}
            </h3>
            <div className="flex items-center">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <p className="text-xl font-bold text-gray-900">
                ${product.price}
              </p>
              <p className="text-xs text-gray-500">
                Stok: {product.stock} adet
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleViewDetail} 
              variant="outline" 
              size="sm"
              className="flex-1"
            >
              <span className="text-sm">📋 Detay</span>
            </Button>
            <Button 
              onClick={handleAddToCart} 
              variant="primary" 
              size="sm"
              className="flex-1"
            >
              <span className="text-sm">
                {cartQuantity > 0 ? `🛒 Sepette (${cartQuantity})` : '🛒 Sepete Ekle'}
              </span>
            </Button>
          </div>
        </div>
      </div>
      
      <ProductDetail 
        product={product} 
        isOpen={showDetail} 
        onClose={() => setShowDetail(false)} 
        onAddToCart={onAddToCart} 
      />
    </>
  );
};

export default ProductCard;
