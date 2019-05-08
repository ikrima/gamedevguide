import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import Changer from './Changer';
import Jumper from './Jumper';
import MiniSize from './MiniSize';
import More from './More';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Pagination</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <More />
          </div>
          <div key="3" className="mb-3">
            <Changer />
          </div>
          <div key="4" className="mb-3">
            <Jumper />
          </div>
          <div key="5" className="mb-3">
            <MiniSize />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;