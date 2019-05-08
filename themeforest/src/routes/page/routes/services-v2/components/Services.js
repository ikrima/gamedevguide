import React from 'react';
import { Button } from 'antd';


const Section1 = () => (
  <div className="feature-callout feature-content-right bg-white">
    <div className="col-12 col-md-6 feature-callout-image-pull" style={{backgroundImage: 'url(assets/images-demo/covers/corinne-kutz-211251-unsplash.jpg)'}} />
    <div className="container-fluid container-mw-xl">
      <div className="col-12 col-md-6 offset-md-6">
        <div className="callout-feature-content">
          <h2>Web Development</h2>
          <div>Culpa eveniet labore cupiditate at maiores dignissimos, nesciunt quam porro accusantium velit quas? Nam nobis, deleniti inventore consequuntur quos vero voluptatum nostrum error porro mollitia, accusantium distinctio nemo expedita ipsum quisquam laboriosam</div>
          <Button type="primary" className="btn-cta">Learn More</Button>
        </div>
      </div>
    </div>
  </div>
);

const Section2 = () => (
  <div className="feature-callout feature-content-left bg-white">
    <div className="col-12 col-md-6 offset-md-6 feature-callout-image-pull" style={{backgroundImage: 'url(assets/images-demo/covers/christopher-burns-435998-unsplash.jpg)'}} />
    <div className="container-fluid container-mw-xl">
      <div className="col-12 col-md-6">
        <div className="callout-feature-content">
          <h2>Web Design</h2>
          <div>Culpa eveniet labore cupiditate at maiores dignissimos, nesciunt quam porro accusantium velit quas? Nam nobis, deleniti inventore consequuntur quos vero voluptatum nostrum error porro mollitia, accusantium distinctio nemo expedita ipsum quisquam laboriosam</div>
          <Button type="primary" className="btn-cta">Learn More</Button>
        </div>
      </div>
    </div>
  </div>
);

const Section3 = () => (
  <div className="feature-callout feature-content-right bg-white">
    <div className="col-12 col-md-6 feature-callout-image-pull" style={{backgroundImage: 'url(assets/images-demo/covers/alesia-kazantceva-283291-unsplash.jpg)'}} />
    <div className="container-fluid container-mw-xl">
      <div className="col-12 col-md-6 offset-md-6">
        <div className="callout-feature-content">
          <h2>Mobile App</h2>
          <div>Cupiditate at maiores dignissimos, nesciunt quam porro accusantium velit quas? Nam nobis, deleniti inventore consequuntur quos vero voluptatum nostrum error porro mollitia, accusantium distinctio nemo expedita ipsum quisquam laboriosam.</div>
          <Button type="primary" className="btn-cta">Learn More</Button>
        </div>
      </div>
    </div>
  </div>
);

const FeatureCallouts = () => (
  <section className="chapter">
    <Section1 />
    <Section2 />
    <Section3 />
  </section>
);

export default FeatureCallouts;
