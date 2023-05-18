import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardComponent from './CardComponent.jsx'
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
    <>
      <div className="topic-upper-container">
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
      </div>
      <div className="topic-lower-container">
        {/* mui grid component */}
        {/* <Card className='cardComponent' variant="outlined">CARD HERE</Card>
        <Card className='cardComponent' variant="outlined">CARD HERE</Card>
        <Card className='cardComponent' variant="outlined">CARD HERE</Card> */}
        <Box sx={{ width: '100%' }}>
          {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
            <Grid item xs={4}>
              {/* <Card className='cardComponent' variant="outlined">CARD HERE</Card> */}
              <CardComponent />
            </Grid>
            <Grid item xs={4}>
              {/* <Card className='cardComponent' variant="outlined">CARD HERE</Card> */}
              <CardComponent />
            </Grid>
            <Grid item xs={4}>
              {/* <Card className='cardComponent' variant="outlined">CARD HERE</Card> */}
              <CardComponent />
            </Grid>
          {/* </Grid> */}
        </Box>
      </div>
    </>
  );
}
