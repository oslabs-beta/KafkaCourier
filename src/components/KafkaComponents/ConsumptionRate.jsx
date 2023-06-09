import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import socketIOclient from "socket.io-client";
import axios from "axios";
Chart.register(...registerables);

export default function ConsumptionRate({ currentTopic, consumerGroup}) {
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState(null);

  // first useEffect will set the socket to the correct server and port 
  // the return function inside is the cleanup function which will run when the component unmounts
  useEffect(() => {
    const newSocket = socketIOclient("http://localhost:3001");
    setSocket(newSocket);
    axios 
      .get(`/api/consumptionRate/?topic=${currentTopic}&consumerGroup=${consumerGroup}`)
      .then()
      .catch((error) => console.log(error));
    // this cleanup function will turn off the connection for the specifc event which is consumption rate
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    // if there is no socket connection return out of the function
    if (!socket) return;
    // socket connection listens to event and adds rate to the data array
    // we want the data array to be limited to 200
    socket.on("consumption rate", (rate) => {
      setData((prevState) => {
        let newData = [...prevState, rate];
        if (newData.length > 200) {
          newData.shift();
        }
        return newData;
      });
    });
  }, [socket]);
    
  return (
    <div id="consumption-rate">
      <Line
        data={{
          labels: data.map((_, i) => i),
          datasets: [
            {
              data: data,
              label: "Consumption Rate",
              borderColor: "#3333ff",
              fill: false,
            },
          ],
        }}
        options={{
          title: {
            display: true,
            text: "Consumption Rate over Time",
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          maintainAspectRatio: false
        }}
      />
    </div>
  );
}
