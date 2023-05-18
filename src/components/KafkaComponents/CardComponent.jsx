import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function CardComponent(props) {
    return (
        // props.groupName
        <Card className = "cardComponent">
            <Typography component="div" variant="h5">
                Chosen Topic
            </Typography>
            <img className='graph' src="https://prometheus.io/assets/grafana_prometheus.png "/>
        </Card>
    )
}
