import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import CookieNotice from './CookieNotice';
import CustomCloseButton from './CustomCloseButton';
import CustomizedIcon from './CustomizedIcon';
import DurationAfterWhichTheNotificationBoxIsClosed from './DurationAfterWhichTheNotificationBoxIsClosed';
import NotificationWithIcon from './NotificationWithIcon';
import Placement from './Placement';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Notification</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div className="mb-3" key="1"> <Basic /> </div>
          <div className="mb-3" key="2"> <CookieNotice /> </div>
          <div className="mb-3" key="3"> <NotificationWithIcon /> </div>
          <div className="mb-3" key="4"> <CustomizedIcon /> </div>
          <div className="mb-3" key="5"> <DurationAfterWhichTheNotificationBoxIsClosed /> </div>
          <div className="mb-3" key="6"> <CustomCloseButton /> </div>
          <div className="mb-3" key="7"> <Placement /> </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;