import type { CartItem } from '../types/product';

const STORAGE_KEY = 'cart';

export class SharedStorage {
  private static instance: SharedStorage;
  private listeners: Set<() => void> = new Set();

  static getInstance(): SharedStorage {
    if (!SharedStorage.instance) {
      SharedStorage.instance = new SharedStorage();
    }
    return SharedStorage.instance;
  }

  private constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.handleStorageChange.bind(this));
      
      // Also listen for custom events from the same origin
      window.addEventListener('cart-updated', this.handleCustomEvent.bind(this));
    }
  }

  private handleStorageChange(e: StorageEvent) {
    if (e.key === STORAGE_KEY) {
      this.notifyListeners();
    }
  }

  private handleCustomEvent() {
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (!item) return [];
      
      const parsed = JSON.parse(item);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      return [];
    }
  }

  setCartItems(items: CartItem[]) {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      
      // Dispatch both storage event and custom event
      window.dispatchEvent(new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: JSON.stringify(items),
        storageArea: localStorage
      }));
      
      window.dispatchEvent(new CustomEvent('cart-updated', {
        detail: { items }
      }));
      
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  clearCart() {
    this.setCartItems([]);
  }
}

export const sharedStorage = SharedStorage.getInstance();