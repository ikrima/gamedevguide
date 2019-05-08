import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import OtherCharacter from './OtherCharacter';
import ReadOnly from './ReadOnly';
import ShowCopywriting from './ShowCopywriting';

const Page = () => {
  return (
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Rate</h2>

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <ShowCopywriting />
          </div>
          <div key="3" className="mb-3">
            <OtherCharacter />
          </div>
          <div key="4" className="mb-3">
            <ReadOnly />
          </div>
        </QueueAnim>

      </article>
    </div>
  )
}

export default Page;