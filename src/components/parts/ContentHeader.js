/* eslint-disable */
import React, { useContext } from 'react';
import { Layout, Icon } from 'antd';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Context } from '../../contexts/SidebarContext';
import Search from './Search';
import MenuComponent from './Menu';

const { Header } = Layout;

export default function ContentHeader({ showSidebarBtn, showToC }) {
  const {
    state: { sidebar, toc },
    dispatch,
  } = useContext(Context);

  return (
    <Header className="app-header bg-dark" style={{ padding: '0 20px' }}>
      <div className="app-header-inner  bg-dark d-flex justify-content-between ">
        <div className="header-left">
          <div className="list-unstyled list-inline ">
            <span
              className="list-inline-item d-none d-md-inline-block"
              style={{ cursor: 'pointer' }}
            >
              {showSidebarBtn && !sidebar && (
                <Icon
                  style={{ color: '#fff' }}
                  type="menu-fold"
                  onClick={() => {
                    dispatch({ type: 'toggleSidebar' });
                  }}
                />
              )}

              {showSidebarBtn && sidebar && (
                <Icon
                  style={{ color: '#fff' }}
                  type="menu-unfold"
                  onClick={() => {
                    dispatch({ type: 'toggleSidebar' });
                  }}
                />
              )}
            </span>
            <span
              className="list-inline-item d-inline-block d-md-none"
              style={{ cursor: 'pointer' }}
            >
              {showToC && !sidebar && (
                <Icon
                  style={{ color: '#fff' }}
                  type="menu-fold"
                  onClick={() => {
                    dispatch({ type: 'toggleDrawer' });
                  }}
                />
              )}
              {showToC && sidebar && (
                <Icon
                  style={{ color: '#fff' }}
                  type="menu-unfold"
                  onClick={() => {
                    dispatch({ type: 'toggleDrawer' });
                  }}
                />
              )}
            </span>
            <Link
              className={`list-inline-item  d-inline-block ${showSidebarBtn}` ? 'ml-0' : null}
              to="/"
            >
              K&L GameDev Guide
            </Link>
            {/* */}
            <MenuComponent />
          </div>
        </div>

        <div className="header-right">
          <Search />

          {/* <MenuComponent mobile /> */}
        </div>
      </div>
    </Header>
  );
}
