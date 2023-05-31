import React from 'react';
import './GetStarted.scss';
import githubSC from './images/githubGET.png'

export default function GetStarted() {
  return (
    <div className='get-started-container'>
      <h2>Get Started</h2>
      <div className='get-started'>
        <div>
          <img />
          <button className="button">Try it out</button>
        </div>
        <div>
          <img src={githubSC} />
          <button className="button github-button">View on GitHub</button>
        </div>
      </div>
    </div>
  )
}