import React from 'react';
import { AutoComplete } from 'antd';

const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

function Complete() {
  return (
    <AutoComplete
      style={{ width: 200 }}
      dataSource={dataSource}
      placeholder="try to type `b`"
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
    />
  );
}


const Section = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Non-case-sensitive AutoComplete</div>
      <div className="box-body">
        <Complete />
      </div>
    </div>
  )
}

export default Section;