import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import Dynamic from './Dynamic';
import RedBadge from './RedBadge';
import Standalone from './Standalone';
import Status from './Status';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article demo-style-badge">
        <h2 className="article-title">Badge</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <RedBadge />
          </div>
          <div key="3" className="mb-3">
            <Dynamic />
          </div>
          <div key="4" className="mb-3">
            <Standalone />
          </div>
          <div key="5" className="mb-3">
            <Status />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;