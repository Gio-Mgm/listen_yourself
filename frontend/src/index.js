import React from 'react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import './index.css';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

Sentry.init({
    dsn: "https://660f2911f56549b59593362693de6fbe@o1341757.ingest.sentry.io/6615214",
    integrations: [
        new BrowserTracing(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});


const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </React.StrictMode>
);

