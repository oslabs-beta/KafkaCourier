import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import KafkaContainer from '../KafkaContainer/KafkaContainer.jsx';


//setState 

export default function Dashboard() {
  // set default display to topic
  const [display, setDisplay] = useState('topic');
  
  return (
    <>
      <NavBar setDisplay={setDisplay}/>
      <KafkaContainer display={display}/>
      <div></div>
    </>
  );
}

//conditionally render page associated with navBar selection
