import React from 'react';
import DEMO from 'constants/demoData';

const projects = DEMO.projects;

const Section = () => {
  return(
    <article className="article">
      <h2 className="article-title">Porfolio Cards <div className="badge badge-pill">v1-1</div></h2>
      <div className="row">
        {
          projects.map((project, i) => (
            <div className="col-xl-4 col-lg-6" key={i.toString()}>
              <a href={DEMO.link} className="portfolio-card-v1 mb-4">
                <div className="portfolio-card__img overlay-top-down overlay-opacity-5">
                  <img src={project.img} alt="cover"/>
                </div>
                <div className="portfolio-card__info">
                  <h4>{project.name}</h4>
                  <span>{project.tag}</span>
                </div>
              </a>
            </div>
          ))
        }
      </div>
    </article>
  );
}

export default Section;
