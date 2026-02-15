import { createContext } from 'react';

const DSAContext = createContext();

export const useDSAContext = () => {
  const context = React.useContext(DSAContext);
  if (!context) {
    throw new Error('useDSAContext must be used within DSAProvider');
  }
  return context;
};

export default DSAContext;