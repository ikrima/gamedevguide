import React from 'react';
import QueueAnim from 'rc-queue-anim';
import DEMO from 'constants/demoData';

const articles = DEMO.articles;

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-lg chapter">
      <article className="article">
        <h2 className="article-title">Blog Cards (List)</h2>
        <QueueAnim type="bottom" className="ui-animate">
          {
            articles.map((article, i) => (
              <article key={( i + 1).toString()} className="row blog-card-list-v1 mb-4">
                <a className="blog-card__img col-lg-7" href={article.link}>
                  <img src={article.img} alt="Blog cover"/>
                </a>
                <div className="blog-card__body col-lg-5">
                  <div className="blog-card__tag">{article.tag}</div>
                  <a href={DEMO.link} className="no-link-style"><h4 className="blog-card__title">{article.title}</h4></a>
                  <div className="blog-card__content">{article.content}</div>
                  <div className="blog-card__author">{article.author}</div>
                </div>
              </article>
            ))
          }
          </QueueAnim>
      </article>
    </div>
  );
}

export default Page;
