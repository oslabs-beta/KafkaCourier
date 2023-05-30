import React, { useState } from 'react'
import './KafkaComponents.scss';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

export default function ConsumerGroups({ topicData, consumerGroup, setConsumerGroup, currentTopic }) {

  const consumerGroups = [];
  // prompt user to select a topic if no topic is currently selected
  if (!currentTopic) {
    consumerGroups.push(<i>Select a topic above to view consumer group data.</i>);
  }

  // else (if current topic is selected)
  else {
    let index = topicData.topics.indexOf(currentTopic)
    if (topicData.consumerGroups[index].length){ 
       for(let i = 0; i < topicData.consumerGroups[index].length; i ++){
        consumerGroups.push( 
          <TableRow onClick={() => setConsumerGroup(topicData.consumerGroups[index][i].groupId)}> 
            <TableCell>{topicData.consumerGroups[index][i].groupId}</TableCell>
          </TableRow> )
      }
      return(
        <div id="consumer-groups">
        <h4>Consumer Groups</h4>
          <TableContainer>
          <Table>
            <TableBody>
              {consumerGroups}
            </TableBody>
          </Table>
          </TableContainer>
        </div>
      )
    }
    // if no consumer groups for chosen topic, indicate this to user
    else {
      consumerGroups.push(<i>No consumer groups to show for selected topic.</i>)
    }
  }
  return (
    <div id="consumer-groups">
      <h4>Consumer Groups</h4>
      <div id="consumer-group-placeholder">
        {consumerGroups}
      </div>
    </div>
  )
}
