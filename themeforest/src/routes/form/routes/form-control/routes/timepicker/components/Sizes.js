import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Three Sizes</div>
      <div className="box-body">
        <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} size="large" />
        <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />
        <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} size="small" />
      </div>
    </div>
  )
}

export default Box;