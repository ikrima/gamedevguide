import React from 'react';
import { Layout, Dropdown, Menu, Icon, Avatar, Badge, Popover } from 'antd';
import DEMO from 'constants/demoData';
import Notifications from './Notifications';
import avatarDropdown from './avatarDropdown';
const { Header } = Layout;

const exampleDropdown = (
  <Menu className="app-header-dropdown">
    <Menu.Item key="0"> <a href={DEMO.headerLink.profile}><Icon type="user" /> Example Item 1</a> </Menu.Item>
    <Menu.Item key="1" disabled> <Icon type="setting" />Example Item 2 </Menu.Item>
    <Menu.Item key="2"> <a href={DEMO.headerLink.help}><Icon type="question-circle-o" />Example Item 3</a> </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3"> <a href={DEMO.headerLink.signOut}><Icon type="logout" />Example Item 4</a> </Menu.Item>
  </Menu>
)

const Section = () => {
  return(
    <Header className="app-header">
      <div className="app-header-inner bg-white">
        <div className="header-left">
          <div className="list-unstyled list-inline">
            <a href={DEMO.link} className="list-inline-item"> <Icon type="menu-fold" className="list-icon-v2" /> </a>
            <Dropdown className="list-inline-item" overlay={exampleDropdown} trigger={['click']} placement="bottomRight">
              <a className="ant-dropdown-link no-link-style" href={DEMO.link}>
                Dropdown Menu <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </div>

        <div className="header-right">
          <div className="list-unstyled list-inline">

            <li className="list-inline-item search-box seach-box-right">
              <div className="search-box-inner">
                <div className="search-box-icon"><Icon type="search" /></div>
                <input type="text" placeholder="search..." />
                <span className="input-bar"></span>
              </div>
            </li>
            <Dropdown className="list-inline-item" overlay={exampleDropdown} trigger={['click']} placement="bottomRight">
              <a className="ant-dropdown-link no-link-style" href={DEMO.link}>
                Dropdown Menu <Icon type="down" />
              </a>
            </Dropdown>
            <Popover placement="bottomRight" content={<Notifications />} trigger="click" overlayClassName="app-header-popover">
              <a href={DEMO.link} className="list-inline-item"><Badge count={11}><Icon type="bell" className="list-notification-icon" /></Badge></a>
            </Popover>
            <Dropdown className="list-inline-item" overlay={avatarDropdown} trigger={['click']} placement="bottomRight">
              <a className="ant-dropdown-link no-link-style" href={DEMO.link}>
                <Avatar src="assets/images-demo/avatars/4.jpg" size="small" />
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default Section;
