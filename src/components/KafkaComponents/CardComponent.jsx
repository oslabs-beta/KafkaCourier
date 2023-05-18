import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import ConsumerInfo from './ConsumerInfo.jsx';

export default function CardComponent(){
    return (
        <Card class = "cardComponent">
            <Typography component="div" variant="h5">
                Chosen Topic
            </Typography>
            <iframe src="http://localhost:3001/d-solo/jCCArlU4k/new-dashboard-copy?orgId=1&from=1684436139033&to=1684437039033&panelId=2" height="200"></iframe>
            {/* <img className='graph' src="https://prometheus.io/assets/grafana_prometheus.png "/> */}
            <ConsumerInfo></ConsumerInfo>
        </Card>
    )
}
