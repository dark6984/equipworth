import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Onboard from './pages/Onboard.jsx';
import './styles/nocturne.css';
import './styles/tokens.css';
import './styles/responsive.css';

const inviteMatch = window.location.pathname.match(/^\/invite\/([^/]+)\/?$/);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {inviteMatch ? <Onboard token={inviteMatch[1]} /> : <App />}
  </React.StrictMode>
);
