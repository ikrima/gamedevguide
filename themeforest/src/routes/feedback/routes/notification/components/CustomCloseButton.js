import React from 'react';
import { Button, notification } from 'antd';

const close = () => {
  console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btnClick = function () {
    // to hide notification box
    notification.close(key);
  };
  const btn = (
    <Button type="primary" size="small" onClick={btnClick}>
      Confirm
    </Button>
  );
  notification.open({
    message: 'Notification Title',
    description: 'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
    btn,
    key,
    onClose: close,
  });
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Custom close button</div>
      <div className="box-body">
        <Button type="primary" onClick={openNotification}>Open the notification box</Button>
      </div>
    </div>
  )
}

export default Box;