'use client';

import React from 'react';
import Image from 'next/image';
import { CartItem as CartItemType } from '../../share/types/cart';
import Button from './ui/Button';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity: number) => {
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="p-6 flex items-center space-x-4">
      <div className="relative h-20 w-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {item.name}
        </h3>
        <p className="text-lg font-bold text-gray-900">
          ${item.price}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </Button>
        
        <span className="w-12 text-center font-semibold">
          {item.quantity}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          +
        </Button>
      </div>
      
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRemove}
          className="mt-2 text-red-600 hover:text-red-700"
        >
          Kaldır
        </Button>
      </div>
    </div>
  );
};

export default CartItem; 