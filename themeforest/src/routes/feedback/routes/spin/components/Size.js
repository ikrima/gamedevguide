import React from 'react';
import { Spin } from 'antd';

const Box = () => {
  return(
    <div className="box box-default demo-style-spin">
      <div className="box-header">Size</div>
      <div className="box-body">
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
      </div>
    </div>
  )
}

export default Box;