import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import AsynchronousLoading from './AsynchronousLoading';
import CustomizeSuggestion from './CustomizeSuggestion';
import CustomizeTriggerToken from './CustomizeTriggerToken';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Mention</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <CustomizeSuggestion />
          </div>
          <div key="3" className="mb-3">
            <AsynchronousLoading />
          </div>
          <div key="4" className="mb-3">
            <CustomizeTriggerToken />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;