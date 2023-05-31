import React from "react";
import "./Splash.scss";
import Hero from "./Hero.jsx";
import Benefits from './Benefits.jsx';
import Team from './Team.jsx'; 
import TechStack from './TechStack.jsx'

export default function Splash() {
  return (
    <div>
      <Hero></Hero>
      <Benefits></Benefits>
      <Team></Team>
      <TechStack></TechStack>
    </div>
  );
}