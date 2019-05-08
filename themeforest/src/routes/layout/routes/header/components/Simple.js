import React from 'react';
import { Layout, Dropdown, Icon, Avatar, Badge, Popover } from 'antd';
import DEMO from 'constants/demoData';
import Notifications from './Notifications';
import avatarDropdown from './avatarDropdown';
const { Header } = Layout;

const Section = () => {
  return(
    <Header className="app-header">
      <div className="app-header-inner bg-white">
        <div className="header-left">
          <div className="list-unstyled list-inline">
            <a href={DEMO.link} className="list-inline-item"> <Icon type="menu-fold" className="list-icon" /> </a>
            <li className="list-inline-item search-box">
              <div className="search-box-inner">
                <div className="search-box-icon"><Icon type="search" /></div>
                <input type="text" placeholder="search..." />
                <span className="input-bar"></span>
              </div>
            </li>
          </div>
        </div>

        <div className="header-right">
          <div className="list-unstyled list-inline">
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
