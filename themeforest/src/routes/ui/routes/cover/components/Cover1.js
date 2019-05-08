import React from 'react';

const Cover = () => (
  <section className="cover">
    <div className="cover-bg-img d-none d-md-block" style={{backgroundImage: 'url(assets/images-demo/covers/leone-venter-559377-cut.jpg)'}}></div>
    <div className="container-fluid container-mw-xl">
      <div className="row">
        <div className="col-md-6 col-lg-5">
          <h1><span className="bold">100+</span> Components</h1>
          <p className="lead">Ant admin is a multi-purpose template which comes with a huge collection of components out of box.</p>
          <div className="divider divider-short border-primary my-4"></div>
          <p>All components are well designed & easy to use.</p>
        </div>
      </div>
    </div>
  </section>
);


const Section = () => (
  <article className="article">
    <div className="container-fluid container-mw-xl">
      <h2 className="article-title">Cover</h2>
    </div>

    <Cover />
  </article>
)

export default Section;
