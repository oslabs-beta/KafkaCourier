import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ConsumptionRate from './ConsumptionRate.jsx';

export default function ConsumptionRateContainer( {currentTopic, consumerGroup}) {
  return (
    <div className="card-container">
      <>
        <h4>Consumption Rate</h4>
        <ConsumptionRate currentTopic={currentTopic} consumerGroup={consumerGroup}></ConsumptionRate>
      </>
    </div>
  )
}
