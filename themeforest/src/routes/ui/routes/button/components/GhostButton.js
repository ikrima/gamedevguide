import React from 'react';
import { Button } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Ghost Button</div>
      <div className="box-body bg-dark">
        <Button type="primary" ghost>Primary</Button>
        <Button ghost>Default</Button>
        <Button type="dashed" ghost>Dashed</Button>
        <Button type="danger" ghost>danger</Button>
      </div>
    </div>
  )
}

export default Box;