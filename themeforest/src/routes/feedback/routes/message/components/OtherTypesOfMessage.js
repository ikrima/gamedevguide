import React from 'react';
import { message, Button } from 'antd';

const success = () => {
  message.success('This is a message of success');
};

const error = () => {
  message.error('This is a message of error');
};

const warning = () => {
  message.warning('This is message of warning');
};

const Box = () => {
  return(
    <div className="box box-default demo-style-button">
      <div className="box-header">Other types of message</div>
      <div className="box-body">
        <Button onClick={success}>Success</Button>
        <Button onClick={error}>Error</Button>
        <Button onClick={warning}>Warning</Button>
      </div>
    </div>
  )
}

export default Box;