import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';
import LineGraph from './LineGraph.jsx';
import CardContent from '@mui/material/CardContent';

export default function CardComponent({ consumerGroup }) {
  console.log('consumer group current : ', consumerGroup);
  // conditionally render line graph if a consumer group is clicked
  let components;
  if(consumerGroup){
     components =       
     <>
     <h4>Consumer Lag</h4>
      <Card>
        <CardContent>
          <CardMedia id='linegraph-container'>
            <LineGraph consumerGroup={consumerGroup}/>
          </CardMedia>
        </CardContent>
      </Card>
    </>  
  } 

  return (
      <div className="card-container">
        {components}
      </div>
  )
}