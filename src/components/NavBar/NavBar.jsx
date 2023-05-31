import { Link } from 'react-router-dom';
import './NavBar.scss';
import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Logout from '../Login/Logout.jsx';

// icons
import TopicIcon from '@mui/icons-material/Topic';
import InboxIcon from '@mui/icons-material/Inbox';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShareIcon from '@mui/icons-material/Share';
import PersonIcon from '@mui/icons-material/Person';

export default function NavBar({ setCurrentTopic, display, setDisplay, setLoggedIn, removeCookie }) {
  //onClick functions must be anon to not be immediately called upon render

  useEffect(() => {
    // change the color of the nav bar component that is currently clicked
    if (display) {
      const current = document.getElementById(display);
      // remove class from previous component
      const prevElement = document.querySelector('.navBarCurrent');
      if (prevElement) {
        prevElement.classList.remove('navBarCurrent');
      }
      current.classList.add('navBarCurrent');
    }
  });

  const handleClick = (display) => {
    setDisplay(display);
  }

  return (
    <>
    <List className="navBar">
      <ListItem component={Link} to="/topic" className="ListItem" id="topic" onClick={() => {setCurrentTopic(); handleClick('topic')}}> 
        <TopicIcon></TopicIcon>
        <span>Topics</span>
      </ListItem>
      <ListItem component={Link} to="/producer" className="ListItem" id="producer" onClick={() => handleClick('producer')}>
        <InventoryIcon></InventoryIcon>
        <span>Producers</span>
      </ListItem>
      <ListItem component={Link} to="/broker" className="ListItem" id="broker" onClick={() => handleClick('broker')}>
        <ShareIcon></ShareIcon>
        <span>Brokers</span>
      </ListItem>
      <ListItem component={Link} to="/consumer" className="ListItem" id="consumer" onClick={() => handleClick('consumer')}>
        <InboxIcon></InboxIcon>
        <span>Consumers</span>
      </ListItem>
      <ListItem component={Link} to="/account" className="ListItem" id="account" onClick={() => handleClick('account')}>
        <PersonIcon/>
        <span>Account</span>
      </ListItem>
      <ListItem component={Link} to="/#" className="ListItem" id="logout">
        <PersonIcon/>
        <Logout setLoggedIn={setLoggedIn} removeCookie={removeCookie}></Logout>
      </ListItem>
    </List>
    </>
  );
}
