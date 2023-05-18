import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';

export default function CardComponent(){
    return (
        <Card class = "cardComponent">
            <CardMedia src="http://localhost:3000/d-solo/fhX5408Zk/confluent-cloud?orgId=1&refresh=5s&var-cluster=All&var-topic=All&panelId=53" />
            {/* THIS IS A CARD */}
        </Card>
    )
}
