import React, { useRef } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CredentialForm from './CredentialForm/CredentialForm.js';
import Dashboard from "./dashboard/Dashboard.jsx"

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
          {/* <Route path='/' element={<Login />}/> */} 
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route path= "/credentials" element={<CredentialForm/>}/>
          <Route path= "/home" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

