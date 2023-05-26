import React, { useState, useRef, useEffect } from 'react';
import * as d3 from "d3";
import { io } from 'socket.io-client';


//LINE GRAPH
export default function LineGraph() {
  const graphRef = useRef(null);
  const [data, setData] = useState([]);
  const [sockets, setSockets] = useState(false);
  const [chartDimensions, setChartDimensions] = useState({
    width: 350,
    height: 300,
    margin: { top: 20, right: 20, bottom: 30, left: 50 },
    get graphWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
    get graphHeight() {
      return this.height - this.margin.top - this.margin.bottom;
    }
  });

  // Connect to websocket server and create chart only once
  if (!sockets) {
    const socket = io('http://localhost:3001');
    socket.on('group2', obj => {
      console.log('obj: ', obj);
      console.log('data: ', data);
      console.log('TYPEX: ', typeof obj.x);
      console.log('TYPEY: ', typeof obj.y);
      console.log('updated data: ', [...data, obj]);
      setData(prevData => [...prevData, obj]);
    });

    // Create chart
    // Set up dimensions
    // const width = 350;
    // const height = 300;
    // const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    // const graphWidth = width - margin.left - margin.right;
    // const graphHeight = height - margin.top - margin.bottom;
    const { width, height, margin, graphWidth, graphHeight } = chartDimensions;

    // Create SVG container
    const svg = d3.select(graphRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create scales to map data values to visual properties
    const xScale = d3.scaleLinear()
    //minimum and maximum values of the input domain are 199990 and the maximum x value in the data array plus 10
      .domain([0, 100])
      .range([0, graphWidth])

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
      .attr('d', line)
      .attr('id', 'line');

    // Add x-axis
    const xAxis = d3.axisBottom(xScale);
    graph.append('g')
      .attr('transform', `translate(0, ${graphHeight})`)
      .attr('id', 'x-axis')
      .call(xAxis);

    // Add y-axis
    const yAxis = d3.axisLeft(yScale);
    graph.append('g')
      .attr('id', 'y-axis')
      .call(yAxis);

    setSockets(true);
  }

  useEffect(() => {
    const { graphWidth, graphHeight } = chartDimensions;
    // const width = 350;
    // const height = 300;
    // const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    // const graphWidth = width - margin.left - margin.right;
    // const graphHeight = height - margin.top - margin.bottom;
    
    // const svg = d3.select(graphRef.current)
    //   .attr('width', width)
    //   .attr('height', height);

    // Create scales to map data values to visual properties
    const xScale = d3.scaleLinear()
      .domain([d3.max(data, d => d.x-100), d3.max(data, d => d.x+100)])
      .range([0, graphWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y+100)])
      .range([graphHeight, 0]);

    // Create line generator
    const lineGenerator = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

    // Update line data
    const line = d3.select('#line');
    line.attr('d', lineGenerator(data))

    // Update x-axis
    const xAxisElement = d3.select('#x-axis');
    const xAxis = d3.axisBottom(xScale);
    xAxis.ticks(5);
    xAxisElement.transition()
      .duration(500)
      .call(xAxis);

    // Update y-axis
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

  //   // Create scales to map data values to visual properties
  //   const xScale = d3.scaleLinear()
  //   //minimum and maximum values of the input domain are 199990 and the maximum x value in the data array plus 10
  //     .domain([0, 100])
  //     .range([0, graphWidth])
  //     // .ticks(5)
  //     // .render()

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
  //     .attr('id', 'x-axis')
  //     .call(d3.axisBottom(xScale));

  //   // Add y-axis
  //   graph.append('g')
  //     .call(d3.axisLeft(yScale))
  //     .attr('id', 'y-axis');
  // }, []);