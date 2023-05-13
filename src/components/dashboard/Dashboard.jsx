import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import KafkaContainer from '../KafkaContainer/KafkaContainer.jsx';


//setState 

export default function Dashboard() {
  // set default display to topic
  const [display, setDisplay] = useState('topic');
 
  return (
    <>
      <NavBar setDisplay={setDisplay} getKafkaData={getKafkaData}/>
      <KafkaContainer display={display}/>
      <div></div>
    </>
  );
}

const getKafkaData = async (kafkaComponent) => {
  console.log('getKafka function invoked');
  try {
    // fetch from backend
    const res = await fetch(`/api/${kafkaComponent}`);
    // error handler for invalid responses
    if (!res.ok) {
      throw new Error('Request failed');
    }
    // get data to populate table
    const data = await res.json();
    console.log(data);
  }
  catch (error) {
    console.log('Error: ', error.message);
  }
}