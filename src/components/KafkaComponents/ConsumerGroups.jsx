import React, { useState } from 'react'
import { List, ListItem, ListItemText } from '@mui/material';

export default function ConsumerGroups({ topicData, consumerGroup, setConsumerGroup, currentTopic }) {
  
  // replace with consumer group array from backend
 
  const consumerGroups = [];
  //find indexOf current topic in topicData.topics
  //display the same index of ConsumerGroups array


  if (currentTopic) {

    let index = topicData.topics.indexOf(currentTopic)
    if (topicData.consumerGroups[index].length){ 
       for(let i = 0; i < topicData.consumerGroups[index].length; i ++){
        consumerGroups.push( 
          <ListItem onClick={() => setConsumerGroup(topicData.consumerGroups[index])}> 
            <ListItemText primary={topicData.consumerGroups[index][i].groupId} />
          </ListItem> )
      }
    }
  }
  return (
    <div style={{ height: '100px', overflow: 'auto' }}>
      <List component="nav">
        {consumerGroups}
      </List>
    </div>
  )
}
