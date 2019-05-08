import React from 'react';
import { InputNumber } from 'antd';

function onChange(value) {
  console.log('changed', value);
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Decimals</div>
      <div className="box-body">
        <InputNumber min={0} max={10} step={0.1} onChange={onChange} />
      </div>
    </div>
  )
}

export default Box;