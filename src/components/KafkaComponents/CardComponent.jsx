import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from "d3";
import ConsumerInfo from './ConsumerInfo.jsx';
import CardContent from '@mui/material/CardContent';
import "./CardComponent.css";

import { io } from 'socket.io-client';

//LINE GRAPH
const LineGraph = () => {
  const graphRef = useRef(null);
  const [data, setData] = useState([]);
  const [sockets, setSockets] = useState(false);

  if (!sockets) {
    const socket = io('http://localhost:3001');
    socket.on('group2', obj => {
      // console.log('data: ', data);
      // console.log('TYPEX: ', typeof obj.x);
      // console.log('TYPEY: ', typeof obj.y);
      // console.log('updated data: ', [...data, obj]);
      setData(prevData => [...prevData, obj]);
    });
    // setSockets(true);
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


  useEffect(() => {
    setSockets(true);
    // console.log('data: ', data);
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

    // Create scales to map data values to visual properties
    const xScale = d3.scaleLinear()
    //minimum and maximum values of the input domain are 199990 and the maximum x value in the data array plus 10
      .domain([0, 100])
      .range([0, graphWidth])
      // .ticks(5)
      // .render()

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y+100)])
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
      .attr('stroke-width', 10)
      .attr('d', line);

    // Add x-axis
    graph.append('g')
      .attr('transform', `translate(0, ${graphHeight})`)
      .attr('id', 'x-axis')
      .call(d3.axisBottom(xScale));

    // Add y-axis
    graph.append('g')
      .call(d3.axisLeft(yScale))
      .attr('id', 'y-axis');
  }, []);
    


  useEffect(() => {
    const width = 350;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;
    
    const svg = d3.select(graphRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create scales to map data values to visual properties
    const xScale = d3.scaleLinear()
    //minimum and maximum values of the input domain are 199990 and the maximum x value in the data array plus 10
      .domain([d3.max(data, d => d.x-100), d3.max(data, d => d.x+100)])
      .range([0, graphWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y+100)])
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
      .attr('stroke-width', 10)
      .attr('d', line);

    // Add x-axis
    const xAxisElement = d3.select('#x-axis');
    const xAxis = d3.axisBottom(xScale);
    xAxis.ticks(5);
    xAxisElement.transition()
      .duration(500)
      .call(xAxis);

    // Add y-axis
    const yAxisElement = d3.select('#y-axis');
    const yAxis = d3.axisLeft(yScale);
    yAxisElement.transition()
      .duration(500)
      .call(yAxis);
  }, [data]);






  return (
    <svg ref={graphRef}></svg>
  );
  }



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
               <LineGraph />
            {/* </div> */}
            </CardMedia>
            </CardContent>
          </Card>
          <ConsumerInfo></ConsumerInfo>
        </div>
    )
}

      





///UPDATING GRAPH
// function createLineGraph(data) {
//   const margin = { top: 20, right: 20, bottom: 30, left: 50 };
//   const width = 600 - margin.left - margin.right;
//   const height = 400 - margin.top - margin.bottom;

//   // Create SVG container
//   const svg = d3.select("#graph-container")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

//   // Create scales
//   const xScale = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.x)])
//     .range([0, width]);

//   const yScale = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.y)])
//     .range([height, 0]);

//   // Create line generator
//   const line = d3.line()
//     .x(d => xScale(d.x))
//     .y(d => yScale(d.y));

//   // Append the line path
//   svg.append("path")
//     .datum(data)
//     .attr("fill", "none")
//     .attr("stroke", "steelblue")
//     .attr("stroke-width", 2)
//     .attr("d", line);

//   // Add x-axis
//   svg.append("g")
//     .attr("transform", `translate(0,${height})`)
//     .call(d3.axisBottom(xScale));

//   // Add y-axis
//   svg.append("g")
//     .call(d3.axisLeft(yScale));

//   // Function to update the graph with new data
//   function updateGraph(newData) {
//     // Update scales
//     xScale.domain([0, d3.max(newData, d => d.x)]);
//     yScale.domain([0, d3.max(newData, d => d.y)]);

//     // Update the line
//     svg.select("path")
//       .datum(newData)
//       .attr("d", line);

//     // Update the x-axis
//     svg.select(".x-axis")
//       .transition()
//       .call(d3.axisBottom(xScale));

//     // Update the y-axis
//     svg.select(".y-axis")
//       .transition()
//       .call(d3.axisLeft(yScale));
//   }

//   return updateGraph;
// }

// const initialData = [
//   { x: 0, y: 10 },
//   { x: 1, y: 20 },
//   { x: 2, y: 15 },
//   // ...
// ];

// const updateGraph = createLineGraph(initialData);

// // Simulate receiving new data from Kafka and update the graph
// setInterval(() => {
//   const newData = /* fetch new data from Kafka */;
//   updateGraph(newData);
// }, 5000); // Update every 5 seconds
