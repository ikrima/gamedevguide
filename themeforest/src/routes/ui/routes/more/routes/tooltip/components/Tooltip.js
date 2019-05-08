import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ArrowPointingAtTheCenter from './ArrowPointingAtTheCenter';
import Basic from './Basic';
import Placement from './Placement';


const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Tooltips</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <ArrowPointingAtTheCenter />
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