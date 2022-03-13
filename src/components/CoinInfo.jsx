import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { CircularProgress, makeStyles, ThemeProvider } from '@material-ui/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { CryptoContext } from '../context/cryptoContext';
import { HistoricalChart } from '../config/api';
import { chartDays } from '../config/data';
import { darkTheme } from '../styles/darkTheme';

import SelectButton from '../components/SelectButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles((theme) => ({
  container: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

export default function CoinInfo({ coin }) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = useContext(CryptoContext);

  const classes = useStyles();

  const fetchHistoricalData = useCallback(async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  }, [coin.id, days, currency]);

  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData ? (
          <CircularProgress
            thickness={1}
            size={250}
            style={{ color: 'gold' }}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: '#EEBC1D',
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />

            <div
              style={{
                display: 'flex',
                marginTop: 20,
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
