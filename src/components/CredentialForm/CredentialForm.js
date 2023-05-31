import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './styles.scss';

export default function CredentialForm({ setInDatabase, sub, setCookie }) {

  const serverUri = useRef();
  const apiKey = useRef();
  const apiSecret = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const server = serverUri.current.value;
      const key = apiKey.current.value;
      const secret = apiSecret.current.value;

      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: sub,
          server,
          key,
          secret
        })
      });
      const result = await response.json();
      const userSession = {
        user_id: sub 
      }
      // set session cookie
      setCookie('kafka_courier_session', userSession, { path: '/' });

      setInDatabase(true);
    } catch (err) {
      console.log('Error in CredentialForm: ', err);
    }
  }

  return (
    <div className="formContainer">
      <form>
        <TextField
          sx={{
            width: 300,
          }}
          required
          id="uri-input"
          label="Enter Kafka Server URI:"
          variant="filled"
          inputRef={serverUri}
        />
        <TextField
          required
          id="api-key-input"
          label="Enter API Key:"
          variant="filled"
          inputRef={apiKey}
        />
        <TextField
          required
          id="api-secret-input"
          label="Enter API Secret:"
          type="password"
          variant="filled"
          inputRef={apiSecret}
        />

        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
}
