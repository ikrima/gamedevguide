import React from 'react';
import DEMO from 'constants/demoData';

const profiles = DEMO.profiles;

const Section = () => {
  return(
    <article className="article">
      <h2 className="article-title">Profile Cards <span className="badge badge-pill">v1</span></h2>
      <div className="row">
        {
          profiles.map((profile, i) => {
            if (i < 4) {
              return (
                <div className="col-lg-3 mb-4" key={i}>
                  <article className="profile-card-v1 h-100">
                    <img src={profile.avatar} alt="avatar"/>
                    <h4>{profile.name}</h4>
                    <span>{profile.title}</span>
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
