import React from 'react';
import { Slider } from 'antd';

function formatter(value) {
  return `${value}%`;
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Customerize tooltip</div>
      <div className="box-body">
        <Slider tipFormatter={formatter} />
        <Slider tipFormatter={null} />
      </div>
    </div>
  )
}

export default Box;