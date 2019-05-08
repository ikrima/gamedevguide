import React from 'react';
import { Switch } from 'antd';

function onChange(checked) {
  console.log(`switch to ${checked}`);
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <Switch defaultChecked onChange={onChange} />
      </div>
    </div>
  )
}

export default Box;