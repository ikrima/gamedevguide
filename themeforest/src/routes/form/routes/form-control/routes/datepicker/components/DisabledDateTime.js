// Customoized

import React from 'react';
import { DatePicker } from 'antd';
const RangePicker = DatePicker.RangePicker;

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // can not select days before today and today
  return current && current.valueOf() < Date.now();
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}

function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Disabled Date & Time</div>
      <div className="box-body">
        <DatePicker
          format="MM-DD-YYYY HH:mm:ss"
          disabledDate={disabledDate}
          disabledTime={disabledDateTime}
          showTime
        />
        <br />
        <RangePicker
          disabledDate={disabledDate}
          disabledTime={disabledRangeTime}
          showTime={{ hideDisabledOptions: true }}
          format="MM-DD-YYYY HH:mm:ss"
        />
      </div>
    </div>
  )
}

export default Box;