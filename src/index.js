import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './app/reportWebVitals';
import {AuthProvider} from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
const basename = process.env.PUBLIC_URL || '';
root.render(
    <React.StrictMode>
        <BrowserRouter basename={basename}>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
