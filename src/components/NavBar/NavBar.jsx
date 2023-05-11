import React from 'react';
import { Link } from 'react-router-dom'


export default function NavBar(props) {

  //functionality to update state 
  return (
    <>
      <h1>This is the navbar component</h1>
      {/* <Link to="/producer">
        <button onClick={props.setDisplay('producer')}>Producer</button>
      </Link>
      <Link to="/broker">
        <button onClick={props.setDisplay('broker')}>Broker</button>
      </Link>
      <Link to="/topic">
        <button onClick={props.setDisplay('topic')}>Topic</button>
      </Link>
      <Link to="/consumer">
        <button onClick={props.setDisplay('consumer')}>Consumer</button>
      </Link> */}
    </>
  );
}
