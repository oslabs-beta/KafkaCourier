import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './styles.scss';

export default function CredentialForm({ setInDatabase, sub }) {

  const serverUri = useRef();
  const apiKey = useRef();
  const apiSecret = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: sub,
          server: serverUri.current.value,
          key: apiKey.current.value,
          secret: apiSecret.current.value
        })
      });
      const result = await response.json();
      setInDatabase(true);
    } catch (err) {
      console.log('Error in CredentialForm: ', err);
    }
  }

  return (
    <div className="formContainer">
      <form>
        {/* <label>
          Enter Kafka Server URI:
          <input type="text" ref={props.serverUri} />
        </label> */}
        <TextField
          sx={{
            width: 300,
          }}
          required
          id="filled-required"
          label="Enter Kafka Server URI:"
          variant="filled"
          inputRef={serverUri}
        />

        {/* <label>
          Enter API Key:
          <input type="text" ref={props.apiKey} />
        </label> */}
        <TextField
          required
          id="filled-required"
          label="Enter API Key:"
          variant="filled"
          inputRef={apiKey}
        />

        {/* <label>
          Enter API Secret:
          <input type="password" ref={props.apiSecret} />
        </label> */}
        <TextField
          required
          id="filled-password-input"
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

//prop drill the state components from app
//handleClick function for submit button
