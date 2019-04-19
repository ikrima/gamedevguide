import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
// import { connect } from "react-redux"
// import { getSidebarState } from "../../store/selectors"
// import { onSetSidebarOpen } from "../../actions/layout"
import { Menu as AntdMenu } from 'antd'
// import './SidebarContents.css'
// import { pathPrefix } from "../../../gatsby-config"
import siteCfg from '../../../SiteCfg'
// import _ from "lodash"

import {
  toRelativeSitePath,
  prettifyPath,
  getBreadCrumbRootPrefix,
  safeGetWindowPath,
} from '../../../gatsby/utils'

const AntdSubMenu = AntdMenu.SubMenu

const convertToTree = data => {
  const list = data.map(edge => {
    const pathSlugs = toRelativeSitePath(edge.node.fields.slug).split('/')
    const parentSlugs = pathSlugs.slice(1, pathSlugs.length - 1).map(prettifyPath)
    const curTitle = edge.node.fields.pageTitle
    // const curTitle = pathSlugs[pathSlugs.length - 1]
    // const parentSlugs = edge.node.frontmatter.parents
    // const curTitle = edge.node.frontmatter.title

    return {
      path: edge.node.fields.slug,
      key: edge.node.id,
      title: curTitle,
      parents: parentSlugs,
    }
  })
  return constructTree(list)
}

const constructTree = list => {
  const tree = []
  const dir = []
  list.forEach(item => {
    if (item.parents === [] || item.parents === null) tree.push(item)
    else {
      let subtree = tree
      for (let i = 0; i < item.parents.length; i += 1) {
        if (subtree.filter(node => node.title === item.parents[i] && node.children).length === 0) {
          const newNode = {
            key: `tree/${item.parents[i]}`,
            title: item.parents[i],
            children: [],
          }
          subtree.push(newNode)
          dir.push(newNode)
        }
        subtree = subtree.find(node => node.title === item.parents[i] && node.children).children
      }
      subtree.push(item)
    }
  })
  return [tree, dir]
}

const sortTree = tree => {
  tree.sort((a, b) => {
    if (((a.children && b.children) || (!a.children && !b.children)) && a.title > b.title) return 1
    if (a.children) return 1
    return -1
  })
}

const SidebarContents = () => (
  <StaticQuery
    query={graphql`
      query sidebarContentQuery {
        allMarkdownRemark(sort: { order: ASC, fields: [fields___slug] }) {
          edges {
            node {
              fields {
                slug
                pageTitle
              }
              id
              frontmatter {
                title
                parents
              }
            }
          }
        }
      }
    `}
    render={data => {
      const curPageRoot = getBreadCrumbRootPrefix(safeGetWindowPath())

      const [tree, dir] = convertToTree(
        data.allMarkdownRemark.edges.filter(node => node.node.fields.slug.startsWith(curPageRoot))
      )
      sortTree(tree)
      const loop = inTree =>
        inTree.map(item => {
          if (item.children) {
            sortTree(item.children)
            return (
              <AntdSubMenu
                key={item.key}
                title={<span style={{ fontWeight: 900 }}>{item.title}</span>}
              >
                {loop(item.children)}
              </AntdSubMenu>
            )
          }
          return (
            <AntdMenu.Item key={item.path}>
              <Link to={item.path}>
                <div>{item.title}</div>
              </Link>
            </AntdMenu.Item>
          )
        })
      // const path = safeGetWindowPath().replace(
      //  pathPrefix.endsWith("/") ? pathPrefix.slice(0, -1) : pathPrefix,
      //  ""
      // )
      // const selectedKeys =
      //  data.allMarkdownRemark.edges.filter(
      //    item =>
      //      path === item.node.fields.slug ||
      //      (path.slice(0, -1) === item.node.fields.slug && path.slice(-1) === "/")
      //  ).length > 0
      //    ? [expandedKey]
      //    : []
      const selectedKeys = [safeGetWindowPath()]
      const defaultOpenKeys = dir.map(item => item.key)
      return (
        <AntdMenu
          mode="inline"
          style={{ minWidth: 180, height: '100%', borderRight: 0 }}
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={selectedKeys}
          inlineIndent={12}
          theme={siteCfg.theme.LightVariant}
        >
          {loop(tree)}
        </AntdMenu>
      )
    }}
  />
)

// const mapStateToProps = state => {
//   return {
//     sidebar: getSidebarState(state),
//   }
// }

// const mapDispatchToProps = {
//   onSetSidebarOpen,
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SidebarContents)

export default SidebarContents
