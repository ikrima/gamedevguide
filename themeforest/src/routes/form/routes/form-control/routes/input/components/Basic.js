import React from 'react';
import { Input } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <Input placeholder="Basic usage" />
      </div>
    </div>
  )
}

export default Box;