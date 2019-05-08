import React from 'react';

const Section = () => (
  <article className="article">
    <h2 className="article-title">Image Background</h2>
    <section className="hero text-center text-body-reverse rounded">
      <div className="hero-bg-img rounded" style={{backgroundImage: 'url(assets/images-demo/covers/photo-1438893761775-f1db119d27b2.jpg)'}}></div>
      <div className="hero-inner">
        <h1 className="hero-title text-body-reverse">About Us</h1>
        <p className="hero-lead">Everything you need to know about our company</p>
      </div>
    </section>
  </article>
)

export default Section;
