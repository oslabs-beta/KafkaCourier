import React, { useState, useRef } from 'react';
import './styles.css';

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
        <label>
          Enter Kafka Server URI:
          <input type="text" ref={props.serverUri} />
        </label>

        <label>
          Enter API Key:
          <input type="text" ref={props.apiKey} />
        </label>

        <label>
          Enter API Secret:
          <input type="password" ref={props.apiSecret} />
        </label>

        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
}

//prop drill the state components from app
//handleClick function for submit button
