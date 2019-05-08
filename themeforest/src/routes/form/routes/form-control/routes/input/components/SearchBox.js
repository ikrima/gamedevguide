import React from 'react';
import { Input } from 'antd';
const Search = Input.Search;

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
        <br /><br />
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          enterButton
        />
      </div>
    </div>
  )
}

export default Box;