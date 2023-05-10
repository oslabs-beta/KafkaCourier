import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';

// set default display to topic

export default function Dashboard() {
  const [display, setDisplay] = useState('topic');
  //function here to determine which cluster component to display below
  //default display will be topic component

  //REPLACE WITH BROSWER ROUTER LINKS
  const renderComponent = () => {
    switch (display) {
      case 'producer':
        return <Producer />;
      case 'broker':
        return <Broker />;
      case 'consumer':
        return <Consumer />;
      default:
        return <Topic />;
    }
  };
  return (
    <>
      <NavBar />
      <div>{renderComponent()}</div>
    </>
  );
}

//conditionally render page associated with navBar selection
