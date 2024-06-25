import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store'; // Assuming your Redux store is correctly exported from './app/store'
import reportWebVitals from './reportWebVitals';

// Create a root instance for rendering
const root = createRoot(document.getElementById('root'));

// Render the App component wrapped with the Redux Provider
root.render(
  <Provider store={store}>
    <h1>index</h1>
    <App />
  </Provider>
);

// Optional: Measure performance with reportWebVitals
reportWebVitals();
