import React from 'react';
import { message, Button } from 'antd';

const info = () => {
  message.info('This is a normal message');
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Normal prompt</div>
      <div className="box-body">
        <Button type="primary" onClick={info}>Display normal message</Button>
      </div>
    </div>
  )
}

export default Box;