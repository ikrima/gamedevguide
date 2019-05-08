import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Bar1 from './Bar1';
import Bar2 from './Bar2';
import Bar3 from './Bar3';
import Bar4 from './Bar4';
import Bar5 from './Bar5';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-lg chapter">
    <article className="article">
      <h2 className="article-title">Bar</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3">
          <Bar1 />
        </div>
        <div key="2" className="mb-3">
          <Bar2 />
        </div>
        <div key="3" className="mb-3">
          <Bar3 />
        </div>
        <div key="4" className="mb-3">
          <Bar4 />
        </div>
        <div key="5" className="mb-3">
          <Bar5 />
        </div>
      </QueueAnim>
    </article>
  </div>
);

export default Page;
