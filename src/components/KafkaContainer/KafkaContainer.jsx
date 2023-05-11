import React from 'react';
import { Link } from 'react-router-dom';

export default function KafkaContainer(props) {
  return <h1>This is KafkaContainer</h1>
  // conditionally render components depending on display state
  switch(props.display) {
    case 'producer':
      return <Producer />;
    case 'broker':
      return <Broker/>;
    case 'topic':
      return <Topic />;
    case 'consumer':
      return <Consumer />;
    default:
      return <Topic />
  }
}


