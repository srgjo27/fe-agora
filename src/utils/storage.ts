class LocalStorage {
  private static isBrowser(): boolean {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  }

  static setItem(key: string, value: any): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    try {
      const serializedValue =
        typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, serializedValue);

      return true;
    } catch (error) {
      return false;
    }
  }

  static getItem<T>(key: string, defaultValue?: T): T | null {
    if (!this.isBrowser()) {
      return defaultValue || null;
    }

    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      return defaultValue || null;
    }
  }

  static removeItem(key: string): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    try {
      localStorage.removeItem(key);

      return true;
    } catch (error) {
      return false;
    }
  }

  static clear(): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    try {
      localStorage.clear();

      return true;
    } catch (error) {
      return false;
    }
  }

  static hasItem(key: string): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    return localStorage.getItem(key) !== null;
  }

  static getAllKeys(): string[] {
    if (!this.isBrowser()) {
      return [];
    }

    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) keys.push(key);
    }

    return keys;
  }
}

class SessionStorage {
  private static isBrowser(): boolean {
    return (
      typeof window !== "undefined" && typeof sessionStorage !== "undefined"
    );
  }

  static setItem(key: string, value: any): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    try {
      const serializedValue =
        typeof value === "string" ? value : JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);

      return true;
    } catch (error) {
      return false;
    }
  }

  static getItem<T>(key: string, defaultValue?: T): T | null {
    if (!this.isBrowser()) {
      return defaultValue || null;
    }

    try {
      const item = sessionStorage.getItem(key);

      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      return defaultValue || null;
    }
  }

  static removeItem(key: string): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    try {
      sessionStorage.removeItem(key);

      return true;
    } catch (error) {
      return false;
    }
  }

  static clear(): boolean {
    try {
      sessionStorage.clear();

      return true;
    } catch (error) {
      return false;
    }
  }

  static hasItem(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }
}

export { LocalStorage, SessionStorage };
