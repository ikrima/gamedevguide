import React from 'react';
import { Button, Menu, Dropdown, Icon } from 'antd';

function handleMenuClick(e) {
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Multiple Buttons</div>
      <div className="box-body">
        <Button type="primary">primary</Button>
        <Button>secondary</Button>
        <Dropdown overlay={menu}>
          <Button>
            Actions <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}

export default Box;