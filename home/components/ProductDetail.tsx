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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={`text-xl ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Stokta Yok', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    if (stock <= 5) return { text: 'Son Stok', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    return { text: 'Stokta Mevcut', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name}>
      <div className="space-y-6">
        {/* Product Image with Zoom Effect */}
        <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden group">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h2>
            <div className="flex items-center space-x-3">
              <div className="flex">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {product.rating} / 5 puan
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">
                {product.category} kategorisinde
              </span>
            </div>
          </div>
          
          {/* Price Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500">KDV Dahil</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Ücretsiz kargo • Hızlı teslimat
            </p>
          </div>
          
          {/* Stock Status */}
          <div className={`${stockStatus.bg} ${stockStatus.border} border rounded-lg p-3`}>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${stockStatus.color}`}>
                {stockStatus.text}
              </span>
              {product.stock > 0 && (
                <span className="text-sm text-gray-600">
                  ({product.stock} adet kaldı)
                </span>
              )}
            </div>
          </div>
          
          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="mr-2">📋</span>
              Ürün Açıklaması
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
          
          {/* Product Features */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="mr-2">✨</span>
              Özellikler
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Yüksek Kalite</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Hızlı Teslimat</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Güvenli Ödeme</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span>Kolay İade</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>✕</span>
                <span>Kapat</span>
              </span>
            </Button>
            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="lg"
              disabled={product.stock <= 0}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>🛒</span>
                <span>{product.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}</span>
              </span>
            </Button>
          </div>
          
          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Kategori:</span>
              <span className="font-medium text-gray-900">{product.category}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Ürün Kodu:</span>
              <span className="font-medium text-gray-900">{product.id}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Değerlendirme:</span>
              <span className="font-medium text-gray-900">{product.rating} / 5</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetail;
