import React from 'react';
import { Button } from 'antd';

const Section = () => (
  <div>
    <div className="container-fluid container-mw-xxl">
      <article className="article mb-0">
        <h2 className="article-title">Centered</h2>
      </article>
    </div>

    <section className="cta hero hero-loose text-center">
      <div className="container">
        <div className="col-md-8 mx-auto">
          <h1 className="hero-title">Services We Provide</h1>
          <p className="hero-lead">Whether you're experiencing a creative block or need assistance in creating a brand for your new business, we're at your service.</p>
          <div className="cta-btn">
            <Button type="primary" className="btn-cta">Subscribe</Button>
          </div>
          <div className="cta-muted mt-2">No spam! We promise, only the best stuff.</div>
        </div>
      </div>
    </section>
  </div>
);

export default Section;
