import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';

const format = 'HH:mm';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Hour and minute</div>
      <div className="box-body">
        <TimePicker defaultValue={moment('12:08', format)} format={format} />
      </div>
    </div>
  )
}

export default Box;