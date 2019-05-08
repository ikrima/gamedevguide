// Customoized

import React from 'react';
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

const dateFormat = 'MM/DD/YYYY';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <DatePicker onChange={onChange} format={dateFormat} />
        <br />
        <MonthPicker onChange={onChange} placeholder="Select month" format={dateFormat} />
        <br />
        <RangePicker onChange={onChange} format={dateFormat} />
        <br />
        <WeekPicker onChange={onChange} placeholder="Select week" />
      </div>
    </div>
  )
}

export default Box;