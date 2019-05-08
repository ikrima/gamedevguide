import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import Type from './Type';
import AutosetFontSize from './AutosetFontSize';
import WithBadge from './WithBadge';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article demo-style-avatars">
        <h2 className="article-title">Avatar</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Type />
          </div>
          <div key="2" className="mb-3">
            <Basic />
          </div>
          <div key="3" className="mb-3">
            <AutosetFontSize />
          </div>
          <div key="4" className="mb-3">
            <WithBadge />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;