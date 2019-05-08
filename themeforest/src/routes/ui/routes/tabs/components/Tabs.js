import React from 'react';
import QueueAnim from 'rc-queue-anim';
import CustomizedTriggerOfNewTab from './CustomizedTriggerOfNewTab';
import MiniTab from './MiniTab';
import Position from './Position';
import Slide from './Slide';
import Notifications from 'routes/layout/routes/header/components/Notifications';

const NotificationExample = () => (
  <div className="box box-default">
    <Notifications />
  </div>
)

const Page = () => {
  return (
    <div className="chapter container-fluid container-mw-md no-breadcrumb">
      <article className="article">
        <h2 className="article-title">Tabs</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div className="mb-3" key="1"><NotificationExample /></div>
          <div className="mb-3" key="2"><Position /></div>
          <div className="mb-3" key="3"><Slide /></div>
          <div className="mb-3" key="4"><MiniTab /></div>
          <div className="mb-3" key="5"><CustomizedTriggerOfNewTab /></div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;