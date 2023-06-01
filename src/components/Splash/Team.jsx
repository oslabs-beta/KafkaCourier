import React from "react";
import "./teams.scss";
import TejasImage from "./images/tejas.png";
import github from "./images/github-mark.png";
import linkedIn from "./images/linkedin.png";
import lilly from "./images/lilly.png";
import kirsten from "./images/kirsten.png";
import shimmy from "./images/shimmy.png";
import jeff from './images/jeff.png';

export default function Team() {
  return (
    <div className="responsive-container-block container team">
      <h2 className="text-blk team-head-text">Our Team</h2>
      <div className="responsive-container-block">
        <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 team-container">
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
              <a href="https://www.linkedin.com/in/tejash-bharadwaj-b53797278/" target="_blank">
                <img className="socials" src={linkedIn} />
              </a>
            </div>
          </div>
        </div>
        <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 team-container">
          <div className="card">
            <div className="team-image-wrapper">
              <img className="team-member-image" src={kirsten} />
            </div>
            <p className="text-blk name">Kirsten Milic</p>
            <p className="text-blk position">Software Engineer</p>
            <div className="social-icons">
              <a href="https://github.com/klmilic" target="_blank">
                <img className="socials" src={github} />
              </a>
              <a href="https://www.linkedin.com/in/kirsten-milic/" target="_blank">
                <img className="socials" src={linkedIn} />
              </a>
            </div>
          </div>
        </div>
        <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 team-container">
          <div className="card">
            <div className="team-image-wrapper">
              <img
                className="team-member-image"
                // src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert2.png"
                src={jeff}
              />
            </div>
            <p className="text-blk name">Jeffrey Huang</p>
            <p className="text-blk position">Software Engineer</p>
            <div className="social-icons">
              <a href="https://github.com/jeffuh" target="_blank">
                <img className="socials" src={github} />
              </a>
              <a href="https://www.linkedin.com/in/jeffreyehuang/" target="_blank">
                <img className="socials" src={linkedIn} />
              </a>
            </div>
          </div>
        </div>
        <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 team-container">
          <div className="card">
            <div className="team-image-wrapper">
              <img className="team-member-image" src={shimmy} />
            </div>
            <p className="text-blk name">Shimmy Gabbara</p>
            <p className="text-blk position">Software Engineer</p>
            <div className="social-icons">
              <a href="https://github.com/shimmy25/" target="_blank">
                <img className="socials" src={github} />
              </a>
              <a href="https://www.linkedin.com/in/shimmygabbara" target="_blank">
                <img className="socials" src={linkedIn} />
              </a>
            </div>
          </div>
        </div>
        <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 team-container">
          <div className="card">
            <div className="team-image-wrapper">
              <img className="team-member-image" src={lilly} />
            </div>
            <p className="text-blk name">Lily Mueller</p>
            <p className="text-blk position">Software Engineer</p>
            <div className="social-icons">
              <a href="https://github.com/liliannemueller" target="_blank">
                <img className="socials" src={github} />
              </a>
              <a href="https://www.linkedin.com/in/lilianne-orlet-mueller/" target="_blank">
                <img className="socials" src={linkedIn} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
