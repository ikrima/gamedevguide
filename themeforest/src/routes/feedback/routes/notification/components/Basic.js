import React from 'react';
import { Button, notification } from 'antd';

// Customized

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification. By default, the notification box will close itself after 4.5 seconds.',
  });
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <Button type="primary" onClick={openNotification}>Open the notification box</Button>
        <div className="divider"></div>
        <div className="callout callout-info">
          <p>By default, the notification box will close itself automatically after 4.5 seconds. Use <code>duration</code> option to override the default value</p>
        </div>
      </div>
    </div>
  )
}

export default Box;