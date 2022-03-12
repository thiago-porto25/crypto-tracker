import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import CryptoContextProvider from './context/cryptoContext';

ReactDOM.render(
  <React.StrictMode>
    <CryptoContextProvider>
      <App />
    </CryptoContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
