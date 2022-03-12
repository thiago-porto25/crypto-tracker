import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CryptoContextProvider from './context/cryptoContext';

import './index.css';
import 'react-alice-carousel/lib/alice-carousel.css';

ReactDOM.render(
  <CryptoContextProvider>
    <App />
  </CryptoContextProvider>,
  document.getElementById('root')
);
