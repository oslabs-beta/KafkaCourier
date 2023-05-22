import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import KafkaContainer from '../KafkaContainer/KafkaContainer.jsx';
import './dashboard.scss';
import Logout from '../Login/Logout.jsx'

//setState
export default function Dashboard({ setSub, setLoggedIn, setInDatabase, serverUri, apiKey, apiSecret }) {

  // set default display to topic
  const [display, setDisplay] = useState();
  const [topicData, setTopicData] = useState(
    JSON.stringify({
      topics: [],
      partitions: [],
      consumerGroups: [],
    })
  );


  /**** change useEffect dependency so it runs only on load and when display changes to topic ****/
  useEffect(() => {
    console.log('useEffect');
    getKafkaData('topic');
  }, []);

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
      setTopicData(JSON.stringify(data));
    } catch (error) {
      console.log('Error: ', error.message);
      // INVOKE GLOBAL ERROR HANDLER
    }
  };

  return (
    <div class="dashboard">
      {/* <Logout
        setInDatabase={setInDatabase}
        setSub={setSub}
        setLoggedIn={setLoggedIn}>
      </Logout> */}
      <NavBar display={display} setDisplay={setDisplay} getKafkaData={getKafkaData} />
      <KafkaContainer display={display} topicData={topicData} />
      <Logout setLoggedIn={setLoggedIn}></Logout>
    </div>
  );
}
