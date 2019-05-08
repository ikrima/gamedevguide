import React from 'react';
import APPCONFIG from 'constants/appConfig';

const Section = () => (
  <section className="hero text-center">
    <h1 className="hero-title">Hi, Welcome to {APPCONFIG.brand}</h1>
    <p className="hero-lead">We’re a small startup, so everyone has a huge impact.</p>
  </section>
)

export default Section;
