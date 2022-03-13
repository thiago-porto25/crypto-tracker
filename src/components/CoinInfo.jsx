import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';

import { CryptoContext } from '../context/cryptoContext';
import { HistoricalChart } from '../config/api';
import { darkTheme } from '../styles/darkTheme';
import { ThemeProvider } from '@material-ui/core';

export default function CoinInfo({ coin }) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = useContext(CryptoContext);

  const fetchHistoricalData = useCallback(async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  }, [coin.id, days, currency]);

  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  return <ThemeProvider theme={darkTheme}>CoinInfo</ThemeProvider>;
}
