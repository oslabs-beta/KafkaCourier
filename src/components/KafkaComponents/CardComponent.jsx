// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";
import ConsumerInfo from './ConsumerInfo.jsx';
import "./CardComponent.css";

import { io } from 'socket.io-client';
const socket = io('http://localhost:3001');
socket.on('connect', () => {
  console.log('socket connected');
});

socket.on('group2', obj => {
  console.log('obj1: ', obj);
})

// socket1.emit('event', {
//   a: 100
// });

//LINE GRAPH
const LineGraph = () => {
  const graphRef = useRef(null);

  useEffect(() => {
    // GET DATA
    const data = [
      { x: 0, y: 20 },
      { x: 1, y: 40 },
      { x: 2, y: 10 },
      { x: 3, y: 30 },
      { x: 4, y: 50 },
    ];

    // Set up dimensions
    const width = 350;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select(graphRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([0, graphWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([graphHeight, 0]);

    // Create line generator
    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    // Create graph container
    const graph = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create line path
    graph.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add x-axis
    graph.append('g')
      .attr('transform', `translate(0, ${graphHeight})`)
      .call(d3.axisBottom(xScale));

    // Add y-axis
    graph.append('g')
      .call(d3.axisLeft(yScale));
  }, []);

  return (
    <svg ref={graphRef}></svg>
  );
};

export default function CardComponent(props) {
    return (
        <div className="card-container" sx={{
            color: '#4E6667'
        }}>
            <div className="hero-image-container">
                {/* <iframe src="http://localhost:3001/d-solo/jCCArlU4k/new-dashboard-copy?orgId=1&from=1684436139033&to=1684437039033&panelId=2" height="200"></iframe> */}
                <LineGraph />
            </div>
            <main className="main-content">
                <ConsumerInfo></ConsumerInfo>
            </main>
        </div>
    )
}

      

//BAR CHART 
// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// const BarChart = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const svg = d3.select(chartRef.current);

//     // Define the chart dimensions
//     const width = 400;
//     const height = 300;
//     const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;

//     // Generate random data
//     const data = [
//       { label: 'A', value: Math.random() },
//       { label: 'B', value: Math.random() },
//       { label: 'C', value: Math.random() },
//       { label: 'D', value: Math.random() },
//     ];

//     // Create scales for x and y axes
//     const xScale = d3
//       .scaleBand()
//       .domain(data.map((d) => d.label))
//       .range([0, innerWidth])
//       .padding(0.1);

//     const yScale = d3
//       .scaleLinear()
//       .domain([0, d3.max(data, (d) => d.value)])
//       .range([innerHeight, 0]);

//     // Create the chart
//     svg.attr('width', width).attr('height', height);

//     const chart = svg
//       .append('g')
//       .attr('transform', `translate(${margin.left}, ${margin.top})`);

//     // Render the bars
//     chart
//       .selectAll('rect')
//       .data(data)
//       .enter()
//       .append('rect')
//       .attr('x', (d) => xScale(d.label))
//       .attr('y', (d) => yScale(d.value))
//       .attr('width', xScale.bandwidth())
//       .attr('height', (d) => innerHeight - yScale(d.value))
//       .attr('fill', 'steelblue');
//   }, []);

//   return <svg ref={chartRef}></svg>;
// };


