// import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
//MUI dependencies 
import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// icons
import TopicIcon from '@mui/icons-material/Topic';
import InboxIcon from '@mui/icons-material/Inbox';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShareIcon from '@mui/icons-material/Share';
import PersonIcon from '@mui/icons-material/Person';

export default function NavBar(props) {
  //onClick functions must be anon to not be immediately called upon render

  useEffect(() => {
    // change the color of the nav bar component that is currently clicked
    if (props.display) {
      const current = document.getElementById(props.display);
      // remove class from previous component
      const prevElement = document.querySelector('.navBarCurrent');
      if (prevElement) {
        prevElement.classList.remove('navBarCurrent');
      }
      current.classList.add('navBarCurrent');

    }
  })

  return (
    <List className="navBar" sx={{
      color:'#F8F2E3',
      // backgroundColor: 'lightgrey'
      border: '2px solid #F8F2E3',
      marginRight: '10px',
      paddingTop: 0
    }}>
      <ListItem component={Link} to="/topic" className="ListItem" id="topic" onClick={() => props.setDisplay('topic')}>
        <TopicIcon></TopicIcon>
        <span>Topics</span>
      </ListItem>
      <ListItem component={Link} to="/producer" className="ListItem" id="producer" onClick={() => props.setDisplay('producer')}>
        <InventoryIcon></InventoryIcon>
        <span>Producers</span>
      </ListItem>
      <ListItem component={Link} to="/broker" className="ListItem" id="broker" onClick={() => props.setDisplay('broker')}>
        <ShareIcon></ShareIcon>
        <span>Brokers</span>
      </ListItem>
      <ListItem component={Link} to="/consumer" className="ListItem" id="consumer" onClick={() => props.setDisplay('consumer')}>
        <InboxIcon></InboxIcon>
        <span>Consumers</span>
      </ListItem>
      <ListItem component={Link} to="/account" className="ListItem" id="account" onClick={() => props.setDisplay('account')}>
        <PersonIcon/>
        <span>Account</span>
      </ListItem>
    </List>
  )
}

