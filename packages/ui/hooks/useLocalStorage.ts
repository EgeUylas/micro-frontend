import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        setStoredValue(initialValue);
        return;
      }
      
      const parsed = JSON.parse(item);
      // Array type check for safety
      if (Array.isArray(initialValue) && !Array.isArray(parsed)) {
        setStoredValue(initialValue);
        return;
      }
      setStoredValue(parsed);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setStoredValue(initialValue);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (isClient && typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: JSON.stringify(valueToStore),
          oldValue: JSON.stringify(storedValue)
        }));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    if (!isClient) return;
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const parsed = JSON.parse(e.newValue);
          // Array type check for safety
          if (Array.isArray(initialValue) && !Array.isArray(parsed)) {
            setStoredValue(initialValue);
            return;
          }
          setStoredValue(parsed);
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
          setStoredValue(initialValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, isClient, initialValue]);

  return [storedValue, setValue, isClient] as const;
}