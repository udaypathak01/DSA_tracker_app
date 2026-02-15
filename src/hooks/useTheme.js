import { useCallback } from 'react';
import { useDSA } from './useDSA';

/**
 * Custom hook for theme management
 * @returns {Object} - theme and toggleTheme function
 */
export const useTheme = () => {
  const { theme, updateTheme } = useDSA();

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    updateTheme(newTheme);
  }, [theme, updateTheme]);

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    updateTheme,
  };
};

export default useTheme;
