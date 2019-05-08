import React from 'react';
import { Button } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Icon</div>
      <div className="box-body">
        <Button type="primary" shape="circle" icon="search" />
        <Button type="primary" icon="search">Search</Button>
        <Button shape="circle" icon="search" />
        <Button icon="search">Search</Button>
        <br />
        <Button shape="circle" icon="search" />
        <Button icon="search">Search</Button>
        <Button type="dashed" shape="circle" icon="search" />
        <Button type="dashed" icon="search">Search</Button>
      </div>
    </div>
  )
}

export default Box;