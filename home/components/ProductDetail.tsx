'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '../../share/types/product';
import Button from './ui/Button';
import Modal from './ui/Modal';

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart 
}) => {
  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name}>
      <div className="space-y-4">
        <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {product.name}
            </h2>
            <div className="flex items-center">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-600">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-gray-900">
                ${product.price}
              </p>
              <p className="text-sm text-gray-500">
                Stok: {product.stock} adet
              </p>
              <p className="text-sm text-gray-500">
                Kategori: {product.category}
              </p>
            </div>
            
            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="lg"
              className="flex items-center space-x-2"
            >
              <span>Sepete Ekle</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetail;
