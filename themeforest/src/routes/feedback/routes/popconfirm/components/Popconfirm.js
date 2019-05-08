import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import ConditionalTrigger from './ConditionalTrigger';
import Placement from './Placement';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article demo-style-popconfirm">
        <h2 className="article-title">Popconfirm</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <ConditionalTrigger />
          </div>
          <div key="3" className="mb-3">
            <Placement />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;