import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Template</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
          </div>
        </QueueAnim>
      </article>
    </div>
  );
}

export default Page;
