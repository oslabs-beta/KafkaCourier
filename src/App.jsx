import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CredentialForm from './components/CredentialForm/CredentialForm.js';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Login from './components/Login/Login.js';
import { useCookies } from 'react-cookie';

function Error() {
  return <div>THIS IS AN ERROR BAD</div>;
}

export default function App() {
  // loggedIn state
  const [loggedIn, setLoggedIn] = useState();
  const [inDatabase, setInDatabase] = useState(); // '111429477736994873824'
  const [sub, setSub] = useState();
  const [serverUri, setServerUri] = useState();
  const [apiKey, setApiKey] = useState();
  const [apiSecret, setApiSecret] = useState();
  // cookie handling
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    // check if user has an existing session
    if (cookies.kafka_courier_session) {
      setSub(cookies.kafka_courier_session.user_id)
      setLoggedIn(true);
      setInDatabase(true);// what happens if the user has an active session but hasn't entered kafka credentials yet?
    }
    else {
      setLoggedIn(false);
    }
  })

  let components = !loggedIn ? (
    <Login
      setSub={setSub}
      setServerUri={setServerUri}
      setApiKey={setApiKey}
      setApiSecret={setApiSecret}
      setInDatabase={setInDatabase}
      setLoggedIn={setLoggedIn}
      setCookie={setCookie}
    />
  ) : inDatabase ? (
    <Dashboard serverUri={serverUri} apiKey={apiKey} apiSecret={apiSecret} 
      setInDatabase={setInDatabase}
      setSub={setSub}
      setLoggedIn={setLoggedIn}
      removeCookie={removeCookie}/>
  ) : (
    <CredentialForm
      setInDatabase={setInDatabase}
      sub={sub}
      serverUri={serverUri}
      apiKey={apiKey}
      apiSecret={apiSecret}
    />
  );

  return (
    <>
     
      {/* if !loggedIn */}
      {/* <Dashboard />
      <CredentialForm
        serverUri={serverUri}
        apiKey={apiKey}
        apiSecret={apiSecret}
        handleClick={handleClick}
      /> */}
      {/* // this part will load after Oauth 
      // check to see if googleID is present in database setState to present
      // if present load dashboard else load CredentialForm */}

      <BrowserRouter>
        <Routes>
          {/* // login page will be root path  */}
          <Route exact path="/" element={components}></Route>
          {/* <Route path="/credentials" element={<CredentialForm />} /> */}

          {/* Only allow users that are logged in to these pages */}
          <Route path="/*" element={components}></Route>
           {/* <Route path="/*" element={<Dashboard serverUri={serverUri} apiKey={apiKey} apiSecret={apiSecret} 
            setInDatabase={setInDatabase}
            setSub={setSub}
            setLoggedIn={setLoggedIn}/>} /> */}
        </Routes> 
      </BrowserRouter>
    </>
  );
}


