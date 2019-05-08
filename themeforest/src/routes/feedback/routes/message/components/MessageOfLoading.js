import React from 'react';
import { message, Button } from 'antd';

const success = () => {
  const hide = message.loading('Action in progress..', 0);
  // Dismiss manually and asynchronously
  setTimeout(hide, 2500);
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Message of loading</div>
      <div className="box-body">
        <Button onClick={success}>Display a loading indicator</Button>
      </div>
    </div>
  )
}

export default Box;