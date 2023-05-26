import React, { useState } from 'react'
import { List, ListItem, ListItemText } from '@mui/material';

export default function ConsumerGroups({ consumerGroup, setConsumerGroup }) {
  
  // replace with consumer group array from backend
  const res = ['group1', 'group2', 'group3', 'group4'];
  const consumerGroups = [];

  for(let i = 0; i < res.length; i ++){
    consumerGroups.push( 
        <ListItem onClick={() => setConsumerGroup(res[i])}> 
          <ListItemText primary={res[i]} />
        </ListItem> )
  }
  return (
    <div style={{ height: '100px', overflow: 'auto' }}>
      <List component="nav">
        {consumerGroups}
      </List>
    </div>
  )
}
