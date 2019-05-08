import React from 'react';
import { Menu, Dropdown, Icon, Alert } from 'antd';
import DEMO from 'constants/demoData';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href={DEMO.link}>1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href={DEMO.link}>2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3d menu item</Menu.Item>
  </Menu>
);


const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Trigger mode</div>
      <div className="box-body">
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href={DEMO.link}>
            Click me <Icon type="down" />
          </a>
        </Dropdown>
        <div className="divider"></div>
        <Alert message="The default trigger mode is hover, you can change it to click." type="info" showIcon />
      </div>
    </div>
  )
}

export default Box;