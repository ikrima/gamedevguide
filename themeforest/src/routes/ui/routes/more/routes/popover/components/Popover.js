import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import ControllingTheCloseOfTheDialog from './ControllingTheCloseOfTheDialog';
import Placement from './Placement';
import ThreeWaysToTrigger from './ThreeWaysToTrigger';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter demo-style-popover">
      <article className="article">
        <h2 className="article-title">Popover</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <Placement />
          </div>
          <div key="3" className="mb-3">
            <ThreeWaysToTrigger />
          </div>
          <div key="4" className="mb-3">
            <ControllingTheCloseOfTheDialog />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;