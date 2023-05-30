import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ConsumptionRate from './ConsumptionRate.jsx';

export default function ConsumptionRateContainer( {currentTopic, consumerGroup}) {
  return (
    <div id="consumption-rate" className="card-container">
      <>
        <h4>Consumption Rate</h4>
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
