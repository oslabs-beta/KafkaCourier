import React from "react";
import Typography from "@mui/material/Typography";
import Gif from "./images/kafka.gif";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const history = useNavigate();
  const handleButtonClick = () => {
    history("/login");
  };
  return (
    <div className="hero">
      <div className="hero-left">
        <Typography variant="h2" className="hero-text">
          Real-Time Kafka Cluster Monitoring
        </Typography>
        <Typography variant="subtitle1" className="hero-text">
          Lightweight, open-source monitoring tool to visualize and monitor key
          Kafka cluster metrics
        </Typography>
        <button className="button" onClick={handleButtonClick}>
          Try it out
        </button>
      </div>
      <div className="hero-right">
        <img
          src={Gif}
          height="200px"
          width="200px"
          alt="animated gif"
          id="kafka-gif"
        ></img>
      </div>
    </div>
  );
}
