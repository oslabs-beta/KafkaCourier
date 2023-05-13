import React from 'react';
import './KafkaComponents.scss'

// row component to render within Topic
function TopicRow(props) {
  return (
    <tr>
        <td>{props.topicName}</td>
        <td>{props.partitions}</td>
        <td>{props.consumerGroups}</td>
    </tr>
  )
}

export default function Topic() {
   
    // api call to get topic data
    
     //function to procedurally display correct amount of rows based on data received from cluster
     /// THIS IS WHERE API DATA WILL GO 
    const topicData = [1, 2, 3];
    const topics = [];
    for (let i = 0; i < topicData.length; i++) {
      topics.push(<TopicRow topicName={'test'} partitions={4} consumerGroups={5} />)
    }
  return (
    <table>
      <thead>
        <tr>
            <th>Topic Name</th>
            <th>Partitions</th>
            <th>Consumer Groups</th>
        </tr>
      </thead>
      <tbody>
        {topics}
      </tbody>
    </table>
  )
}