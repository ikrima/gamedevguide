import React from 'react';
import DEMO from 'constants/demoData';

const Section = () => (
  <article className="article">
    <h2 className="article-title">Hover Style <div className="badge badge-pill">v2</div></h2>

    <div className="row">
      <div className="col-xl-4">
        <div className="ih-item square effect3 bottom_to_top">
          <a href={DEMO.link}>
            <div className="img"><img src="assets/images-demo/assets/600_400-1.jpg" alt="img" /></div>
            <div className="info">
              <h3>Heading here</h3>
              <p>Description goes here</p>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item square effect3 bottom_to_top">
          <a href={DEMO.link}>
            <div className="img"><img src="assets/images-demo/assets/600_400-2.jpg" alt="img" /></div>
            <div className="info bg-info">
              <h3>Heading here</h3>
              <p>Description goes here</p>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item square effect3 bottom_to_top">
          <a href={DEMO.link}>
            <div className="img"><img src="assets/images-demo/assets/600_400-3.jpg" alt="img" /></div>
            <div className="info bg-primary">
              <h3>Heading here</h3>
              <p>Description goes here</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-4">
        <div className="ih-item square effect3 top_to_bottom">
          <a href={DEMO.link}>
            <div className="img"><img src="assets/images-demo/assets/600_400-4.jpg" alt="img" /></div>
            <div className="info">
              <h3>Heading here</h3>
              <p>Description goes here</p>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item square effect3 top_to_bottom">
          <a href={DEMO.link}>
            <div className="img"><img src="assets/images-demo/assets/600_400-5.jpg" alt="img" /></div>
            <div className="info bg-info">
              <h3>Heading here</h3>
              <p>Description goes here</p>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item square effect3 top_to_bottom">
          <a href={DEMO.link}>
            <div className="img"><img src="assets/images-demo/assets/600_400-6.jpg" alt="img" /></div>
            <div className="info bg-primary">
              <h3>Heading here</h3>
              <p>Description goes here</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </article>
);

export default Section;
