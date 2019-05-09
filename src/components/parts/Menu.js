import React, { useContext } from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Context } from '../../contexts/SidebarContext'

function MenuComponent({ inline }) {
  const {
    menu: { items },
  } = useStaticQuery(graphql`
    query {
      menu: allMenuItems {
        items: nodes {
          name
          link
        }
      }
    }
  `)
  const {
    state: { sidebar, toc },
    dispatch,
  } = useContext(Context)

  const Component = (
    <>
      <div className="d-none d-lg-inline-flex flex-grow  justify-content-around ml-sm-5 mr-5">
        <div className="">
          <Link className="list-inline-item d-none d-lg-inline-block" to="/">
            <Icon type="github" />{' '}
          </Link>
        </div>
        <div className="">
          <Link className="list-inline-item d-none d-lg-inline-block" to="/">
            <Icon type="twitter" />{' '}
          </Link>
        </div>
        {items.map(item => (
          <div className="mx-2" key={item.link}>
            <Link to={item.link}>{item.name}</Link>
          </div>
        ))}
      </div>

      <Dropdown
        overlay={
          <Menu>
            <Menu.Item className="d-sm-none">
              <Link to="/search">
                <Icon type="search" /> Search
              </Link>
            </Menu.Item>

            {items.map(item => (
              <Menu.Item
                key={item.link}
                className={
                  typeof window !== 'undefined' &&
                  window.location.pathname === item.link &&
                  'ant-menu-item-selected'
                }
              >
                <Link to={item.link}>{item.name}</Link>
              </Menu.Item>
            ))}
            <Menu.Item>
              <Link to="/">
                <Icon type="github" />{' '}
              </Link>
            </Menu.Item>
            <Menu.Item c>
              <Link to="/">
                <Icon type="twitter" />{' '}
              </Link>
            </Menu.Item>
          </Menu>
        }
        trigger={['click']}
      >
        <a className="ant-dropdown-link ml-3 d-lg-none" href="/">
          <Icon type="ellipsis" />
        </a>
      </Dropdown>
    </>
  )

  return Component
}

export default MenuComponent
