import React from 'react';
import { Button } from 'antd';
import APPCONFIG from 'constants/appConfig';

const Section = () => (
  <section className="hero text-center">
    <div className="hero-bg-img" style={{backgroundImage: 'url(assets/images-demo/covers/christopher-burns-435998-unsplash.jpg)'}}></div>
    <div className="hero-inner">
      <h1 className="hero-title">Careers at {APPCONFIG.brand}</h1>
      <p className="hero-lead">We’re a small startup, so everyone has a huge impact.</p>
      <div className="hero-cta">
        <Button>View Openings</Button>
      </div>
    </div>
  </section>
)

export default Section;
