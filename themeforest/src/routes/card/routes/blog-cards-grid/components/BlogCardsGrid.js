import React from 'react';
import DEMO from 'constants/demoData';
import QueueAnim from 'rc-queue-anim';
import { Icon } from 'antd';

const articles = DEMO.articles;


const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-xl chapter">
      <article className="article">
        <h2 className="article-title">Blog Cards (Grid)</h2>
        <QueueAnim type="bottom" className="ui-animate flex-items-container">
          {
            articles.map((article, i) => (
              <article key={i.toString()} className="blog-card flex-item mb-4">
                <a href={article.link}>
                  <img src={article.img} alt="blog cover"/>
                </a>
                <div className="blog-card__body">
                  <span className="blog-card__date">{article.date}</span>
                  <h4 className="blog-card__title">{article.content}</h4>
                  <a href={DEMO.link} className="link-animated-hover link-hover-v1 text-primary">Read More <Icon type="arrow-right" /></a>
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
