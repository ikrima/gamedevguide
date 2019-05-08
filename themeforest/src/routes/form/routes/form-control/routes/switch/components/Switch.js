import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import Disabled from './Disabled';
import TextIcon from './TextIcon';
import TwoSizes from './TwoSizes';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article demo-style-switch">
        <h2 className="article-title">Switch</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <TextIcon />
          </div>
          <div key="3" className="mb-3">
            <Disabled />
          </div>
          <div key="4" className="mb-3">
            <TwoSizes />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;