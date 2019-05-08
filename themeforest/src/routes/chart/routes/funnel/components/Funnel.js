import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Funnel1 from './Funnel1';
import Funnel2 from './Funnel2';
import Funnel3 from './Funnel3';


const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-lg chapter">
    <article className="article">
      <h2 className="article-title">Funnel</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3">
          <Funnel1 />
        </div>
        <div key="2" className="mb-3">
          <Funnel2 />
        </div>
        <div key="3" className="mb-3">
          <Funnel3 />
        </div>
      </QueueAnim>
    </article>
  </div>
);

export default Page;

