import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import KafkaContainer from '../KafkaContainer/KafkaContainer.jsx';
import './dashboard.scss';
import Logout from '../Login/Logout.jsx'

//setState
export default function Dashboard({ setSub, setLoggedIn, setInDatabase, removeCookie }) {
  // set default display to topic
  const [display, setDisplay] = useState();
  const [currentTopic, setCurrentTopic] = useState();
  const [topicData, setTopicData] = useState(
    JSON.stringify({
      topics: [],
      partitions: [],
      consumerGroups: [],
    })
  );

  /**** change useEffect dependency so it runs only on load and when display changes to topic ****/
  useEffect(() => {
    getKafkaData('topic');
  }, []);

  const getKafkaData = async (kafkaComponent) => {
    try {
      // fetch from backend
      const res = await fetch(`/api/${kafkaComponent}`);
      // error handler for invalid responses
      if (!res.ok) {
        throw new Error('Request failed');
      }     
      const data = await res.json();
      setTopicData(JSON.stringify(data));
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  return (
    <div className="dashboard">
      <NavBar display={display} setDisplay={setDisplay} getKafkaData={getKafkaData} setCurrentTopic={setCurrentTopic} setLoggedIn={setLoggedIn} removeCookie={removeCookie}/>
      <KafkaContainer display={display} topicData={topicData} currentTopic={currentTopic} setCurrentTopic={setCurrentTopic}/>
    </div>
  );
}
