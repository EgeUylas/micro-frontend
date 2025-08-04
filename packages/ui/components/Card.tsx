import React from 'react';
import { Product } from '../types/product';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  showAddToCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  showAddToCart = true
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="w-full h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          {showAddToCart && onAddToCart && (
            <Button
              onClick={() => onAddToCart(product)}
              size="sm"
              className="ml-2"
            >
              Sepete Ekle
            </Button>
          )}
        </div>
        {product.stock !== undefined && (
          <div className="mt-2">
            <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} adet stokta` : 'Stokta yok'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};