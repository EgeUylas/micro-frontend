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
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
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
      console.error('Storage error:', error);
    }
  },
  
  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent(STORAGE_KEYS.SYNC_EVENT, {
      detail: { key, value: null, timestamp: Date.now() }
    }));
  },

  // Cart specific methods
  getCart: (): CartData | null => {
    return storageUtils.get(STORAGE_KEYS.CART) as CartData | null;
  },

  setCart: (cartData: CartData) => {
    storageUtils.set(STORAGE_KEYS.CART, {
      ...cartData,
      lastUpdated: Date.now()
    });
  },

  addToCart: (product: { id: string; name: string; price: number; image: string }) => {
    const currentCart = storageUtils.getCart() || { items: [], total: 0, itemCount: 0, lastUpdated: Date.now() };
    const existingItem = currentCart.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.items.push({ ...product, quantity: 1 });
    }
    
    currentCart.itemCount = currentCart.items.reduce((sum, item) => sum + item.quantity, 0);
    currentCart.total = currentCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    storageUtils.setCart(currentCart);
    return currentCart;
  },

  updateCartItemQuantity: (productId: string, quantity: number) => {
    const currentCart = storageUtils.getCart();
    if (!currentCart) return null;
    
    const item = currentCart.items.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        currentCart.items = currentCart.items.filter(item => item.id !== productId);
      }
    }
    
    currentCart.itemCount = currentCart.items.reduce((sum, item) => sum + item.quantity, 0);
    currentCart.total = currentCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    storageUtils.setCart(currentCart);
    return currentCart;
  },

  removeFromCart: (productId: string) => {
    const currentCart = storageUtils.getCart();
    if (!currentCart) return null;
    
    currentCart.items = currentCart.items.filter(item => item.id !== productId);
    currentCart.itemCount = currentCart.items.reduce((sum, item) => sum + item.quantity, 0);
    currentCart.total = currentCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    storageUtils.setCart(currentCart);
    return currentCart;
  },

  clearCart: () => {
    storageUtils.setCart({ items: [], total: 0, itemCount: 0, lastUpdated: Date.now() });
  },

  // Event listeners for cross-app communication
  onCartUpdate: (callback: (cartData: CartData) => void) => {
    if (typeof window === 'undefined') return () => {};
    
    const handleCartUpdate = (event: CustomEvent) => {
      if (event.detail.key === STORAGE_KEYS.CART) {
        callback(event.detail.value);
      }
    };
    
    window.addEventListener(STORAGE_KEYS.SYNC_EVENT, handleCartUpdate as EventListener);
    
    return () => {
      window.removeEventListener(STORAGE_KEYS.SYNC_EVENT, handleCartUpdate as EventListener);
    };
  }
}; 