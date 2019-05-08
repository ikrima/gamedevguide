import React from 'react';
import { Input } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Three sizes of Input</div>
      <div className="box-body">
        <div className="example-input">
          <Input size="large" placeholder="large size" />
          <Input placeholder="default size" />
          <Input size="small" placeholder="small size" />
        </div>
      </div>
    </div>
  )
}

export default Box;