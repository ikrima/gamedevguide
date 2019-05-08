import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import Disabled from './Disabled';
import DisabledTime from './DisabledTime';
import HourAndMinute from './HourAndMinute';
import Sizes from './Sizes';
import TwelveHours from './TwelveHours';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article demo-style-timepicker">
        <h2 className="article-title">TimePicker</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <Sizes />
          </div>
          <div key="3" className="mb-3">
            <HourAndMinute />
          </div>
          <div key="4" className="mb-3">
            <Disabled />
          </div>
          <div key="5" className="mb-3">
            <DisabledTime />
          </div>
          <div key="6" className="mb-3">
            <TwelveHours />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;