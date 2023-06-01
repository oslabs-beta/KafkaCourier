import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
    <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>, document.getElementById('root')
);