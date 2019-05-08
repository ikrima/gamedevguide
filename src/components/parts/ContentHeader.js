import React, { useContext } from 'react'
import { Layout, Icon } from 'antd'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Context } from '../../contexts/SidebarContext'
import Search from './Search'

const { Header } = Layout

export default function ContentHeader({ showSidebarBtn, showToC }) {
  const {
    state: { sidebar, toc },
    dispatch,
  } = useContext(Context)

  const {
    menu: { items },
    search: { searchIndex },
  } = useStaticQuery(graphql`
    query {
      menu: allMenuItems {
        items: edges {
          item: node {
            name
            link
          }
        }
      }
      search: siteSearchIndex {
        searchIndex: index
      }
    }
  `)
  const links = []
  items.forEach(({ item }) => {
    links.unshift(
      <Link key={item.link} className="list-inline-item d-none d-md-inline-block" to={item.link}>
        <span className="nav-text"> {item.name}</span>
      </Link>
    )
  })
  return (
    <Header className="app-header bg-dark" style={{ padding: '0 20px' }}>
      <div className="app-header-inner  bg-dark">
        <div className="header-left">
          <div className="list-unstyled list-inline">
            <span
              className="list-inline-item d-none d-md-inline-block"
              style={{ cursor: 'pointer' }}
            >
              {showSidebarBtn && !sidebar && (
                <Icon
                  type="menu-fold"
                  onClick={() => {
                    dispatch({ type: 'toggleSidebar' })
                  }}
                />
              )}
              {showSidebarBtn && sidebar && (
                <Icon
                  type="menu-unfold"
                  onClick={() => {
                    dispatch({ type: 'toggleSidebar' })
                  }}
                />
              )}
            </span>
            <span
              className="list-inline-item d-inline-block d-md-none"
              style={{ cursor: 'pointer' }}
            >
              {!sidebar && (
                <Icon
                  type="menu-fold"
                  onClick={() => {
                    dispatch({ type: 'toggleDrawer' })
                  }}
                />
              )}
              {sidebar && (
                <Icon
                  type="menu-unfold"
                  onClick={() => {
                    dispatch({ type: 'toggleDrawer' })
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
            <Link className="list-inline-item d-none d-md-inline-block" to="/">
              <Icon type="github" />{' '}
            </Link>
            <Link className="list-inline-item d-none d-md-inline-block" to="/">
              <Icon type="twitter" />{' '}
            </Link>
            {links}
          </div>
        </div>
        <div className="header-right">
          <Search searchIndex={searchIndex} />
          {showToC && (
            <span
              className="list-inline-item d-inline-block d-md-none"
              style={{ cursor: 'pointer' }}
            >
              {!toc && (
                <Icon
                  type="menu-unfold"
                  onClick={() => {
                    dispatch({ type: 'toggleToc' })
                  }}
                />
              )}
            </span>
          )}
        </div>
      </div>
    </Header>
  )
}
