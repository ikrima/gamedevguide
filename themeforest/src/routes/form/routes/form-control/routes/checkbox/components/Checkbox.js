import React from 'react';
import QueueAnim from 'rc-queue-anim';
import CheckAll from './CheckAll';
import CheckboxGroup from './CheckboxGroup';
import ControlledCheckbox from './ControlledCheckbox';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Checkbox</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <ControlledCheckbox />
          </div>
          <div key="2" className="mb-3">
            <CheckAll />
          </div>
          <div key="3" className="mb-3">
            <CheckboxGroup />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;