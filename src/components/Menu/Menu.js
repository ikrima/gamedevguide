import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

import { Menu as AntdMenu } from 'antd'
import siteCfg from '../../../SiteCfg'
import { relFilePathToSlug } from '../../../gatsby/utils'

const Menu = ({ siteNavTitle }) => (
  <StaticQuery
    query={graphql`
      query {
        allMenuItems {
          edges {
            node {
              name
              link
            }
          }
        }
      }
    `}
    render={data => {
      const menuItems = data.allMenuItems.edges.map(edge => edge.node).reverse()
      return (
        <AntdMenu theme={siteCfg.theme.DarkVariant} mode="horizontal">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            {siteNavTitle}
          </Link>
          {menuItems.map(item => (
            <AntdMenu.Item key={menuItems.indexOf(item)}>
              <Link to={relFilePathToSlug(item.link)} style={{ textDecoration: 'none' }}>
                {item.name}
              </Link>
            </AntdMenu.Item>
          ))}
        </AntdMenu>
      )
    }}
  />
)

export default Menu
