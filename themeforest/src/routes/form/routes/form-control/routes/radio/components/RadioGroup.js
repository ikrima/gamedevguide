import React from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

class App extends React.Component {
  state = {
    value: 1,
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    return (
      <RadioGroup onChange={this.onChange} value={this.state.value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </RadioGroup>
    );
  }
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Radio Group</div>
      <div className="box-body">
        <App />
      </div>
    </div>
  )
}

export default Box;