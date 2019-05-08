import React, { useContext } from 'react'
import { Menu } from 'antd'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Context as SidebarContext } from '../../contexts/SidebarContext'

export default function SidebarMenu() {
  const { dispatch } = useContext(SidebarContext)
  const {
    menu: { items },
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
    }
  `)
  const links = []
  items.forEach(({ item }) => {
    links.unshift(
      <Menu.Item key={item.link}>
        <Link
          to={item.link}
          onClick={() => {
            dispatch({ type: 'closeSD' })
          }}
        >
          <span className="nav-text"> {item.name}</span>
        </Link>
      </Menu.Item>
    )
  })
  return (
    <Menu mode="inline" style={{ minHeight: '100vh' }} theme="light">
      {' '}
      <div className="py-3" />
      {links}
    </Menu>
  )
}
