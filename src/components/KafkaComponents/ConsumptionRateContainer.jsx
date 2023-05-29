import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ConsumptionRate from './ConsumptionRate.jsx';
import "./CardComponent.css";

export default function ConsumptionRateContainer( {currentTopic, consumerGroup}) {
  return (
    <div id="consumption-rate" className="card-container">
      <>
        <Typography variant="h5" component="h2"> {consumerGroup} </Typography>
        <Card>
        <CardContent>
            <CardMedia>
            <ConsumptionRate currentTopic={currentTopic} consumerGroup={consumerGroup}></ConsumptionRate>
            </CardMedia>
        </CardContent>
        </Card>
      </>
    </div>
  )
}
