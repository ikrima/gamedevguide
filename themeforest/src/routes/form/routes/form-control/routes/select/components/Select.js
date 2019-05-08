import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import SelectWithSearchField from './SelectWithSearchField';
import Sizes from './Sizes';
import Tags from './Tags';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article demo-style-select">
        <h2 className="article-title">Select & Tags Input</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <SelectWithSearchField />
          </div>
          <div key="3" className="mb-3">
            <Tags />
          </div>
          <div key="4" className="mb-3">
            <Sizes />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;