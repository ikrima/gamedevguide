import React from 'react';
import { Button } from 'antd'; 

const Section = () => (
  <article className="article">
    <h2 className="article-title">Jumbotron / Hero</h2>
    <div className="jumbotron">
      <div className="row">
        <div className="col-md-6">
          <h1 className="hero-title">Hello, world!</h1>
          <p className="hero-lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <div className="divider divider-short border-primary my-4"></div>
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <Button type="primary" className="btn-cta">Learn more</Button>
        </div>
      </div>
    </div>
  </article>
)

export default Section;
