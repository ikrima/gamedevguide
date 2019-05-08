import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Pie1 from './Pie1';
import Pie2 from './Pie2';
import Pie4 from './Pie4';
import Pie5 from './Pie5';


const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-lg chapter">
    <article className="article">
      <h2 className="article-title">Pie</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3">
          <Pie1 />
        </div>
        <div key="2" className="mb-3">
          <Pie2 />
        </div>
        <div key="3" className="mb-3">
          <Pie4 />
        </div>
        <div key="4" className="mb-3">
          <Pie5 />
        </div>
      </QueueAnim>
    </article>
  </div>
);

export default Page;
