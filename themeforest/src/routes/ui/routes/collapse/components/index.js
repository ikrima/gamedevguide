import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Accordion from './Accordion';
import Borderless from './Borderless';
import Collapse from './Collapse';
import CustomPanel from './CustomPanel';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Collapse & Accordion</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Collapse />
          </div>
          <div key="2" className="mb-3">
            <Accordion />
          </div>
          <div key="3" className="mb-3">
            <Borderless />
          </div>
          <div key="4" className="mb-3">
            <CustomPanel />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;