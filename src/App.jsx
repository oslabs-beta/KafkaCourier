import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CredentialForm from "./components/CredentialForm/CredentialForm.js";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Login from "./components/Login/Login.js";
import { useCookies } from "react-cookie";
import Splash from "./components/Splash/Splash.jsx";

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
      setSub(cookies.kafka_courier_session.user_id);
      setLoggedIn(true);
      setInDatabase(true);
    }
  });

  let components = !loggedIn ? (
    // <Login
    //   setSub={setSub}
    //   setServerUri={setServerUri}
    //   setApiKey={setApiKey}
    //   setApiSecret={setApiSecret}
    //   setInDatabase={setInDatabase}
    //   setLoggedIn={setLoggedIn}
    //   setCookie={setCookie}
    // />
    <Splash></Splash>
  ) : inDatabase ? (
    <Dashboard
      serverUri={serverUri}
      apiKey={apiKey}
      apiSecret={apiSecret}
      setInDatabase={setInDatabase}
      setSub={setSub}
      setLoggedIn={setLoggedIn}
      removeCookie={removeCookie}
    />
  ) : (
    <CredentialForm
      setInDatabase={setInDatabase}
      sub={sub}
      setCookie={setCookie}
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
