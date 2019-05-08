import React from 'react';

const Section = () => {
  return(
    <article className="article">
      <h2 className="article-title">Image Cards <div className="badge badge-pill">v2</div></h2>

      <article className="img-card-v2 mb-4" style={{height: '350px'}}>
        <div className="img-card__cover" style={{backgroundImage: "url('assets/images-demo/covers/luca-bravo-198062-unsplash-mirror.jpg')"}}></div>
        <div className="img-card__body img-card__body--left">
          <h2 className="img-card__title">Responsive Design</h2>
          <p className="img-card__desc lead">Responsive Web Design makes your web page look good on all devices (desktops, tablets, and phones).</p>
        </div>
      </article>

      <article className="img-card-v2 mb-4" style={{height: '350px'}}>
        <div className="img-card__cover" style={{backgroundImage: "url('assets/images-demo/covers/kimon-maritz-183501-unsplash-cut.jpg')"}}></div>
        <div className="img-card__body img-card__body--right">
          <h2 className="img-card__title">With flexbox, content are always vertically centered</h2>
        </div>
      </article>

      <article className="img-card-v2 text-body-reverse mb-4" style={{height: '500px'}}>
        <div className="img-card__cover overlay" style={{backgroundImage: "url('assets/images-demo/covers/alexandre-perotto-75274-unsplash.jpg')"}}></div>
        <div className="img-card__body img-card__body--center">
          <h2 className="img-card__title">Custom Card Height</h2>
          <p className="img-card__desc lead">You can add a subtle overlay to image card using Overlay utility to make content more readable</p>
        </div>
      </article>
    </article>
  );
}

export default Section;
