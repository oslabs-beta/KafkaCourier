import React from 'react'

export default function Team() {
  return (
    <div>
         <section className="team-section">
        <h2>Our Team</h2>
        {/* Here you can list your team members along with their roles */}
        <div className="team-member">
          <img
            // src={profilePic1}
            alt="Tejash Bharadwaj"
            className="profile-photo"
          />
          <h3 className="member-name">J**</h3>
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
            // src={profilePic2}
            alt="Kirsten Milic"
            className="profile-photo"
          />
          <h3 className="member-name">**</h3>
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
            // src={profilePic3}
            alt="Jeffrey Huang"
            className="profile-photo"
          />
          <h3 className="member-name">**</h3>
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
            // src={profilePic4}
            alt="Lillyanne Mueller"
            className="profile-photo"
          />
          <h3 className="member-name">**</h3>
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
            // src={profilePic4}
            alt="Shimmy Gabbara"
            className="profile-photo"
          />
          <h3 className="member-name">**</h3>
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
  )
}
