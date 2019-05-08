import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import DEMO from 'constants/demoData';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href={DEMO.link}>1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href={DEMO.link}>2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href={DEMO.link}>3d menu item</a>
    </Menu.Item>
  </Menu>
);

const Box = () => {
  return(
    <div className="box box-default demo-style-button">
      <div className="box-header">Placement</div>
      <div className="box-body">
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button>bottomLeft</Button>
        </Dropdown>
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button>bottomCenter</Button>
        </Dropdown>
        <Dropdown overlay={menu} placement="bottomRight">
          <Button>bottomRight</Button>
        </Dropdown>
        <br />
        <Dropdown overlay={menu} placement="topLeft">
          <Button>topLeft</Button>
        </Dropdown>
        <Dropdown overlay={menu} placement="topCenter">
          <Button>topCenter</Button>
        </Dropdown>
        <Dropdown overlay={menu} placement="topRight">
          <Button>topRight</Button>
        </Dropdown>
      </div>
    </div>
  )
}

export default Box;