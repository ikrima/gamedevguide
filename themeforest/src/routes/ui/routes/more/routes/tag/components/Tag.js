import React from 'react';
import QueueAnim from 'rc-queue-anim';
import AddRemoveDynamically from './AddRemoveDynamically';
import Checkable from './Checkable';
import ColorfulTag from './ColorfulTag';
import HotTags from './HotTags';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Tag</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <AddRemoveDynamically />
          </div>
          <div key="2" className="mb-3">
            <ColorfulTag />
          </div>
          <div key="3" className="mb-3">
            <Checkable />
          </div>
          <div key="4" className="mb-3">
            <HotTags />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;