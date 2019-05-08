import React from 'react';
import { Menu, Dropdown, Button, Icon, message } from 'antd';

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3d menu item</Menu.Item>
  </Menu>
);


const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Button with dropdown menu</div>
      <div className="box-body">
        <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
          Dropdown
        </Dropdown.Button>
        <Dropdown.Button
          onClick={handleButtonClick} overlay={menu}
          disabled
          style={{ marginLeft: 8 }}
        >
          Dropdown
        </Dropdown.Button>
        <Dropdown overlay={menu}>
          <Button style={{ marginLeft: 8 }}>
            Button <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}

export default Box;