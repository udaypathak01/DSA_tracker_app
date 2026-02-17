import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Custom hook to access Auth context
 * Must be used within AuthProvider component
 * @throws {Error} if used outside of AuthProvider
 * @returns {Object} Auth context values and methods
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default useAuth;
