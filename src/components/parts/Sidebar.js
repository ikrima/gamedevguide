import React, { useContext, useRef, useEffect } from 'react';
import { Layout, Drawer } from 'antd';

import SidebarMenu from './SidebarMenu';
import { Context as SidebarContext } from '../../contexts/SidebarContext';
import SidebarToC from './SidebarToC';

const { Sider } = Layout;
const Sidebar = ({ className, showSidebar, sidebarToC, slug }) => {
  const {
    dispatch,
    state: { drawer, toc, sidebar, scrollTop, guide },
  } = useContext(SidebarContext);
  const sidenavRef = useRef(null);

  useEffect(() => {
    const g = typeof window !== 'undefined' && window.location.pathname.split('/')[1];
    if (g !== guide) {
      dispatch({ type: 'setGuide', payload: g });

      dispatch({ type: 'openKeys', payload: [] });
    } else {
      sidenavRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

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
            <Sider trigger={null} width={240} id="app-sidenav" className="app-sidenav">
              <div className="sidenav-content">{sidebarToC && <SidebarToC slug={slug} />}</div>
            </Sider>
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
          <SidebarMenu />
        </Sider>
      </Drawer>

      <Sider
        collapsible
        collapsed={!sidebar}
        collapsedWidth={0}
        trigger={null}
        width={300}
        id="app-sidenav"
        className={`app-sidenav bg-dark d-none ${!showSidebar ? 'd-md-none' : 'd-md-flex'}`}
      >
        <div
          className="sidenav-content"
          style={{
            overflow: 'auto',
            border: !sidebar ? 'none' : null,
            width: '300px',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
          ref={sidenavRef}
          onScroll={e => dispatch({ type: 'scrollTop', payload: e.target.scrollTop })}
        >
          {sidebarToC && <SidebarToC slug={slug} />}
        </div>
      </Sider>
    </div>
  );
};
export default Sidebar;
