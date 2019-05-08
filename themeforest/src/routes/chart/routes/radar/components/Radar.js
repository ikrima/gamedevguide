import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Radar1 from './Radar1';
import Radar2 from './Radar2';
import Radar3 from './Radar3';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-lg chapter">
    <article className="article">
      <h2 className="article-title">Radar</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3">
          <Radar1 />
        </div>
        <div key="2" className="mb-3">
          <Radar2 />
        </div>
        <div key="3" className="mb-3">
          <Radar3 />
        </div>
      </QueueAnim>
    </article>
  </div>
);

export default Page;
