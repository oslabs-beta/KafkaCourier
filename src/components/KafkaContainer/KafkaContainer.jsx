import React from 'react';
import { Link } from 'react-router-dom';
import Topic from '../KafkaComponents/Topic.jsx';
import Consumer from '../KafkaComponents/Consumer.jsx';
import Producer from '../KafkaComponents/Producer.jsx';
import ConsumptionRate from '../KafkaComponents/ConsumptionRate.jsx';
import { Routes, Route } from 'react-router-dom';
import './KafkaContainer.scss'

export default function KafkaContainer({ topicData, currentTopic, setCurrentTopic, consumerGroup }) {

  return (
    <div className="kafka-container">
      <Routes>
        {/* <Route path="/" element={<Consumer />}></Route> */}
        <Route
          path="/topic"
          element={<Topic topicData={topicData} currentTopic={currentTopic} setCurrentTopic={setCurrentTopic}/>}
        ></Route>
        <Route path="/producer" element={<Producer />}></Route>
        <Route path="/broker" element={<ConsumptionRate currentTopic={currentTopic} consumerGroup={consumerGroup}/>}></Route>
        <Route path="/consumer" element={<Consumer />}></Route>
      </Routes>
    </div>
  );
}
