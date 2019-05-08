import React from 'react';
import { Alert } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">More types</div>
      <div className="box-body">
        <Alert message="Success Text" type="success" />
        <Alert message="Info Text" type="info" />
        <Alert message="Warning Text" type="warning" />
        <Alert message="Error Text" type="error" />
      </div>
    </div>
  )
}

export default Box;