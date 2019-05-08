import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Heatmap1 from './Heatmap1'
import Heatmap2 from './Heatmap2'

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-xl chapter">
    <article className="article">
      <h2 className="article-title">Heatmap</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3">
          <Heatmap1 />
        </div>
        <div key="2" className="mb-3">
          <Heatmap2 />
        </div>
      </QueueAnim>
    </article>
  </div>
);

export default Page;
