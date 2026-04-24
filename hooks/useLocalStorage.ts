import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para manejar la hidratación
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Estado interno para almacenar el valor
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Cargar desde localStorage una vez que el componente se monta en el cliente
  useEffect(() => {
    setIsHydrated(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // Función para actualizar tanto el estado como el localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Si no está hidratado, devolvemos el valor inicial para evitar errores de hidratación
  return [isHydrated ? storedValue : initialValue, setValue, isHydrated] as const;
}
