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
          <Route path="/*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

/*
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
*/



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