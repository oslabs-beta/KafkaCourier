import React from "react";

export default function Splash() {
  return (
    <div>
      <h1>Monitor Your Kafka Clusters</h1>
      <section className="demo-section">
        <h2>Demo</h2>
        <p>Here we will add gifs of various features of our application</p>
      </section>

      <section className="tech-stack-section">
        <h2>Tech Stack</h2>
        <p>Our tech stack includes:</p>
        <ul>
          <li>React</li>
          <li>Chart.Js</li>
          <li>Socket.io</li>
          <li>Webpack</li>
          <li>Sass</li>
          <li>Jest</li>
          <li>Typescript</li>
          <li>Node.Js</li>
          <li>Express</li>
          <li>Postgres</li>
          <li>KafkaJs</li>
        </ul>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        {/* Here you can list your team members along with their roles */}
        <div className="team-member">
          <img
            src={profilePic1}
            alt="Tejash Bharadwaj"
            className="profile-photo"
          />
          <h3 className="member-name">John Doe - Lead Developer</h3>
          <div className="member-links">
            <a href="https://github.com" className="button">
              GitHub
            </a>
            <a href="https://linkedin.com" className="button">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="team-member">
          <img
            src={profilePic2}
            alt="Kirsten Milic"
            className="profile-photo"
          />
          <h3 className="member-name">Jane Smith - Software Engineer</h3>
          <div className="member-links">
            <a href="https://github.com" className="button">
              GitHub
            </a>
            <a href="https://linkedin.com" className="button">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="team-member">
          <img
            src={profilePic3}
            alt="Jefferey Huang"
            className="profile-photo"
          />
          <h3 className="member-name">Bob Johnson - UI/UX Designer</h3>
          <div className="member-links">
            <a href="https://github.com" className="button">
              GitHub
            </a>
            <a href="https://linkedin.com" className="button">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="team-member">
          <img
            src={profilePic4}
            alt="Lillyanne Mueller"
            className="profile-photo"
          />
          <h3 className="member-name">Alice Williams - Project Manager</h3>
          <div className="member-links">
            <a href="https://github.com" className="button">
              GitHub
            </a>
            <a href="https://linkedin.com" className="button">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="team-member">
          <img
            src={profilePic4}
            alt="Shimmy Gabbara"
            className="profile-photo"
          />
          <h3 className="member-name">Alice Williams - Project Manager</h3>
          <div className="member-links">
            <a href="https://github.com/alicewilliams" className="button">
              GitHub
            </a>
            <a href="https://linkedin.com" className="button">
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
