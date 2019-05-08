import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import Draggable from './Draggable';
import Searchable from './Searchable';
import TreeWithLine from './TreeWithLine';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Tree</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <Draggable />
          </div>
          <div key="3" className="mb-3">
            <Searchable />
          </div>
          <div key="4" className="mb-3">
            <TreeWithLine />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;