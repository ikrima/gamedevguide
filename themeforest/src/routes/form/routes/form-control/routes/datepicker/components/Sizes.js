// Customoized

import React from 'react';
import { DatePicker, Radio } from 'antd';

const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'MM/DD/YYYY';

class PickerSizesDemo extends React.Component {
  state = {
    size: 'default',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const { size } = this.state;
    return (
      <div>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br /><br />
        <DatePicker size={size} format={dateFormat} />
        <br />
        <MonthPicker size={size} format={dateFormat} />
        <br />
        <RangePicker size={size} format={dateFormat} />
      </div>
    );
  }
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Three Sizes</div>
      <div className="box-body">
        <PickerSizesDemo />
      </div>
    </div>
  )
}

export default Box;