import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import DateFormat from './DateFormat';
import DisabledDateTime from './DisabledDateTime';
import Sizes from './Sizes';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article demo-style-datepicker">
        <h2 className="article-title">DatePicker</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <Sizes />
          </div>
          <div key="3" className="mb-3">
            <DateFormat />
          </div>
          <div key="4" className="mb-3">
            <DisabledDateTime />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;