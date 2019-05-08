import React from 'react';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

// Customized

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Size</div>
      <div className="box-body">
        <div>
          <RadioGroup defaultValue="a" size="large">
            <RadioButton value="a">A</RadioButton>
            <RadioButton value="b">B</RadioButton>
            <RadioButton value="c">C</RadioButton>
            <RadioButton value="d">D</RadioButton>
          </RadioGroup>
        </div>
        <div style={{ marginTop: 16 }}>
          <RadioGroup defaultValue="a">
            <RadioButton value="a">A</RadioButton>
            <RadioButton value="b">B</RadioButton>
            <RadioButton value="c">C</RadioButton>
            <RadioButton value="d">D</RadioButton>
          </RadioGroup>
        </div>
        <div style={{ marginTop: 16 }}>
          <RadioGroup defaultValue="a" size="small">
            <RadioButton value="a">A</RadioButton>
            <RadioButton value="b">B</RadioButton>
            <RadioButton value="c">C</RadioButton>
            <RadioButton value="d">D</RadioButton>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default Box;