import React from 'react';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
];

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Checkbox Group</div>
      <div className="box-body">
        <CheckboxGroup options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
        <br /><br />
        <CheckboxGroup options={options} defaultValue={['Pear']} onChange={onChange} />
        <br /><br />
        <CheckboxGroup options={optionsWithDisabled} disabled defaultValue={['Apple']} onChange={onChange} />
      </div>
    </div>
  )
}

export default Box;