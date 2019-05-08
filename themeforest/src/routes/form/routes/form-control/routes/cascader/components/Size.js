import React from 'react';
import { Cascader } from 'antd';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

function onChange(value) {
  console.log(value);
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Size</div>
      <div className="box-body">
        <Cascader size="large" options={options} onChange={onChange} /><br /><br />
        <Cascader options={options} onChange={onChange} /><br /><br />
        <Cascader size="small" options={options} onChange={onChange} /><br /><br />
      </div>
    </div>
  )
}

export default Box;