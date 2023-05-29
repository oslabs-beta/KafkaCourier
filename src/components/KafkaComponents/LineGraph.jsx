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
    margin: { top: 20, right: 20, bottom: 30, left: 40 },
    get graphWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
    get graphHeight() {
      return this.height - this.margin.top - this.margin.bottom;
    }
  });

  // Check if domain values are at least 5 minutes apart for initial data display
  const timeStringToDate = timeString => {
    // Parse the time string
    const [time, period] = timeString.split(' ');
    const [hours, minutes, seconds] = time.split(':').map(Number);

    // Get the current date
    const currentDate = new Date();

    // Set the hours, minutes, and seconds of the current date
    currentDate.setHours(period === 'PM' ? hours + 12 : hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(seconds);

    return currentDate;
  };

  const minDomain = (min, max) => {
    // return true or false
    return timeStringToDate(max).getMinutes() - timeStringToDate(min).getMinutes() >= 5;
  };

  const fiveMinutesAgo = timeString => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes, seconds] = time.split(':').map(Number);

    const newDate = new Date();

    // Set the hours, minutes, and seconds of the current date
    newDate.setHours(period === 'PM' ? hours + 12 : hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(seconds);

    // Subtract 5 minutes
    newDate.setMinutes(newDate.getMinutes() - 5);

    // Format the resulting time as a string
    const formattedTime = newDate.toLocaleTimeString([], { hour12: true });

    return formattedTime;
  };

  // Connect to websocket server and create chart only once
  if (!sockets) {
    const socket = io('http://localhost:3001');
    socket.on('group2', obj => {
      obj.time = obj.x;
      setData(prevData => [...prevData, obj]);
    });
    setSockets(true);
  }

  // Create graph container and unlabeled axes on page load
  useEffect(() => {
    // Set up dimensions
    const { width, height, margin, graphWidth, graphHeight } = chartDimensions;

    // Create SVG container
    const svg = d3.select(graphRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create scales to map data values to visual properties
    const xScale = d3.scaleTime()
    //minimum and maximum values of the input domain are 199990 and the maximum x value in the data array plus 10
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

    // Add x-axis without labels
    graph.append('g')
      .attr('transform', `translate(0, ${graphHeight})`)
      .attr('id', 'x-axis')
      .call(d3.axisBottom(xScale).tickFormat(''));

    // Add y-axis without labels
    graph.append('g')
      .attr('id', 'y-axis')
      .call(d3.axisLeft(yScale).tickFormat(''));

    // Add gridlines to graph
    graph.append("g")
      .attr("class", "gridlines")
      .attr("transform", `translate(0, ${graphHeight})`)
      .call(xGridlines)
      .selectAll("line")
      .attr("stroke", "#ccc")
      .attr("stroke-opacity", 0.5);

    graph.append("g")
      .attr("class", "gridlines")
      .call(yGridlines)
      .selectAll("line")
      .attr("stroke", "#ccc")
      .attr("stroke-opacity", 0.5);

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

  }, []);

  useEffect(() => {
    const { graphWidth, graphHeight } = chartDimensions;

    // Remove line on every update so a new line can be appended
    d3.select(graphRef.current)
      .selectAll('#line').remove();

    // Parse time strings into Date objects
    const parseTime = d3.timeParse('%I:%M:%S %p');
    data.forEach(d => {
      d.x = parseTime(d.time);
    });




    /* NO LINE ERROR HAS TO DO WITH WRONG DATES
    D3.EXTENT USING DATA FROM SERVER WITH YEAR 1900
    DOMAINARR USING CURRENT DATES WITH YEAR 2023
    */

    console.log('data: ', data);

    const myDomain = () => {
      const [minDate, maxDate] = d3.extent(data, d => d.x);
      if (minDate && maxDate) {
        const [min, max] = [minDate.toLocaleTimeString(), maxDate.toLocaleTimeString()]
        if (minDomain(min, max)) {
          return [timeStringToDate(min), timeStringToDate(max)];
        }
        else {
          return [timeStringToDate(fiveMinutesAgo(min)), timeStringToDate(max)];
        }
      }
      else return [0, 0];
    }

    const domainArr = myDomain();
    console.log('domainArr: ', domainArr);
    console.log('d3.extent: ', d3.extent(data, d => d.x));





    // Create scales to map data values to visual properties
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.x))
      // .domain(domainArr)
      .range([0, graphWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y+100)])
      .range([graphHeight, 0]);

    // Create line generator
    const line = d3.line()
    // .defined(d => d.x > xScale.domain()[0])
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

    // Select graph container and add line
    const graph = d3.select('#graph');
    graph.append('path')
      .datum(data)
      .attr('id', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 1)
      .attr('d', line);

    // Update x-axis
    const xAxisElement = d3.select('#x-axis');
    const xAxis = d3.axisBottom(xScale)
      // change tickValues argument to be an array from 5 minutes to current time
      // .tickValues(xScale.ticks(5))
      .tickFormat(d3.timeFormat('%-I:%M %p'));
    xAxis.ticks(5);
    xAxisElement.transition()
      .duration(500)
      .call(xAxis);

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