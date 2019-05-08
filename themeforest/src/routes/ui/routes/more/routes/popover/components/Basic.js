import React from 'react';
import { Popover, Button } from 'antd';

const content = (
  <div>
    <p>Popover content</p>
  </div>
);

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <Popover content={content} title="Title">
          <Button type="primary">Hover me</Button>
        </Popover>
      </div>
    </div>
  )
}

export default Box;