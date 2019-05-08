import React from 'react';
import { Alert } from 'antd';

// Customized

const onClose = function (e) {
  console.log(e, 'I was closed.');
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Closable</div>
      <div className="box-body">
        <Alert
          message="Warning Text"
          type="warning"
          closable
          onClose={onClose}
        />
        <Alert
          message="Error Text"
          description="Error Description"
          type="error"
          closable
          onClose={onClose}
        />
      </div>
    </div>
  )
}

export default Box;