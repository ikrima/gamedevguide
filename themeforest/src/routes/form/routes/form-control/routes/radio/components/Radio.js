import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import Disabled from './Disabled';
import RadioGroup from './RadioGroup';
import RadioStyle from './RadioStyle';
import Size from './Size';
import VerticalRadioGroup from './VerticalRadioGroup';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Radio</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <VerticalRadioGroup />
          </div>
          <div key="3" className="mb-3">
            <Size />
          </div>
          <div key="4" className="mb-3">
            <Disabled />
          </div>
          <div key="5" className="mb-3">
            <RadioGroup />
          </div>
          <div key="6" className="mb-3">
            <RadioStyle />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;