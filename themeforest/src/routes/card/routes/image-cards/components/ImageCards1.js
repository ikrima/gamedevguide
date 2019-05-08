import React from 'react';
import { Button } from 'antd';

const Section = () => {
  return(
    <article className="article">
      <h2 className="article-title">Image Cards <div className="badge badge-pill">v1</div></h2>

      <div className="row">
        <div className="col-lg-3">

          <article className="img-card-v1 mb-4" style={{height: '340px'}}>
            <div className="img-card__cover" style={{backgroundImage: "url('assets/images-demo/covers/luca-bravo-198062-unsplash-mirror.jpg')"}}></div>
            <div className="img-card__body">
              <div className="img-card__tagline">Architecture</div>
              <h2 className="img-card__title">Duis aute irure dolor in reprehenderit</h2>
              <Button className="btn-cta">Explore</Button>
            </div>
          </article>

        </div>
        <div className="col-lg-4">

          <article className="img-card-v1 mb-4" style={{height: '340px'}}>
            <div className="img-card__cover" style={{backgroundImage: "url('assets/images-demo/covers/kimon-maritz-183501-unsplash-cut-mirror.jpg')"}}></div>
            <div className="img-card__body">
              <div className="img-card__tagline">Trending</div>
              <h2 className="img-card__title">Excepteur sint occaecat cupidatat non proident</h2>
              <Button className="btn-cta">Explore</Button>
            </div>
          </article>

        </div>
        <div className="col-lg-5">

          <article className="img-card-v1 text-body-reverse mb-4" style={{height: '340px'}}>
            <div className="img-card__cover overlay" style={{backgroundImage: "url('assets/images-demo/covers/alexandre-perotto-75274-unsplash.jpg')"}}></div>
            <div className="img-card__body">
              <div className="img-card__tagline">Popular</div>
              <h2 className="img-card__title">Consectetur adipisicing elit sed do eiusmod</h2>
              <Button className="btn-cta">Explore</Button>
            </div>
          </article>

        </div>
      </div>

    </article>
  );
}

export default Section;
