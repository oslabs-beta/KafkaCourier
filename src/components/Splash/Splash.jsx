import React from "react";
import "./Splash.scss";
import Hero from "./Hero.jsx";
import Benefits from './Benefits.jsx';
import Team from './Team.jsx'; 
import TechStack from './TechStack.jsx';
import GetStarted from './GetStarted.jsx';
import Login from '../Login/Login.js';

export default function Splash({
  setSub,
  setServerUri,
  setApiKey,
  setApiSecret,
  setLoggedIn,
  setInDatabase, 
  setCookie
}) {
  return (
    <div className='main-container'>
      <Hero />
      <Benefits />
      <GetStarted />
      <TechStack />
      <Team />   
      <Login 
        setSub={setSub}
        setServerUri={setServerUri}
        setApiKey={setApiKey}
        setApiSecret={setApiSecret}
        setInDatabase={setInDatabase}
        setLoggedIn={setLoggedIn}
        setCookie={setCookie}
      />
    </div>
  );
}