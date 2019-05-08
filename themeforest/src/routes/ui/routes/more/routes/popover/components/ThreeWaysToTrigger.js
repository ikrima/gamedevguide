import React from 'react';
import { Popover, Button } from 'antd';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const Box = () => {
  return(
    <div className="box box-default demo-style-button">
      <div className="box-header">Three ways to trigger</div>
      <div className="box-body">
        <Popover content={content} title="Title" trigger="hover">
          <Button>Hover me</Button>
        </Popover>
        <Popover content={content} title="Title" trigger="focus">
          <Button>Focus me</Button>
        </Popover>
        <Popover content={content} title="Title" trigger="click">
          <Button>Click me</Button>
        </Popover>
      </div>
    </div>
  )
}

export default Box;