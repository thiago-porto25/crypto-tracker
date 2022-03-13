import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import HTMLReactParser from 'html-react-parser';

import { CryptoContext } from '../context/cryptoContext';
import { SingleCoin } from '../config/api';
import { numberWithCommas } from '../components/Carousel';

import CoinInfo from '../components/CoinInfo';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  sidebar: {
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey',
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },
  description: {
    width: '100%',
    fontFamily: 'Montserrat',
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: 'justify',
  },
  marketData: {
    alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'start',
    },
  },
}));

export default function CoinPage() {
  const [coin, setCoin] = useState();
  const { currency, symbol } = useContext(CryptoContext);
  const { id } = useParams();

  const classes = useStyles();

  const fetchCoin = useCallback(async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }, [id]);

  useEffect(() => {
    fetchCoin();
  }, [fetchCoin]);

  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height={200}
          style={{ marginBottom: 30 }}
        />

        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>

        <Typography variant="subtitle1" className={classes.description}>
          {coin && HTMLReactParser(coin?.description.en.split('. ')[0])}.
        </Typography>

        <div className={classes.marketData}>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: 'Montserrat' }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp;
            <Typography variant="h5" style={{ fontFamily: 'Montserrat' }}>
              {symbol}&nbsp;
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: 'Montserrat' }}>
              {symbol}&nbsp;
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              &nbsp;M
            </Typography>
          </span>
        </div>
      </div>

      <CoinInfo coin={coin} />
    </div>
  );
}
