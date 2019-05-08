import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import GenerateFormTreeData from './GenerateFormTreeData';
import Multiple from './Multiple';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">TreeSelect</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <Multiple />
          </div>
          <div key="3" className="mb-3">
            <GenerateFormTreeData />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;