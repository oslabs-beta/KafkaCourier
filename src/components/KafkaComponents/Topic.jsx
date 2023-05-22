import React, { useState, useEffect } from 'react';
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
// import { makeStyles } from '@mui/styles';


// const useStyles = {
//   tableCellStyles: {
//     color: '#4E6667'
//   }
// }

//  const useStyles = makeStyles(() => ({
//   tableCellStyles: {
//     color: '#4E6667'
//     },
//   }));
// const useStylesFunction = useStyles();
// className={useStyles.tableCellStyles}

// row component to render within Topic
function TopicRow(props) {
  const [topic, setTopic] = useState();
  useEffect(() => {
    // change color of current topic row
    if (topic) {
      const element = document.getElementById(topic);
      element.classList.add('currentTopic');
    }
  });

  return (
    <TableRow onClick={() => setTopic(props.topicName)} topic={topic} id={topic}>
      <TableCell>{props.topicName}</TableCell>
      <TableCell>{props.partitions}</TableCell>
      <TableCell>{props.consumerGroups}</TableCell>
    </TableRow>
  );
}

export default function Topic(props) {
  // set current topic

  // const useStyles = makeStyles(() => ({
  //   tableRowStyles: {
  //     border: '2px solid #F8F2E3 !important',
  //   },
  // }));
  
  const topicData = JSON.parse(props.topicData);
  console.log('topicData', topicData);
  const topics = [];
  for (let i = 0; i < topicData.topics.length; i++) {
    topics.push(
      <TopicRow
        key={i}
        topicName={topicData.topics[i]}
        partitions={topicData.partitions[i]}
        consumerGroups={topicData.consumerGroups[i]}
      />
    );
  }
  return (
    <div className="topic-container">
      <div className="topic-upper-container">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{border: '3px solid #F8F2E3'}}>
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
        <Card className='cardComponent' variant="outlined">CARD HERE</Card>
        <Card className='cardComponent' variant="outlined">CARD HERE</Card> */}
        {/* <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={4}>
              <CardComponent />
            </Grid>
            <Grid item xs={4}>
              <CardComponent />
            </Grid>
            <Grid item xs={4}>
              <CardComponent />
            </Grid>
          </Grid>
        </Box> */}
        <CardComponent />
        {/* <CardComponent />
        <CardComponent />
        <CardComponent /> */}
      </div>
    </div>
  );
}
