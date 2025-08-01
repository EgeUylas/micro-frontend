export const STORAGE_KEYS = {
  CART: 'micro-frontend-cart',
  SYNC_EVENT: 'cart-sync',
  CART_UPDATED: 'cart-updated'
} as const;

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartData {
  items: CartItem[];
  total: number;
  itemCount: number;
  lastUpdated: number;
}

export const storageUtils = {
  // Basic storage operations
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch custom event for cross-app communication
      window.dispatchEvent(new CustomEvent(STORAGE_KEYS.SYNC_EVENT, {
        detail: { key, value, timestamp: Date.now() }
      }));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
      window.dispatchEvent(new CustomEvent(STORAGE_KEYS.SYNC_EVENT, {
        detail: { key, value: null, timestamp: Date.now() }
      }));
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  // Cart-specific operations
  getCart: (): CartData | null => {
    return storageUtils.get(STORAGE_KEYS.CART);
  },

  setCart: (cartData: CartData) => {
    storageUtils.set(STORAGE_KEYS.CART, cartData);
  },

  addToCart: (product: { id: string; name: string; price: number; image: string }) => {
    const currentCart = storageUtils.getCart() || { 
      items: [], 
      total: 0, 
      itemCount: 0, 
      lastUpdated: Date.now() 
    };
    
    const existingItem = currentCart.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.items.push({ ...product, quantity: 1 });
    }
    
    // Recalculate totals
    currentCart.itemCount = currentCart.items.reduce((sum, item) => sum + item.quantity, 0);
    currentCart.total = currentCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    currentCart.lastUpdated = Date.now();
    
    storageUtils.setCart(currentCart);
    return currentCart;
  },

  updateCartItemQuantity: (id: string, quantity: number) => {
    const currentCart = storageUtils.getCart();
    if (!currentCart) return;
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      currentCart.items = currentCart.items.filter(item => item.id !== id);
    } else {
      const item = currentCart.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    }
    
    // Recalculate totals
    currentCart.itemCount = currentCart.items.reduce((sum, item) => sum + item.quantity, 0);
    currentCart.total = currentCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    currentCart.lastUpdated = Date.now();
    
    storageUtils.setCart(currentCart);
    return currentCart;
  },

  removeFromCart: (id: string) => {
    const currentCart = storageUtils.getCart();
    if (!currentCart) return;
    
    currentCart.items = currentCart.items.filter(item => item.id !== id);
    currentCart.itemCount = currentCart.items.reduce((sum, item) => sum + item.quantity, 0);
    currentCart.total = currentCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    currentCart.lastUpdated = Date.now();
    
    storageUtils.setCart(currentCart);
    return currentCart;
  },

  clearCart: () => {
    const emptyCart: CartData = {
      items: [],
      total: 0,
      itemCount: 0,
      lastUpdated: Date.now()
    };
    storageUtils.setCart(emptyCart);
    return emptyCart;
  },

  // Event listener for cross-app communication
  onCartUpdate: (callback: (cartData: CartData) => void) => {
    if (typeof window === 'undefined') return () => {};
    
    const handleCartUpdate = (event: CustomEvent) => {
      if (event.detail.key === STORAGE_KEYS.CART) {
        callback(event.detail.value);
      }
    };
    
    // Also listen for storage events (for cross-tab communication)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEYS.CART && event.newValue) {
        try {
          const cartData = JSON.parse(event.newValue);
          callback(cartData);
        } catch (error) {
          console.error('Error parsing cart data from storage event:', error);
        }
      }
    };
    
    window.addEventListener(STORAGE_KEYS.SYNC_EVENT, handleCartUpdate as EventListener);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener(STORAGE_KEYS.SYNC_EVENT, handleCartUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }
}; 