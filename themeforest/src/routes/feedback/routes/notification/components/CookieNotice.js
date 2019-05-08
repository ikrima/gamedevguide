import React from 'react';
import { Button, notification } from 'antd';

// Customized

const openNotification = () => {
  notification.info({
    placement: 'bottomRight',
    message: 'This website uses cookies',
    duration: 0,
    description: 'By visitng our site, you agree to use of cookies to enhance your user experience.',
  });
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Cookie Notice</div>
      <div className="box-body">
        <Button onClick={openNotification}>Open the notification box</Button>

        <div className="callout callout-success">
          <p>If you set the <code>duration</code> value to 0, the notification box will never close automatically.</p>
        </div>
      </div>
    </div>
  )
}

export default Box;