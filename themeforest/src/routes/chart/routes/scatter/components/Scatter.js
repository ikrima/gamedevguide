import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Scatter1 from './Scatter1';
import Scatter2 from './Scatter2';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-xl chapter">
    <article className="article">
      <h2 className="article-title">Scatter</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3">
          <Scatter1 />
        </div>
        <div key="2" className="mb-3">
          <Scatter2 />
        </div>
      </QueueAnim>
    </article>
  </div>
);

export default Page;
