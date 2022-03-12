import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import './App.css';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#141618',
    color: 'white',
    minHeight: '100vh',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/coins/:id" element={<CoinPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
