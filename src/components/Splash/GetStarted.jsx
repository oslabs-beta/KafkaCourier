import React from 'react';
import { useNavigate } from "react-router-dom";
import githubSC from './images/githubGET.png';
import dashboard from './images/dashboard.png';
import './GetStarted.scss';

export default function GetStarted() {
  const navigate = useNavigate();
  return (
    <div className='get-started-container'>
      <h2>Get Started</h2>
      <div className='get-started'>
        <div>
          <img src={dashboard} />
          <button className="button" onClick={() => navigate('login')}>
            Try it out
          </button>
        </div>
        <div>
          <img src={githubSC} />
          <button className="button github-button">
            <a href="https://github.com/oslabs-beta/KafkaCourier" target="_blank">View on GitHub</a>
          </button>
        </div>
      </div>
    </div>
  )
}