// Customoized

import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'MM/DD/YYYY';
const dateFormat2 = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Date Format</div>
      <div className="box-body">
        <DatePicker defaultValue={moment('01/01/2015', dateFormat)} format={dateFormat} />
        <br />
        <DatePicker defaultValue={moment('2015/01/01', dateFormat2)} format={dateFormat2} />
        <br />
        <MonthPicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} />
        <br />
        <RangePicker
          defaultValue={[moment('01/01/2015', dateFormat), moment('01/01/2015', dateFormat)]}
          format={dateFormat}
        />
      </div>
    </div>
  )
}

export default Box;