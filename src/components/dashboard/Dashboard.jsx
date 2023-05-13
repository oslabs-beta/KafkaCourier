import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import KafkaContainer from '../KafkaContainer/KafkaContainer.jsx';

//setState
export default function Dashboard() {
  // set default display to topic
  const [display, setDisplay] = useState('topic');
  const [topicData, setTopicData] = useState(
    JSON.stringify({
      topics: [],
      partitions: [],
      consumerGroups: [],
    })
  );

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
      console.log(typeof data);
      console.log('before setting state: ', topicData);
      setTopicData(JSON.stringify(data));
      console.log('after setting state: ', topicData);
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  return (
    <>
      <NavBar setDisplay={setDisplay} getKafkaData={getKafkaData} />
      <KafkaContainer display={display} topicData={topicData} />
      <div></div>
    </>
  );
}
