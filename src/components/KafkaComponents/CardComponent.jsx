// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import React from 'react';
import ConsumerInfo from './ConsumerInfo.jsx';
import "./CardComponent.css"

export default function CardComponent(props) {
    return (
        <div className="card-container" sx={{
            color: '#4E6667'
        }}>
            <div className="hero-image-container">
                <iframe src="http://localhost:3001/d-solo/jCCArlU4k/new-dashboard-copy?orgId=1&from=1684436139033&to=1684437039033&panelId=2" height="200"></iframe>
            </div>
            <main className="main-content">
                <ConsumerInfo></ConsumerInfo>
            </main>
        </div>
    )
}

      