import React from 'react';
import { Button, notification } from 'antd';

// Customized, because of typo

const openNotification = () => {
  const args = {
    message: 'Notification Title',
    description: 'I will never close automatically. I will never close automatically. I will never close automatically.',
    duration: 0,
  };
  notification.open(args);
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Duration after which the notification box is closed</div>
      <div className="box-body">
        <Button type="primary" onClick={openNotification}>Open the notification box</Button>
      </div>
    </div>
  )
}

export default Box;