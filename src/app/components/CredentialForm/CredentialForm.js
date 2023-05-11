import React, { useState, useRef } from 'react';
import './styles.css';

export default function CredentialForm(props) {

  const handleClick = () => {
    fetch('/api/addUser', {
      method: 'POST',
      headers: {

      },
      body: JSON.stringify({
        user: props.sub,
        server: props.serverUri,
        key: props.apiKey,
        secret: props.apiSecret
      })
    })
  }

  return (
    <div className="formContainer">
      <form onClick={props.handleClick}>
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

        <button>Submit</button>
      </form>
    </div>
  );
}

//prop drill the state components from app
//handleClick function for submit button
