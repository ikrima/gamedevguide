import React from 'react';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';

const imgLeft = {
  backgroundImage: 'url(assets/images-demo/covers/photo-imNop2O1Rit190cSkxXv_1-7069.jpg)'
};
const imgRight = {
  backgroundImage: 'url(assets/images-demo/covers/photo-1455813870877-04a32045af63.jpg)'
};
const imgLeft2 = {
  backgroundImage: 'url(assets/images-demo/covers/luca-bravo-198062-unsplash.jpg)'
};

const Section1 = () => (
  <div className="feature-callout feature-content-right bg-white">
    <div className="col-12 col-md-6 feature-callout-image-pull" style={imgLeft} />
    <div className="container-fluid container-mw-xl">
      <div className="col-12 col-md-6 offset-md-6">
        <div className="callout-feature-content">
          <h2>Architecto odit fuga facere</h2>
          <div>Culpa eveniet labore cupiditate at maiores dignissimos, nesciunt quam porro accusantium velit quas? Nam nobis, deleniti inventore consequuntur quos vero voluptatum nostrum error porro mollitia, accusantium distinctio nemo expedita ipsum quisquam laboriosam</div>
          <Button type="primary" className="btn-cta">Try it Now</Button>
        </div>
      </div>
    </div>
  </div>
);

const Section2 = () => (
  <div className="feature-callout feature-content-left bg-white">
    <div className="col-12 col-md-6 offset-md-6 feature-callout-image-pull" style={imgRight} />
    <div className="container-fluid container-mw-xl">
      <div className="col-12 col-md-6">
        <div className="callout-feature-content">
          <h2>Commodi molestiae, culpa eveniet</h2>
          <div>Culpa eveniet labore cupiditate at maiores dignissimos, nesciunt quam porro accusantium velit quas? Nam nobis, deleniti inventore consequuntur quos vero voluptatum nostrum error porro mollitia, accusantium distinctio nemo expedita ipsum quisquam laboriosam</div>
          <Button type="primary" className="btn-cta">Try it Now</Button>
        </div>
      </div>
    </div>
  </div>
);

const Section3 = () => (
  <div className="feature-callout feature-content-right bg-white">
    <div className="col-12 col-md-6 feature-callout-image-pull" style={imgLeft2} />
    <div className="container-fluid container-mw-xl">
      <div className="col-12 col-md-6 offset-md-6">
        <div className="callout-feature-content">
          <h2>Culpa distinctio nemo</h2>
          <div>Cupiditate at maiores dignissimos, nesciunt quam porro accusantium velit quas? Nam nobis, deleniti inventore consequuntur quos vero voluptatum nostrum error porro mollitia, accusantium distinctio nemo expedita ipsum quisquam laboriosam.</div>
          <Button type="primary" className="btn-cta">Try it Now</Button>
        </div>
      </div>
    </div>
  </div>
);

const FeatureCallouts = () => (
  <section className="chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Section1 /></div>
      <div key="2"><Section2 /></div>
      <div key="3"><Section3 /></div>
    </QueueAnim>
  </section>
);

export default FeatureCallouts;
