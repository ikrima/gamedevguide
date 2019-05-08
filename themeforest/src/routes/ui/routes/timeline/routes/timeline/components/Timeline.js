import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Color from './Color';
import Custom from './Custom';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Timeline</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Color />
          </div>
          <div key="2" className="mb-3">
            <Custom />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;