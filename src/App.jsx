import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import Routes from './routes';

import Theme from './theme';
import 'rsuite/lib/styles/index.less';

import './index.css';

function App() {
  const getFaviconElement = () => document.getElementById('favicon');

  const handleApplicationTitleAndFavicon = () => {
    document.title = process.env.REACT_APP_TITLE || 'Workflow';
    const favicon = getFaviconElement();
    favicon.href = process.env.REACT_APP_ICON;
  };

  useEffect(() => {
    handleApplicationTitleAndFavicon();
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Router>
        <div className="App" />
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
