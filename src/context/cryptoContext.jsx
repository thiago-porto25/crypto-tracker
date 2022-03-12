import { createContext, useEffect, useState } from 'react';

export const CryptoContext = createContext();

export default function CryptoContextProvider({ children }) {
  const [currency, setCurrency] = useState('BRL');
  const [symbol, setSymbol] = useState('R$');

  useEffect(() => {
    if (currency === 'BRL') setSymbol('R$');
    if (currency === 'USD') setSymbol('$');
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
}
