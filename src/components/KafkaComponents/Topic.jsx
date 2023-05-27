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
import CardComponent from './CardComponent.jsx';
import ConsumerGroups from './ConsumerGroups.jsx';


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
function TopicRow({ topicName, partitions, consumerGroups, setCurrentTopic }) {
  

  useEffect(() => {
    // change color of current topic row
    // if (topic) {
    //   const element = document.getElementById(topic);
    //   element.classList.add('currentTopic');
    // }
  });

  return (
    <TableRow onClick={() => setCurrentTopic(topicName)}>
      <TableCell>{topicName}</TableCell>
      <TableCell>{partitions}</TableCell>
      <TableCell>{consumerGroups.length}</TableCell>
    </TableRow>
  );
}

export default function Topic({ topicData, currentTopic, setCurrentTopic }) {
  const [consumerGroup, setConsumerGroup] = useState();

  // const useStyles = makeStyles(() => ({
  //   tableRowStyles: {
  //     border: '2px solid #F8F2E3 !important',
  //   },
  // }));
  
  console.log('topicData', topicData);
  console.log('current topic', currentTopic);
  const parsedData = JSON.parse(topicData);
  console.log('parsedData', parsedData);
  const topics = [];
  for (let i = 0; i < parsedData.topics.length; i++) {
    topics.push(
      <TopicRow
        key={i}
        topicName={parsedData.topics[i]}
        partitions={parsedData.partitions[i]}
        consumerGroups={parsedData.consumerGroups[i]}
        setCurrentTopic={setCurrentTopic}
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
        <ConsumerGroups consumerGroup={consumerGroup} setConsumerGroup={setConsumerGroup} topicData={parsedData} currentTopic={currentTopic}></ConsumerGroups>
        <CardComponent consumerGroup={consumerGroup} topicData={topicData}/>
        {/* <CardComponent />
        <CardComponent />
        <CardComponent /> */}
      </div>
    </div>
  );
}
