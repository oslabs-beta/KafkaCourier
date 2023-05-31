import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

// icons
import TimelineIcon from '@mui/icons-material/Timeline';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function Benefits() {
  // create card components
  const icons = [<TimelineIcon/>, <FeedbackIcon/>,  <CheckBoxIcon/>];
  const titles = [
    "Stay informed with real-time updates",
    "Detect issues immediately",
    "Enhance cluster performance"
  ];

  const subtext = [
    "Access up-to-date data on crucial metrics like consumer lag and consumption rate",
    "Receive immediate alerts when Kafka metrics surpass predetermined thresholds",
    "Pinpoint bottlenecks and optimize resource allocation for improved throughput and latency"
  ]
  const benefitsCards = [];
  for (let i = 0; i < 3; i ++) {
    benefitsCards.push(
      <div className="benefits-card">
          <div className="card-icon">
            {icons[i]}
          </div>
          <div className="card-content">
            <h3 className="card-title">{titles[i]}</h3>
            <p className="card-subtext">{subtext[i]}</p>
         </div>
       </div>
    )
  }
  return (
    <div className="benefits">
      <div className="benefits-card-container">
        {benefitsCards}
      </div>
    </div>
  )
}




