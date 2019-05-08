import React from 'react';
import { TimePicker } from 'antd';

function onChange(time, timeString) {
  console.log(time, timeString);
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">12 hours</div>
      <div className="box-body">
        <TimePicker use12Hours onChange={onChange} />
        <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} />
        <TimePicker use12Hours format="h:mm a" onChange={onChange} />
      </div>
    </div>
  )
}

export default Box;