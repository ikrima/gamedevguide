import React from 'react';
import { Button, notification, Icon } from 'antd';

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
  });
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Customized Icon</div>
      <div className="box-body">
        <Button type="primary" onClick={openNotification}>Open the notification box</Button>
      </div>
    </div>
  )
}

export default Box;