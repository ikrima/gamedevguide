import React from 'react';
import { Rate } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <Rate />
        <br />
        <Rate allowHalf defaultValue={2.5} />
      </div>
    </div>
  )
}

export default Box;