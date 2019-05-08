import React from 'react';
import { Cascader } from 'antd';
import DEMO from 'constants/demoData';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
  }],
}];

class CitySwitcher extends React.Component {
  state = {
    text: 'Unselect',
  };

  onChange = (value, selectedOptions) => {
    this.setState({
      text: selectedOptions.map(o => o.label).join(', '),
    });
  }
  render() {
    return (
      <span>
        {this.state.text}
        &nbsp;
        <Cascader options={options} onChange={this.onChange}>
          <a href={DEMO.link}>Change city</a>
        </Cascader>
      </span>
    );
  }
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Custom trigger</div>
      <div className="box-body">
        <CitySwitcher />
      </div>
    </div>
  )
}

export default Box;