import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Closable from './Closable';
import CustomizedCloseText from './CustomizedCloseText';
import Icon from './Icon';
import MoreTypes from './MoreTypes';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter demo-style-alert">
      <article className="article">
        <h2 className="article-title">Alert</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Closable />
          </div>
          <div key="2" className="mb-3">
            <MoreTypes />
          </div>
          <div key="3" className="mb-3">
            <CustomizedCloseText />
          </div>
          <div key="4" className="mb-3">
            <Icon />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;