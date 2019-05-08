import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Line1 from './Line1';
import Line2 from './Line2';
import Line3 from './Line3';
import Line4 from './Line4';


const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-lg chapter">
    <article className="article">
      <h2 className="article-title">Line & Area</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3">
          <Line1 />
        </div>
        <div key="2" className="mb-3">
          <Line2 />
        </div>
        <div key="3" className="mb-3">
          <Line3 />
        </div>
        <div key="4" className="mb-3">
          <Line4 />
        </div>
      </QueueAnim>
    </article>
  </div>
);

export default Page;
