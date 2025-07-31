import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../share/types/product';

interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null,
};

// Mock API call for products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock product data
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
    
    return mockProducts;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productSlice.reducer; 