import React from "react";
import Hero from "./Hero.jsx";
import Benefits from './Benefits.jsx';
import Team from './Team.jsx'; 
import TechStack from './TechStack.jsx';
import GetStarted from './GetStarted.jsx';
import "./Splash.scss";

export default function Splash() {
  return (
    <div className='main-container'>
      <Hero />
      <Benefits />
      <GetStarted />
      <TechStack />
      <Team />   
    </div>
  );
}