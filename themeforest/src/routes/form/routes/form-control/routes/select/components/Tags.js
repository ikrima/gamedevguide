import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Tags</div>
      <div className="box-body">
        <Select
          mode="tags"
          style={{ width: '100%' }}
          searchPlaceholder="标签模式"
          onChange={handleChange}
        >
          {children}
        </Select>
      </div>
    </div>
  )
}

export default Box;