import React from 'react';
import DEMO from 'constants/demoData';
import { Menu, Icon } from 'antd';

const avatarDropdown = (
  <Menu className="app-header-dropdown">
    <Menu.Item key="4"> Signed in as <strong>{DEMO.user}</strong> </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="0"> <a href={DEMO.headerLink.profile}><Icon type="user" />Profile</a> </Menu.Item>
    <Menu.Item key="1" disabled> <Icon type="setting" />Settings </Menu.Item>
    <Menu.Item key="2"> <a href={DEMO.headerLink.help}><Icon type="question-circle-o" />Need Help?</a> </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3"> <a href={DEMO.headerLink.signOut}><Icon type="logout" />Sign out</a> </Menu.Item>
  </Menu>
);

export default avatarDropdown;
