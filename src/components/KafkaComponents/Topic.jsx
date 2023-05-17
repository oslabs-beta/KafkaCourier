import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './KafkaComponents.scss';

// row component to render within Topic
function TopicRow(props) {
  return (
    <TableRow>
      <TableCell>{props.topicName}</TableCell>
      <TableCell>{props.partitions}</TableCell>
      <TableCell>{props.consumerGroups}</TableCell>
    </TableRow>
  );
}

export default function Topic(props) {
  const topicData = JSON.parse(props.topicData);
  console.log('topicData', topicData);
  const topics = [];
  for (let i = 0; i < topicData.topics.length; i++) {
    topics.push(
      <TopicRow
        topicName={topicData.topics[i]}
        partitions={topicData.partitions[i]}
        consumerGroups={topicData.consumerGroups[i]}
      />
    );
  }
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Topic Name</TableCell>
            <TableCell>Partitions</TableCell>
            <TableCell>Consumer Groups</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{topics}</TableBody>
      </Table>
    </TableContainer>
  );
}
