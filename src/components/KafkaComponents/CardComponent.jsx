import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import ConsumerInfo from './ConsumerInfo.jsx';
import LineGraph from './LineGraph.jsx';
import CardContent from '@mui/material/CardContent';
import "./CardComponent.css";

export default function CardComponent({ consumerGroup }) {
  return (
      <div className="card-container" sx={{
          color: '#4E6667'
      }}>
        <Typography variant="h5" component="h2"> {consumerGroup} </Typography>
        <Card>
          <CardContent>
            <CardMedia>
          {/* <div className="hero-image-container"> */}   
             <LineGraph consumerGroup={consumerGroup}/>
          {/* </div> */}
          </CardMedia>
          </CardContent>
        </Card>
        <ConsumerInfo />
      </div>
  )
}

      
// useEffect(() => {
  //   setSockets(true);
  //   console.log('data: ', data);
  //   // Set up dimensions
  //   const width = 350;
  //   const height = 300;
  //   const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  //   const graphWidth = width - margin.left - margin.right;
  //   const graphHeight = height - margin.top - margin.bottom;

  //   // Create SVG container
  //   const svg = d3.select(graphRef.current)
  //     .attr('width', width)
  //     .attr('height', height);

  //   svg.selectAll('*').remove();

  //   // Create scales to map data values to visual properties
  //   const xScale = d3.scaleLinear()
  //   //minimum and maximum values of the input domain are 199990 and the maximum x value in the data array plus 10
  //     .domain([164300, d3.max(data, d => d.x+10)])
  //     .range([0, graphWidth]);

  //   const yScale = d3.scaleLinear()
  //     .domain([0, d3.max(data, d => d.y+100)])
  //     .range([graphHeight, 0]);

  //   // Create line generator
  //   const line = d3.line()
  //     .x(d => xScale(d.x))
  //     .y(d => yScale(d.y));

  //   // Create graph container
  //   const graph = svg.append('g')
  //     .attr('transform', `translate(${margin.left}, ${margin.top})`);

  //   // Create line path
  //   graph.append('path')
  //     .datum(data)
  //     .attr('fill', 'none')
  //     .attr('stroke', 'green')
  //     .attr('stroke-width', 10)
  //     .attr('d', line);

  //   // Add x-axis
  //   graph.append('g')
  //     .attr('transform', `translate(0, ${graphHeight})`)
  //     .call(d3.axisBottom(xScale));

  //   // Add y-axis
  //   graph.append('g')
  //     .call(d3.axisLeft(yScale));
  // }, [data]);