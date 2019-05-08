import React from 'react';
import { Switch } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Two sizes</div>
      <div className="box-body">
        <Switch />
        <br />
        <Switch size="small" />
      </div>
    </div>
  )
}

export default Box;