import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

import { Menu as AntdMenu, Icon as AntdIcon } from 'antd'
import siteCfg from '../../../SiteCfg'
import { relFilePathToSlug } from '../../../gatsby/utils'
import Search from '../Search'

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
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => {
      const menuItems = data.allMenuItems.edges.map(edge => edge.node).reverse()
      return (
        <AntdMenu theme={siteCfg.theme.DarkVariant} mode="horizontal">
          <AntdMenu.Item>
            <Link to="/">{siteNavTitle}</Link>
          </AntdMenu.Item>
          <AntdMenu.Item>
            <a href={siteCfg.repoURL}>
              <AntdIcon type="github" />
            </a>
          </AntdMenu.Item>
          <AntdMenu.Item>
            <a href={siteCfg.twitterURL}>
              <AntdIcon type="twitter" />
            </a>
          </AntdMenu.Item>
          <AntdMenu.Item>
            <Search searchIndex={data.siteSearchIndex.index} />
          </AntdMenu.Item>
          {menuItems.map(item => (
            <AntdMenu.Item key={menuItems.indexOf(item)}>
              <Link to={relFilePathToSlug(item.link)}>{item.name}</Link>
            </AntdMenu.Item>
          ))}
        </AntdMenu>
      )
    }}
  />
)

export default Menu
