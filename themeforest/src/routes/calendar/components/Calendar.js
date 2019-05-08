import React from 'react';
import Card from './Card';
import NoticeCalendar from './NoticeCalendar';
import QueueAnim from 'rc-queue-anim';

const Page = () => {
  return(
    <div className="container-fluid container-mw-xxl chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"><NoticeCalendar /></div>
        <div key="2"><Card /></div>
      </QueueAnim>
    </div>
  )
}

export default Page;