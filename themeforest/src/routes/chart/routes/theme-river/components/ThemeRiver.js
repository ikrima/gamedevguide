import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ThemeRiver1 from './ThemeRiver1';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-lg chapter">
    <article className="article">
      <h2 className="article-title">ThemeRiver</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3">
          <ThemeRiver1 />
        </div>
      </QueueAnim>
    </article>
  </div>
);

export default Page;
