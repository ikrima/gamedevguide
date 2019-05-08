import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Gauge1 from './Gauge1';
import Gauge2 from './Gauge2';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-lg chapter">
    <article className="article">
      <h2 className="article-title">Gauge</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3">
          <Gauge1 />
        </div>
        <div key="2" className="mb-3">
          <Gauge2 />
        </div>
      </QueueAnim>
    </article>
  </div>
);

export default Page;
