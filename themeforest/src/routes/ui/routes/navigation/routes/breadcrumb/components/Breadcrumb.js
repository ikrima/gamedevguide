import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import ConfiguringTheSeparator from './ConfiguringTheSeparator';
import WithAnIcon from './WithAnIcon';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Breadcrumb</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <ConfiguringTheSeparator />
          </div>
          <div key="3" className="mb-3">
            <WithAnIcon />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;