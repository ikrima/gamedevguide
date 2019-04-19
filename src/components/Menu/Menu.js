import React, { Component } from "react"
import { Link, graphql, StaticQuery } from 'gatsby'

import { Menu as AntdMenu } from 'antd'
import siteCfg from "../../../SiteCfg"
import { sanitizePath } from "../../../gatsby/utils"

class Menu extends Component {
  render() {
    const { siteNavTitle } = this.props

    return (
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
            <AntdMenu
              theme={siteCfg.theme.DarkVariant}
              mode="horizontal"
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                {siteNavTitle}
              </Link>
              {menuItems.map(item => {
                return (
                  <AntdMenu.Item key={menuItems.indexOf(item)}>
                    <Link
                      to={sanitizePath(item.link)}
                      style={{ textDecoration: "none" }}
                    >
                      {item.name}
                    </Link>
                  </AntdMenu.Item>
                )
              })}
            </AntdMenu>
          )
        }}
      />
    )
  }
}

export default Menu