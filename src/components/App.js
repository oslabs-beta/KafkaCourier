import React, { useRef } from 'react';
import CredentialForm from '../CredentialForm/CredentialForm.js';

export default function App() {
  // loggedIn state
  const serverUri = useRef();
  const apiKey = useRef();
  const apiSecret = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    console.log('hello');
    console.log(serverUri.current.value);
  };

  return (
    <div>
      {/* if !loggedIn */}
      <CredentialForm
        serverUri={serverUri}
        apiKey={apiKey}
        apiSecret={apiSecret}
        handleClick={handleClick}
      />
      {/* else 
      <Dashboard 
        serverUri={serverUri}
        apiKey={apiKey}
        apiSecret={apiSecret}
      />
      */}
    </div>
  );
}
