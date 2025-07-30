export const STORAGE_KEYS = {
    CART: 'micro-frontend-cart',
    SYNC_EVENT: 'cart-sync'
  } as const
  
  export const storageUtils = {
    get: (key: string) => {
      if (typeof window === 'undefined') return null
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch {
        return null
      }
    },
    
    set: (key: string, value: any) => {
      if (typeof window === 'undefined') return
      try {
        localStorage.setItem(key, JSON.stringify(value))
        window.dispatchEvent(new CustomEvent(STORAGE_KEYS.SYNC_EVENT, {
          detail: { key, value }
        }))
      } catch (error) {
        console.error('Storage error:', error)
      }
    },
    
    remove: (key: string) => {
      if (typeof window === 'undefined') return
      localStorage.removeItem(key)
      window.dispatchEvent(new CustomEvent(STORAGE_KEYS.SYNC_EVENT, {
        detail: { key, value: null }
      }))
    }
  }