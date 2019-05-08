import React from 'react';
import DEMO from 'constants/demoData';

const Section = () => (
  <article className="article">
    <h2 className="article-title">Hover Style <div className="badge badge-pill">v1</div></h2>

    <div className="row">
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href={DEMO.link}>
            <div className="img">
              <img src="assets/images-demo/assets/600_400-1.jpg" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-primary" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href={DEMO.link}>
            <div className="img">
              <img src="assets/images-demo/assets/600_400-2.jpg" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-info" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href={DEMO.link}>
            <div className="img">
              <img src="assets/images-demo/assets/600_400-3.jpg" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-dark" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </article>
);
export default Section;
