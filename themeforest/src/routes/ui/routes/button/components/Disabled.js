import React from 'react';
import { Button } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Disabled</div>
      <div className="box-body">
        <Button type="primary">Primary</Button>
        <Button type="primary" disabled>Primary(disabled)</Button>
        <br />
        <Button>Default</Button>
        <Button disabled>Default(disabled)</Button>
        <br />
        <Button type="dashed">Dashed</Button>
        <Button type="dashed" disabled>Dashed(disabled)</Button>
        <div className="box-body-inner" style={{ padding: '8px 8px 0 8px', background: 'rgb(190, 200, 200)' }}>
          <Button ghost>Ghost</Button>
          <Button ghost disabled>Ghost(disabled)</Button>
        </div>
      </div>
    </div>
  )
}

export default Box;