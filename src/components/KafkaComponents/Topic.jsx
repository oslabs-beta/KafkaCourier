import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CardComponent from './CardComponent.jsx';
import ConsumerGroups from './ConsumerGroups.jsx';
import ConsumptionRateContainer from './ConsumptionRateContainer.jsx';
import ConsumerInfo from './ConsumerInfo.jsx';
import './KafkaComponents.scss';

// row component to render within Topic
function TopicRow({ topicName, partitions, consumerGroups, setCurrentTopic, currentTopic }) {

  const handleClick = () => {
    setCurrentTopic(topicName);
    // change color of current topic row
    const rows = document.querySelectorAll('#topics .table-row');
    rows.forEach(row => {
      row.classList.remove('selected-row');
    });
    // Add selected-row class to the clicked row
    // row.classList.add('selected-row');
  }

  const isSelected = currentTopic === topicName;

  return (
    <TableRow onClick={handleClick} className={`table-row ${isSelected ? 'selected-row' : ''}`}>
      <TableCell>{topicName}</TableCell>
      <TableCell>{partitions}</TableCell>
      <TableCell>{consumerGroups.length}</TableCell>
    </TableRow>
  );
}

export default function Topic({ topicData, currentTopic, setCurrentTopic }) {
  const [consumerGroup, setConsumerGroup] = useState();

  const parsedData = JSON.parse(topicData);

  // populate topics table
  const topics = [];
  for (let i = 0; i < parsedData.topics.length; i++) {
    topics.push(
      <TopicRow
        key={i}
        topicName={parsedData.topics[i]}
        partitions={parsedData.partitions[i]}
        consumerGroups={parsedData.consumerGroups[i]}
        setCurrentTopic={setCurrentTopic}
        currentTopic={currentTopic}
        className="table-row"
      />
    );
  }

  // conditionally populate lower portion of topics page
  let lowerComponents = [
    <ConsumerGroups 
      consumerGroup={consumerGroup} setConsumerGroup={setConsumerGroup} topicData={parsedData} currentTopic={currentTopic}>
    </ConsumerGroups>
  ];
  // if a topic is selected, show corresponding consumer groups
  // if (currentTopic) {
  //   lowerComponents.push(
  //     <ConsumerGroups 
  //       setConsumerGroup={setConsumerGroup} topicData={parsedData} currentTopic={currentTopic}>
  //     </ConsumerGroups>)
  // }
  // if a consumer group is selected, show corresponding charts
  if (currentTopic && consumerGroup) {
    lowerComponents.push( 
        <CardComponent 
          consumerGroup={consumerGroup} topicData={topicData}>
        </CardComponent>,
        <ConsumptionRateContainer currentTopic={currentTopic} consumerGroup={consumerGroup}></ConsumptionRateContainer>,
        <ConsumerInfo></ConsumerInfo>,
    )
  }

  return (
    <div className="topic-container">
      <div className="topic-upper-container" id="topics">
        <h3>Topics</h3>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{border: '3px solid #F8F2E3'}}>
                <TableCell>Name</TableCell>
                <TableCell># of Partitions</TableCell>
                <TableCell># of Consumer Groups</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{topics}</TableBody>
          </Table>
        </TableContainer>
      </div>
      <div id="topic-lower-container">

        {lowerComponents}
        {/* <ConsumerGroups consumerGroup={consumerGroup} setConsumerGroup={setConsumerGroup} topicData={parsedData} currentTopic={currentTopic}></ConsumerGroups>
        <CardComponent consumerGroup={consumerGroup} topicData={topicData}/> */}
        {/* <ConsumptionRate consumerGroup={consumerGroup} currentTopic={currentTopic} /> */}
        {/* <CardComponent />
        <CardComponent />
        <CardComponent /> */}
      </div>
    </div>
  );
}
