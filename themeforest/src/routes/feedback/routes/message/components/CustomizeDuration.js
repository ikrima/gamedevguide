import React from 'react';
import { message, Button } from 'antd';

const success = () => {
  message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Customize duration</div>
      <div className="box-body">
        <Button onClick={success}>Customized display duration</Button>
      </div>
    </div>
  )
}

export default Box;