import React from 'react';
import DEMO from 'constants/demoData';
import { Icon } from 'antd';

const profiles = DEMO.profiles;

const Section = () => {
  return(
    <article className="article">
      <h2 className="article-title">Profile Cards <span className="badge badge-pill">v2</span></h2>
      <div className="row">
        {
          profiles.map((profile, i) => {
            if (i < 3) {
              return (
                <div className="col-lg-4 mb-4" key={i}>
                  <article className="profile-card-v2 h-100">
                    <img src={profile.avatar} alt="avatar"/>
                    <h4>{profile.name}</h4>
                    <span>{profile.title}</span>
                    <p>{profile.desc}</p>
                    <div>
                      <a href={DEMO.link} className="icon-btn icon-btn-round mx-1 icon-btn-sm btn-social"><Icon type="twitter" /></a>
                      <a href={DEMO.link} className="icon-btn icon-btn-round mx-1 icon-btn-sm btn-social"><Icon type="facebook" theme="filled" /></a>
                      <a href={DEMO.link} className="icon-btn icon-btn-round mx-1 icon-btn-sm btn-social"><Icon type="instagram" /></a>
                    </div>
                  </article>
                </div>
              )
            }
            return (null);
          })
        }
      </div>
    </article>
  );
}

export default Section;
