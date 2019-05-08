import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import Decimals from './Decimals';
import Disabled from './Disabled';
import Formatter from './Formatter';
import Sizes from './Sizes';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article demo-style-inputnumber">
        <h2 className="article-title">InputNumber</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <Disabled />
          </div>
          <div key="3" className="mb-3">
            <Formatter />
          </div>
          <div key="4" className="mb-3">
            <Sizes />
          </div>
          <div key="5" className="mb-3">
            <Decimals />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;