import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './styles.scss';

export default function CredentialForm(props) {

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: props.sub,
          server: props.serverUri.current.value,
          key: props.apiKey.current.value,
          secret: props.apiSecret.current.value
        })
      });
      const result = await response.json();
      props.setInDatabase(true);
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
          inputRef={props.serverUri}
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
          inputRef={props.apiKey}
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
          inputRef={props.apiSecret}
        />

        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
}

//prop drill the state components from app
//handleClick function for submit button
