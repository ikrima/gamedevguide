/* eslint-disable */

import React, { useContext } from 'react';
import { Menu } from 'antd';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Context as SidebarContext } from '../../contexts/SidebarContext';

const { SubMenu } = Menu;
export default function SidebarToC() {
  const {
    state: { openKeys },
    dispatch,
  } = useContext(SidebarContext);
  const {
    ToC: { items },
  } = useStaticQuery(graphql`
    query {
      ToC: guideToc(slugPart: { eq: "example" }) {
        slugPart
        items: childTOCs {
          slugPart
          prettyTitle
          items: childTOCs {
            slugPart
            prettyTitle
            items: childTOCs {
              slugPart
              prettyTitle
            }
          }
        }
      }
    }
  `);
  const isBrowser = typeof window !== 'undefined';
  function createToC(itms) {
    const createItem = ({ prettyTitle, slugPart }) => (
      <Menu.Item
        key={slugPart}
        className={isBrowser && window.location.pathname === slugPart && 'ant-menu-item-selected'}
      >
        <Link to={`${slugPart}`} onClick={() => dispatch({ type: 'closeSD' })}>
          <span className="nav-text"> {prettyTitle}</span>
        </Link>
      </Menu.Item>
    );

    return itms.map(item => {
      if (!item.items) {
        return createItem(item);
      }
      return (
        <SubMenu key={item.prettyTitle} title={item.prettyTitle}>
          {createToC(item.items)}
        </SubMenu>
      );
    });
  }

  return (
    <Menu
      mode="inline"
      style={{ minHeight: '100vh' }}
      onOpenChange={keys => {
        if (openKeys.includes(keys[0])) {
          dispatch({ type: 'openKeys', payload: [] });
        } else {
          dispatch({ type: 'openKeys', payload: [keys[0]] });
        }
      }}
      defaultOpenKeys={openKeys}
      theme="light"
    >
      {' '}
      <div className="py-3" />
      {createToC(items)}
    </Menu>
  );
}
