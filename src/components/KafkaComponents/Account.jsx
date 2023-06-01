import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Account.scss';

export default function Account() {
  const newServerUri = useRef();
  const newApiKey = useRef();
  const newApiSecret = useRef();

  const sessionCookie = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('kafka_courier_session='))
    ?.split('=')[1];
  const decoded = JSON.parse(decodeURIComponent(sessionCookie));
  const user_id = decoded.user_id;
  console.log('user_id 1: ', user_id);

  const handleClick = async (e) => {
    e.preventDefault(); //prevents clicking button from automatically submitting things in the form
    try {
      const server = newServerUri.current.value;
      const key = newApiKey.current.value;
      const secret = newApiSecret.current.value;

      if (!server || !key || !secret) alert('Fields cannot be empty.');

      const response = await fetch('/api/updateUser', {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          user_id,
          server,
          key,
          secret,
        }),
      });
      newServerUri.current.value = '';
      newApiKey.current.value = '';
      newApiSecret.current.value = '';
      //information updated
      alert('Information updated.');
    } catch (error) {
      console.log('Error in updating user: ', error);
    }
  };

  return (
    <div id="account">
      <h3>Enter Updated Credentials</h3>
      <div className="formContainer">
        <form>
          <TextField
            sx={{
              width: 300,
            }}
            required
            id="new-uri-input"
            label="Enter New Kafka Server URI:"
            variant="filled"
            inputRef={newServerUri}
          />
          <TextField
            required
            id="new-api-key-input"
            label="Enter New API Key:"
            variant="filled"
            inputRef={newApiKey}
          />
          <TextField
            required
            id="new-api-secret-input"
            label="Enter New API Secret:"
            type="password"
            variant="filled"
            inputRef={newApiSecret}
          />
          <button onClick={handleClick}>Submit</button>
        </form>
      </div>
    </div>
  );
}
