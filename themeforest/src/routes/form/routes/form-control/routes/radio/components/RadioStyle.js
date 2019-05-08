import React from 'react';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

// Customized

function onChange(e) {
  console.log(`radio checked:${e.target.value}`);
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Radio style</div>
      <div className="box-body">
        <div>
          <RadioGroup onChange={onChange} defaultValue="a">
            <RadioButton value="a">A</RadioButton>
            <RadioButton value="b">B</RadioButton>
            <RadioButton value="c">C</RadioButton>
            <RadioButton value="d">D</RadioButton>
          </RadioGroup>
        </div>
        <div style={{ marginTop: 16 }}>
          <RadioGroup onChange={onChange} defaultValue="a">
            <RadioButton value="a">A</RadioButton>
            <RadioButton value="b" disabled>B</RadioButton>
            <RadioButton value="c">C</RadioButton>
            <RadioButton value="d">D</RadioButton>
          </RadioGroup>
        </div>
        <div style={{ marginTop: 16 }}>
          <RadioGroup disabled onChange={onChange} defaultValue="a">
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