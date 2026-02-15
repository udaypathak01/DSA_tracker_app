/**
 * Save data to localStorage
 * @param {string} key - The storage key
 * @param {any} value - The value to store
 * @returns {boolean} - Success status
 */
export const saveToLocalStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage [${key}]:`, error);
    return false;
  }
};

/**
 * Load data from localStorage
 * @param {string} key - The storage key
 * @param {any} fallback - Fallback value if key doesn't exist
 * @returns {any} - The stored value or fallback
 */
export const loadFromLocalStorage = (key, fallback = null) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error loading from localStorage [${key}]:`, error);
    return fallback;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - The storage key
 * @returns {boolean} - Success status
 */
export const removeFromLocalStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage [${key}]:`, error);
    return false;
  }
};

/**
 * Clear all localStorage data for the app
 * @returns {boolean} - Success status
 */
export const clearAllLocalStorage = () => {
  try {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith('dsa-')) {
        keys.push(key);
      }
    }
    keys.forEach(key => window.localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};
