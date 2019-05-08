import React from 'react';
import { InputNumber } from 'antd';

function onChange(value) {
  console.log('changed', value);
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
      </div>
    </div>
  )
}

export default Box;