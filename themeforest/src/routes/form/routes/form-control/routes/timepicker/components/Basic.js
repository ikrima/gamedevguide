import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';

function onChange(time, timeString) {
  console.log(time, timeString);
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
      </div>
    </div>
  )
}

export default Box;