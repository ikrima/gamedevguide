import React from 'react';
import { Alert } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Customized Close Text</div>
      <div className="box-body">
        <Alert message="Info Text" type="info" closeText="Close Now" />
      </div>
    </div>
  )
}

export default Box;