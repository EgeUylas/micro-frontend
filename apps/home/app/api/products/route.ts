import { NextResponse } from 'next/server';
import type { Product } from '@repo/ui';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Kablosuz Kulaklık',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    description: 'Gürültü önleyici özellikli yüksek kalite kablosuz kulaklık',
    category: 'Elektronik',
    stock: 15
  },
  {
    id: '2',
    name: 'Akıllı Saat',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    description: 'Sağlık takibi özellikli gelişmiş akıllı saat',
    category: 'Elektronik',
    stock: 8
  },
  {
    id: '3',
    name: 'Laptop Standı',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    description: 'Daha iyi duruş için ergonomik laptop standı',
    category: 'Aksesuar',
    stock: 25
  },
  {
    id: '4',
    name: 'Kablosuz Mouse',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=300&fit=crop',
    description: 'Uzun pil ömrü olan ergonomik kablosuz mouse',
    category: 'Elektronik',
    stock: 30
  }
];

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return NextResponse.json(mockProducts);
}