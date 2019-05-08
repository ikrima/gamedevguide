import React from 'react';
import QueueAnim from 'rc-queue-anim';
import './style.scss';

const Blockquote1 = () => (
  <div className="box box-default">
    <div className="box-body py-6">
      <blockquote className="blockquote-v1">“The difference between genius and stupidity is that genius has its limits.” <cite className="bq-author">- Albert Einstein</cite></blockquote>
    </div>
  </div>
)

const Blockquote2 = () => (
  <article className="img-card-v2 text-body-reverse" style={{height: '350px'}}>
    <div className="img-card__cover overlay" style={{backgroundImage: "url('assets/images-demo/covers/alexandre-perotto-75274-unsplash.jpg')"}}></div>
    <div className="img-card__body">
      <blockquote className="blockquote-v1">“The difference between genius and stupidity is that genius has its limits.” <cite className="bq-author">- Albert Einstein</cite></blockquote>
    </div>
  </article>
)

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Blockquote</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-4"> <Blockquote1 /> </div>
          <div key="2" className="mb-4"> <Blockquote2 /> </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;