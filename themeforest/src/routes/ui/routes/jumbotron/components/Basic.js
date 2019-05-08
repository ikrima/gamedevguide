import React from 'react';
import { Button } from 'antd';
import APPCONFIG from 'constants/appConfig';

const Section = () => (
  <article className="article">
    <h2 className="article-title">Basic</h2>
    <section className="hero text-center">
      <h1 className="hero-title">Careers at {APPCONFIG.brand}</h1>
      <p className="hero-lead">We’re a small startup, so everyone has a huge impact.</p>
      <div className="hero-cta">
        <Button>View Openings</Button>
      </div>
    </section>

    <div className="divider divider-dashed my-6"></div>

    <section className="hero hero-loose text-center">
      <div className="container">
        <div className="col-md-8 mx-auto">
          <h1 className="hero-title">Services We Provide</h1>
          <p className="hero-lead">Whether you're experiencing a creative block or need assistance in creating a brand for your new business, we're at your service.</p>
        </div>
      </div>
    </section>
  </article>
)

export default Section;
