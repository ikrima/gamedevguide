import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import DEMO from 'constants/demoData';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" href={DEMO.link}>1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" href={DEMO.link}>2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" disabled>3d menu item（disabled）</Menu.Item>
  </Menu>
);

// used "Other elments" example instead of "Basic"
const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href={DEMO.link}>
            Hover me <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

export default Box;