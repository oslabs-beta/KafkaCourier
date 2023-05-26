import React from 'react';
import Topic from '../KafkaComponents/Topic.jsx';
import Consumer from '../KafkaComponents/Consumer.jsx';
import Producer from '../KafkaComponents/Producer.jsx';
import Broker from '../KafkaComponents/Broker.jsx';
import Account from '../KafkaComponents/Account.jsx';
import { Link, Routes, Route } from 'react-router-dom';
import './KafkaContainer.scss';

export default function KafkaContainer(props) {
  return (
    <div className="kafka-container">
      <Routes>
        {/* <Route path="/" element={<Consumer />}></Route> */}
        <Route
          path="/topic"
          element={<Topic topicData={props.topicData} />}
        ></Route>
        <Route path="/producer" element={<Producer />}></Route>
        <Route path="/broker" element={<Broker />}></Route>
        <Route path="/consumer" element={<Consumer />}></Route>
        <Route path="/account" element={<Account />}></Route>
      </Routes>
    </div>
  );
}
