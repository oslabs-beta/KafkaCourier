import React from 'react'
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
        <Typography variant="h2" className="hero-text">
            Real-Time Kafka Cluster Monitoring
        </Typography>
        <Typography variant="subtitle1" className="hero-text">
        Lightweight, open-source monitoring tool to visualize and monitor key Kafka cluster metrics
        </Typography>
        <button className="button">Try it out</button>
      </div>
      <div className="hero-right">
        <div className='hero-gif'>a gif will go here</div>
      </div>
    </div>
  )
}
