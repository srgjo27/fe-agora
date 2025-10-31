// Local storage utilities dengan error handling

class LocalStorage {
  // Set item with error handling
  static setItem(key: string, value: any): boolean {
    try {
      const serializedValue = JSON.stringify(value);

      localStorage.setItem(key, serializedValue);

      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);

      return false;
    }
  }

  // Get item with error handling
  static getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);

      return defaultValue || null;
    }
  }

  // Remove item
  static removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key);

      return true;
    } catch (error) {
      console.error("Error removing from localStorage:", error);

      return false;
    }
  }

  // Clear all items
  static clear(): boolean {
    try {
      localStorage.clear();

      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);

      return false;
    }
  }

  // Check if key exists
  static hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  // Get all keys
  static getAllKeys(): string[] {
    const keys: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key) keys.push(key);
    }

    return keys;
  }
}

// Session storage utilities
class SessionStorage {
  static setItem(key: string, value: any): boolean {
    try {
      const serializedValue = JSON.stringify(value);

      sessionStorage.setItem(key, serializedValue);

      return true;
    } catch (error) {
      console.error("Error saving to sessionStorage:", error);

      return false;
    }
  }

  static getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = sessionStorage.getItem(key);

      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error("Error reading from sessionStorage:", error);

      return defaultValue || null;
    }
  }

  static removeItem(key: string): boolean {
    try {
      sessionStorage.removeItem(key);

      return true;
    } catch (error) {
      console.error("Error removing from sessionStorage:", error);

      return false;
    }
  }

  static clear(): boolean {
    try {
      sessionStorage.clear();

      return true;
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);

      return false;
    }
  }

  static hasItem(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }
}

export { LocalStorage, SessionStorage };
