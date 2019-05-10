import React, { useContext } from 'react';
import { Layout, Drawer } from 'antd';

import SidebarMenu from './SidebarMenu';
import { Context as SidebarContext } from '../../contexts/SidebarContext';
import SidebarToC from './SidebarToC';

const { Sider } = Layout;
const Sidebar = ({ className, showSidebar, sidebarToC, slug }) => {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) {
    return <div />;
  }

  const {
    dispatch,
    state: { drawer, toc, sidebar },
  } = useContext(SidebarContext);
  return (
    <div className={`app-sidenav-container ${className}`}>
      <Drawer
        closable
        visible={drawer}
        placement="left"
        className="d-md-none app-drawer"
        width={240}
        onClose={() => {
          dispatch({ type: 'closeSD' });
        }}
      >
        <Sider trigger={null} width={240} id="app-sidenav" className="app-sidenav">
          <div className="sidenav-content">
            <SidebarMenu />
          </div>
        </Sider>
      </Drawer>
      <Drawer
        closable
        visible={toc}
        placement="right"
        className="d-md-none app-drawer"
        width={240}
        onClose={() => {
          dispatch({ type: 'closeSD' });
        }}
      >
        <Sider trigger={null} width={240} id="app-sidenav" className="app-sidenav">
          <div className="sidenav-content">{sidebarToC && <SidebarToC slug={slug} />}</div>
        </Sider>
      </Drawer>

      <Sider
        collapsible
        collapsed={!sidebar}
        collapsedWidth={0}
        trigger={null}
        width={240}
        id="app-sidenav"
        className={`app-sidenav bg-light d-none ${!showSidebar ? 'd-md-none' : 'd-md-flex'}`}
      >
        <div
          className="sidenav-content"
          style={{
            overflow: 'auto',
            border: !sidebar ? 'none' : null,
            width: '240px',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          {sidebarToC && <SidebarToC slug={slug} />}
        </div>
      </Sider>
    </div>
  );
};
export default Sidebar;
