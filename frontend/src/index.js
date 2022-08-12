import React from 'react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import './index.css';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </React.StrictMode>
);

