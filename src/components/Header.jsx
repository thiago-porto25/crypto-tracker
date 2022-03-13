import {
  AppBar,
  Container,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  ThemeProvider,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CryptoContext } from '../context/cryptoContext';
import { darkTheme } from '../styles/darkTheme';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}));

export default function Header() {
  const { currency, setCurrency } = useContext(CryptoContext);
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLogoClick = () => navigate('/');

  const handleChangeCurrency = (e) => setCurrency(e.target.value);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={handleLogoClick}
              className={classes.title}
              variant="h6"
            >
              Crypto Tracker
            </Typography>
            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 15 }}
              value={currency}
              onChange={handleChangeCurrency}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="BRL">BRL</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
