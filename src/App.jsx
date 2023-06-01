import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import CredentialForm from './components/CredentialForm/CredentialForm.js';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Login from './components/Login/Login.js';
import Splash from './components/Splash/Splash.jsx';
import './styles.scss';

function Error() {
  return <div>THIS IS AN ERROR BAD</div>;
}

export default function App() {
  // loggedIn state
  const [loggedIn, setLoggedIn] = useState();
  const [inDatabase, setInDatabase] = useState();
  const [sub, setSub] = useState();
  const [serverUri, setServerUri] = useState(); // pkc-6ojv2.us-west4.gcp.confluent.cloud:9092
  const [apiKey, setApiKey] = useState(); // 66Q24F3Z7OMTPVPC
  const [apiSecret, setApiSecret] = useState(); // F9uRCY83yyn+Ta7xfV4HKL0pLfsCUeYXc0Jk40Afdamw/8E7cGCrIH+s+G58TLH3
  // cookie handling
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    // check if user has an existing session
    if (cookies.kafka_courier_session) {
      setSub(cookies.kafka_courier_session.user_id)
      setLoggedIn(true);
      setInDatabase(true);
    }
  })

  let components = !loggedIn ? (

    // DONT DELETE THIS STUFF BELOW !!

    // <Login
      // setSub={setSub}
      // setServerUri={setServerUri}
      // setApiKey={setApiKey}
      // setApiSecret={setApiSecret}
      // setInDatabase={setInDatabase}
      // setLoggedIn={setLoggedIn}
      // setCookie={setCookie}
    // />
    <Splash 
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
      setCookie={setCookie}
    />
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* // login page will be root path  */}
          <Route exact path="/" element={components}></Route>
          {/* Only allow users that are logged in to these pages */}
          <Route path='/login' element={
            <Login setSub={setSub} 
              setServerUri={setServerUri}
              setApiKey={setApiKey}
              setApiSecret={setApiSecret}
              setInDatabase={setInDatabase}
              setLoggedIn={setLoggedIn}
              setCookie={setCookie}
            />}>
          </Route>
          <Route path="/*" element={components}></Route>
        </Routes> 
      </BrowserRouter>
    </>
  );
}


