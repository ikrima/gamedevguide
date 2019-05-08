import React from 'react';
import QueueAnim from 'rc-queue-anim';
import CustomizeDuration from './CustomizeDuration';
import MessageOfLoading from './MessageOfLoading';
import NormalPrompt from './NormalPrompt';
import OtherTypesOfMessage from './OtherTypesOfMessage';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Message</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <NormalPrompt />
          </div>
          <div key="2" className="mb-3">
            <CustomizeDuration />
          </div>
          <div key="3" className="mb-3">
            <OtherTypesOfMessage />
          </div>
          <div key="4" className="mb-3">
            <MessageOfLoading />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;