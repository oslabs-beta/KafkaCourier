import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { io } from 'socket.io-client';

// Check if domain values are at least 5 minutes apart for 5 x-axis ticks on initial data display
const minDomain = (min, max) => {
  return max.getTime() - min.getTime() >= 5 * 60000;
};

const fourMinutesAgo = dateObj => {
  return new Date(dateObj.getTime() - 4 * 60000);
};

// Create tooltip to display mouseover events
const tooltip = d3.select('body')
  .append('div')
  .style('position', 'fixed')
  .style('z-index', '10')
  .style('visibility', 'hidden')
  .style('background', 'white')
  .style('opacity', 0.8)
  .style('font-family', 'sans-serif')
  .style('font-size', '10px')

// Function to show data point information
const showDataPointInfo = (event, d) => {
  // Get the mouse coordinates
  const mouseX = event.x;
  const mouseY = event.y;

  // Display information in a tooltip or any other element
  tooltip
    .style('left', `${mouseX-50}px`)
    .style('top', `${mouseY-50}px`)
    .style('visibility', 'visible');

  // Display tooltip text
  tooltip.html(() => {
    return `
      <div>
        <span>${`Time: ${d.x}`}</span><br/>
        <span>${`Lag: ${d.y}`}</span>
      </div>
    `;
  });
}

// Function to hide data point information
const hideDataPointInfo = () => {
  tooltip.style('visibility', 'hidden');
}

export default function LineGraph({ consumerGroup }) {
  const graphRef = useRef(null);
  const [data, setData] = useState([]);
  const [chartDimensions, setChartDimensions] = useState({
    width: (window.innerWidth - 40 - 220 - 20 - 20) * 0.6667 - 64,
    height: (0.85 * window.innerHeight - 19.2 - 40 - 64) / 2 - 35,
    margin: { top: 20, right: 20, bottom: 70, left: 40 },
    get graphWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
    get graphHeight() {
      return this.height - this.margin.top - this.margin.bottom;
    }
  });

  // Connect socket and create graph container and unlabeled axes on page load
  useEffect(() => {
    // Connect to websocket server and listen for server data
    const socket = io('http://localhost:3001');
    socket.on(consumerGroup, obj => {
      // store a date object in each data object to be used in d3 line graph
      obj.time = new Date(obj.x);
      setData(prevData => [...prevData, obj]);
    });

    // Set up dimensions
    const { width, height, margin, graphWidth, graphHeight } = chartDimensions;

    // Create SVG container
    const svg = d3.select(graphRef.current)
      .attr('width', '100%')
      .attr('height', '100%');

    // Create scales to map data values to visual properties
    const xScale = d3.scaleTime()
      .domain([0, 100])
      .range([0, graphWidth])

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([graphHeight, 0]);
    
    // Define axes gridlines
    const xGridlines = d3.axisBottom(xScale)
      .tickSize(-graphHeight)
      .tickFormat('')
      .ticks(5);
    
    const yGridlines = d3.axisLeft(yScale)
      .tickSize(-graphWidth)
      .tickFormat('')
      .ticks(5);

    // Create graph container
    const graph = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('id', 'graph');

    // Create a group element for data points
    graph.append('g')
      .attr('class', 'data-points'); 

    // Add x-axis without labels
    graph.append('g')
      .attr('transform', `translate(0, ${graphHeight})`)
      .attr('id', 'x-axis')
      .call(d3.axisBottom(xScale).tickFormat(''));

    // Add y-axis without labels
    graph.append('g')
      .attr('id', 'y-axis')
      .call(d3.axisLeft(yScale).tickFormat(''));
    
    // Hide x-axis tick labels
    graph.selectAll('.tick text')
      .style('visibility', 'hidden');

    // Add gridlines to graph
    graph.append('g')
      .attr('class', 'gridlines')
      .attr('transform', `translate(0, ${graphHeight})`)
      .call(xGridlines)
      .selectAll('line')
      .attr('stroke', '#ccc')
      .attr('stroke-opacity', 0.5);

    graph.append('g')
      .attr('class', 'gridlines')
      .call(yGridlines)
      .selectAll('line')
      .attr('stroke', '#ccc')
      .attr('stroke-opacity', 0.5);

    // Add axes labels
    graph.append('text')
      .attr('class', 'axis-label')
      .attr('x', graphWidth / 2)
      .attr('y', graphHeight + margin.bottom)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Time');

    graph.append('text')
      .attr('class', 'axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -graphHeight / 2)
      .attr('y', -margin.left)
      .attr('dy', '1em')
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Consumer Group Lag');
    
    return () => {
      // Disconnect the Socket.IO socket when the component is unmounted
      socket.disconnect();
    };

  }, []);

  useEffect(() => {
    const { graphWidth, graphHeight } = chartDimensions;

    // Remove line on every update so a new line can be appended
    d3.select(graphRef.current)
      .selectAll('#line').remove();

    // Function to determine x-axis domain if there is not enough data yet
    const domain = () => {
      const [min, max] = d3.extent(data, d => d.time);
      // handle edge case where data is initially empty
      if (min && max) {
        // create a domain with 5 ticks of different time values, rather than 5 ticks of the same time
        return minDomain(min, max) ?
          [min, max] :
          [fourMinutesAgo(max), max]
      }
      else return [0, 0];
    }

    // Create scales to map data values to visual properties
    const xScale = d3.scaleTime()
      .domain(
        data.length <= 50
          ? domain()
          : d3.extent(data, d => d.time)
      )
      .range([0, graphWidth]);

    const yScale = d3.scaleLinear()
      .domain(
        d3.max(data, d => d.y) === 0
          ? [0, 10]
          : [0, Math.max(d3.max(data, d => d.y * 1.1), 10)]
      )
      .range([graphHeight, 0]);

    // Create line generator
    const line = d3.line()
      .defined(d => d.time >= xScale.domain()[0])
      .x(d => xScale(d.time))
      .y(d => yScale(d.y));

    // Select graph container and add line
    const graph = d3.select('#graph');
    graph.append('path')
      .datum(data)
      .attr('id', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1)
      .attr('d', line);

    // Select data point group to display updated data points
    const dataPointGroup = d3.select('.data-points');
    dataPointGroup.exit().remove();
    dataPointGroup.selectAll('circle').remove();
    dataPointGroup.selectAll('circle')
      .data(data.filter(d => d.time >= xScale.domain()[0])) // filter data to only show points within x-axis bounds
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.time))
      .attr('cy', d => yScale(d.y))
      .attr('r', 2)
      .attr('fill', 'steelblue')
      .on('mouseover', showDataPointInfo)
      .on('mouseout', hideDataPointInfo);

    // Update x-axis
    const xAxisElement = d3.select('#x-axis');
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat('%-I:%M %p'))
      .ticks(5);
    xAxisElement.transition()
      .duration(500)
      .call(xAxis);
    
    // Stagger x-axis labels
    xAxisElement.selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-0.8em')
      .attr('dy', '0.15em')
      .attr('transform', 'rotate(-45)'); 

    // Update y-axis
    const yAxisElement = d3.select('#y-axis');
    const yAxis = d3.axisLeft(yScale)
    yAxisElement.transition()
      .duration(500)
      .call(yAxis);

  }, [data]);

  return (
    <svg ref={graphRef}></svg>
  );
}