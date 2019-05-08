import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Disabled</div>
      <div className="box-body">
        <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} disabled />
      </div>
    </div>
  )
}

export default Box;