import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import DEMO from 'constants/demoData';
const SubMenu = Menu.SubMenu;

const menu = (
  <Menu>
    <Menu.Item>1st menu item</Menu.Item>
    <Menu.Item>2nd menu item</Menu.Item>
    <SubMenu title="sub menu">
      <Menu.Item>3d menu item</Menu.Item>
      <Menu.Item>4th menu item</Menu.Item>
    </SubMenu>
  </Menu>
);

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Cascading menu</div>
      <div className="box-body">
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href={DEMO.link}>
            Cascading menu <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

export default Box;