import React, { useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CredentialForm from './components/CredentialForm/CredentialForm.js';
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Login from './components/Login/Login.js';

function Error() {
  return (
    <div>THIS IS AN ERROR BAD</div>
  )
}

export default function App() {
  // loggedIn state
  const [loggedIn, setLoggedIn] = useState(false);
  const [inDatabase, setInDatabase] = useState();
  const [sub, setSub] = useState();
  const serverUri = useRef();
  const apiKey = useRef();
  const apiSecret = useRef();

  // const handleClick = async () => {
  //   const response = await fetch('/api/createUser', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user: sub,
  //       server: serverUri.current.value,
  //       key: apiKey.current.value,
  //       secret: apiSecret.current.value
  //     })
  //   });
  //   const result = response.json();
  //   console.log(result);
  // };

  
let components = !loggedIn ? <Login setInDatabase={setInDatabase} setSub={setSub} setLoggedIn={setLoggedIn}/> : 
  inDatabase ? 
    <Dashboard 
      serverUri={serverUri}
      apiKey={apiKey}
      apiSecret={apiSecret}
    /> : 
    <CredentialForm
      setInDatabase={setInDatabase}
      sub={sub}
      serverUri={serverUri}
      apiKey={apiKey}
      apiSecret={apiSecret}
    />


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
          {/* <Route path='/' element={<Login />}/> */} 
          <Route exact path="/" element={components}></Route>
          <Route path= "/credentials" element={<CredentialForm/>}/>
          <Route path= "/home" element={<Dashboard/>}/>
          <Route path="/*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}





// return (
//     <div>
//       {components}
//       {/* if !loggedIn */}
//       {/* <Login setSub={setSub}/> */}

//       {/* <CredentialForm
//         serverUri={serverUri}
//         apiKey={apiKey}
//         apiSecret={apiSecret}
//         handleClick={handleClick}
//       />
      
//       <Dashboard 
//         serverUri={serverUri}
//         apiKey={apiKey}
//         apiSecret={apiSecret}
//       /> */}
     
      // </div>
      // );