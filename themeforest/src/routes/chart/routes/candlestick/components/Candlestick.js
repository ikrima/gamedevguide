import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Candlestick1 from './Candlestick1';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-lg chapter">
    <article className="article">
      <h2 className="article-title">Candlestick</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3">
          <Candlestick1 />
        </div>
      </QueueAnim>
    </article>
  </div>
);

export default Page;
