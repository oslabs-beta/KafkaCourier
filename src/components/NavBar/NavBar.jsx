import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';


export default function NavBar(props) {
//onClick functions must be anon to not be immediately called upon render
  return (
    <nav>
      <Link to="/home/producer">
        <button onClick={() => props.setDisplay('producer')}>Producer</button>
      </Link>
      <Link to="/home/broker">
        <button onClick={() => props.setDisplay('broker')}>Broker</button>
      </Link>
      <Link to="/home/topic">
        <button onClick={() => {
          props.setDisplay('topic');
          props.getKafkaData('topic');
        }}>Topic</button>
      </Link>
      <Link to="/home/consumer">
        <button onClick={() => props.setDisplay('consumer')}>Consumer</button>
      </Link>
    </nav>
  );
}
