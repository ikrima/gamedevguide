import React from 'react';
import { InputNumber } from 'antd';

function onChange(value) {
  console.log('changed', value);
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Sizes</div>
      <div className="box-body">
        <InputNumber size="large" min={1} max={100000} defaultValue={3} onChange={onChange} />
        <InputNumber min={1} max={100000} defaultValue={3} onChange={onChange} />
        <InputNumber size="small" min={1} max={100000} defaultValue={3} onChange={onChange} />
      </div>
    </div>
  )
}

export default Box;