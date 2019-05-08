import React from 'react';
import { Button } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Type</div>
      <div className="box-body">
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
      </div>
    </div>
  )
}

export default Box;