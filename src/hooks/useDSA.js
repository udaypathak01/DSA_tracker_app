import { useContext } from 'react';
import DSAContext from '../context/DSAContext';

/**
 * Custom hook to use DSA Context
 * @throws {Error} if used outside of DSAProvider
 * @returns {Object} DSA context value
 */
export const useDSA = () => {
  const context = useContext(DSAContext);
  if (!context) {
    throw new Error('useDSA must be used within DSAProvider');
  }
  return context;
};

export default useDSA;
