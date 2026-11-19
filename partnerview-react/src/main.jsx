import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/app.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App accent="#6A4FE0" ground="#F6F5FB" />
  </React.StrictMode>
);
