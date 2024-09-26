// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import keycloak from './keycloak';
import App from './App';

// Create the root outside of keycloak.init to ensure it's created only once
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Initialize Keycloak and render the app upon successful authentication
keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
  .then((authenticated) => {
    if (authenticated) {
      root.render(<App />);
    } else {
      keycloak.login();
    }
  })
  .catch((error) => {
    console.error('Keycloak initialization failed', error);
  });
