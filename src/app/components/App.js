import React, { useRef, useState } from 'react';
import CredentialForm from './CredentialForm/CredentialForm.js';
import Login from '../pages/Login/Login.js';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [inDatabase, setInDatabase] = useState(false);
  const [sub, setSub] = useState();
  const serverUri = useRef();
  const apiKey = useRef();
  const apiSecret = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    console.log('hello');
    console.log(serverUri.current.value);
  };

  let components = !loggedIn ? <Login setSub={setSub} setLoggedIn={setLoggedIn}/> : 
    inDatabase ? <Dashboard 
    serverUri={serverUri}
    apiKey={apiKey}
    apiSecret={apiSecret}
    /> : <CredentialForm
      serverUri={serverUri}
      apiKey={apiKey}
      apiSecret={apiSecret}
      handleClick={handleClick}
    />
  

  return (
    <div>
      {components}
      {/* if !loggedIn */}
      {/* <Login setSub={setSub}/> */}

      {/* <CredentialForm
        serverUri={serverUri}
        apiKey={apiKey}
        apiSecret={apiSecret}
        handleClick={handleClick}
      />
      
      <Dashboard 
        serverUri={serverUri}
        apiKey={apiKey}
        apiSecret={apiSecret}
      /> */}
     
    </div>
  );
}
