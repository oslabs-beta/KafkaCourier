// import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
//MUI dependencies 
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';


export default function NavBar(props) {
  //onClick functions must be anon to not be immediately called upon render
  const useStyles = makeStyles(() => ({
    listItemButton: {
      border: '1px solid #F8F2E3 !important',
      backgroundColor: '#F8F2E3' 
    },
  }));
const useStylesFunction = useStyles();

  return (
    <List sx={{
      color:'#F8F2E3',
      // backgroundColor: 'lightgrey'
      border: '2px solid #F8F2E3',
      marginRight: '10px'
    }}>
      <ListItemButton 
      className={useStylesFunction.listItemButton} 
      component={Link} >
        <ListItemText primary="Topics" 
          onClick={() => {
            props.setDisplay('topic');
            props.getKafkaData('topic');
            console.log("Topics clicked!")}
          }/>
        </ListItemButton>
        <ListItemButton 
         className={useStylesFunction.listItemButton}
          component={Link} 
          onClick={() => {props.setDisplay('producer'); 
          console.log("Producers clicked!")}}>
          <ListItemText primary="Producers" />
        </ListItemButton>
      <ListItemButton 
        className={useStylesFunction.listItemButton}
        component={Link} 
        onClick={() => {props.setDisplay('broker'); 
        console.log("Brokers clicked!")}}>
        <ListItemText primary="Brokers" />
        </ListItemButton>
      
      <ListItemButton  
        className={useStylesFunction.listItemButton}
        component={Link} 
        onClick={() => {props.setDisplay('consumer'); 
        console.log("Consumers clicked!")}}>
        <ListItemText primary="Consumers" />
        </ListItemButton>
        <ListItemButton 
          className={useStylesFunction.listItemButton}
          component={Link} 
          onClick={() => {props.setDisplay('Account'); 
          console.log("Accounts clicked!")}}>
          <ListItemText primary="Accounts" />
        </ListItemButton>
    </List>
  )
}


// component={Link} to="props.setDisplay('producer')"

/* <Link to="/home/producer">
        <button onClick={() => props.setDisplay('producer')}>Producer</button>
      </Link>
      <Link to="/home/broker">
        <button onClick={() => props.setDisplay('broker')}>Broker</button>
      </Link>
      <Link to="/home/topic">
        <button
          onClick={() => {
            props.setDisplay('topic');
            props.getKafkaData('topic');
          }}
        >
          Topic
        </button>
      </Link>
      <Link to="/home/consumer">
        <button onClick={() => props.setDisplay('consumer')}>Consumer</button>
      </Link> */
