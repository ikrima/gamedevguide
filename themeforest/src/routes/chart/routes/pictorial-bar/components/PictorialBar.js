import React from 'react';
import QueueAnim from 'rc-queue-anim';
import PictorialBar1 from './PictorialBar1';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-lg chapter">
    <article className="article">
      <h2 className="article-title">PictorialBar</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3">
          <PictorialBar1 />
        </div>
      </QueueAnim>
    </article>
  </div>
);

export default Page;
