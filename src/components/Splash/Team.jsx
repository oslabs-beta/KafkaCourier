import React from "react";
import "./teams.scss";
import TejasImage from "./images/tejas.png";
import github from "./images/github-mark.png";
import linkedIn from "./images/linkedin.png";

export default function Team() {
  return (
    <div className="responsive-container-block container">
      <p className="text-blk team-head-text">Our Team</p>
      <div className="responsive-container-block">
        <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
          <div className="card">
            <div className="team-image-wrapper">
              <img className="team-member-image" src={TejasImage} />
            </div>
            <p className="text-blk name">Tejash Bharadwaj</p>
            <p className="text-blk position">Software Engineer</p>
            <div className="social-icons">
              <a href="https://github.com/tejasbbb" target="_blank">
                <img className="socials" src={github} />
              </a>
              <a href="https://www.facebook.com" target="_blank">
                <img className="socials" src={linkedIn} />
              </a>
            </div>
          </div>
        </div>
        <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
          <div className="card">
            <div className="team-image-wrapper">
              <img
                className="team-member-image"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert2.png"
              />
            </div>
            <p className="text-blk name">Kirsten Milic</p>
            <p className="text-blk position">Software Engineer</p>
            <div className="social-icons">
              <a href="https://www.twitter.com" target="_blank">
                <img className="socials" src={github} />
              </a>
              <a href="https://www.facebook.com" target="_blank">
                <img className="socials" src={linkedIn} />
              </a>
            </div>
          </div>
        </div>
        <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
          <div className="card">
            <div className="team-image-wrapper">
              <img
                className="team-member-image"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert2.png"
              />
            </div>
            <p className="text-blk name">Jeffrey Huang</p>
            <p className="text-blk position">Software Engineer</p>
            <div className="social-icons">
              <a href="https://www.twitter.com" target="_blank">
                <img className="socials" src={github} />
              </a>
              <a href="https://www.facebook.com" target="_blank">
                <img className="socials" src={linkedIn} />
              </a>
            </div>
          </div>
        </div>
        <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
          <div className="card">
            <div className="team-image-wrapper">
              <img
                className="team-member-image"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert2.png"
              />
            </div>
            <p className="text-blk name">Shimmy Gabbara</p>
            <p className="text-blk position">Software Engineer</p>
            <div className="social-icons">
              <a href="https://www.twitter.com" target="_blank">
                <img className="socials" src={github} />
              </a>
              <a href="https://www.facebook.com" target="_blank">
                <img className="socials" src={linkedIn} />
              </a>
            </div>
          </div>
        </div>
        <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
          <div className="card">
            <div className="team-image-wrapper">
              <img
                className="team-member-image"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert2.png"
              />
            </div>
            <p className="text-blk name">Lily Mueller</p>
            <p className="text-blk position">Software Engineer</p>
            <div className="social-icons">
              <a href="https://www.twitter.com" target="_blank">
                <img className="socials" src={github} />
              </a>
              <a href="https://www.facebook.com" target="_blank">
                <img className="socials" src={linkedIn} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
