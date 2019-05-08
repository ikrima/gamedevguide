import React from 'react';
import { Button, notification } from 'antd';

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};

const Box = () => {
  return(
    <div className="box box-default demo-style-button">
      <div className="box-header">Notification with icon</div>
      <div className="box-body">
        <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
        <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
        <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
        <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
      </div>
    </div>
  )
}

export default Box;