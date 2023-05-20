import React from 'react';
import { Link } from 'react-router-dom';
import Topic from '../KafkaComponents/Topic.jsx';
import Consumer from '../KafkaComponents/Consumer.jsx';
import Producer from '../KafkaComponents/Producer.jsx';
import Broker from '../KafkaComponents/Broker.jsx';
import { Routes, Route } from 'react-router-dom';
import './KafkaContainer.scss'

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
      </Routes>
    </div>
  );

  // conditionally render components depending on display state
  // switch(props.display) {
  //   case 'consumer':
  //     return <div id='kafka'><Consumer /></div>;
  //   case 'producer':
  //     return <Producer />;
  //   case 'broker':
  //     return <Broker/>;
  //   case 'topic':
  //     return <Topic />;
  //   default:
  //     return <Topic />
  // }
}
