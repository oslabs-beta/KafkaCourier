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

      // show helperText below input fields if any are empty
      // if (!server || !key || !secret) throw new Error();
      // if (!server) {
      //   console.log(serverUri);
      //   throw new Error('Server URI required');
      // }

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
        user_id: sub // add other relevant data if needed
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
        {/* <label>
          Enter Kafka Server URI:
          <input type="text" ref={props.serverUri} />
        </label> */}
        <TextField
          sx={{
            width: 300,
          }}
          required
          // id="filled-required"
          id="uri-input"
          label="Enter Kafka Server URI:"
          variant="filled"
          inputRef={serverUri}
          // helperText="Please enter a server URI"
        />

        {/* <label>
          Enter API Key:
          <input type="text" ref={props.apiKey} />
        </label> */}
        <TextField
          required
          // id="filled-required"
          id="api-key-input"
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
          // id="filled-password-input"
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

//prop drill the state components from app
//handleClick function for submit button
