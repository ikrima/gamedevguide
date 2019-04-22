import React, { Component } from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
// import { connect } from 'react-redux'
import { Layout as AntdLayout, Menu as AntdMenu } from 'antd'
// import { getSidebarState } from '../../store/selectors'
// import { onSetSidebarOpen } from '../../actions/layout'
import siteCfg from '../../../SiteCfg'

import { toRelativePathSlugs, prettifyPath, safeGetWindowPath } from '../../../gatsby/utils'

const { Sider: AntdSider } = AntdLayout
const AntdSubMenu = AntdMenu.SubMenu

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

const convertToTree = data => {
  const list = data.map(edge => {
    const pathSlugs = toRelativePathSlugs(edge.node.fields.slug)
    const parentSlugs = pathSlugs.slice(1, pathSlugs.length - 1)
    const curTitle = edge.node.fields.sideMenuHeading

    return {
      path: edge.node.fields.slug,
      key: edge.node.id,
      title: curTitle,
      parents: parentSlugs,
    }
  })

  return constructTree(list)
}

const sortTree = tree => {
  tree.sort((a, b) => {
    if (((a.children && b.children) || (!a.children && !b.children)) && a.title > b.title) return 1
    if (a.children) return 1
    return -1
  })
}

class SidebarContents extends Component {
  state = {
    collapsed: false,
  }

  onCollapse = (collapsed, type) => {
    console.log(collapsed, type)
    this.setState({ collapsed })
  }

  onBreakpoint = broken => {
    console.log(broken)
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query sidebarContentQuery {
            allMarkdownRemark(sort: { order: ASC, fields: [fields___slug] }) {
              edges {
                node {
                  fields {
                    slug
                    pageTitle
                    sideMenuHeading
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
          const { sidebarRoot } = this.props

          const [tree, dir] = convertToTree(
            data.allMarkdownRemark.edges.filter(node =>
              node.node.fields.slug.startsWith(sidebarRoot)
            )
          )

          sortTree(tree)
          const loop = inTree =>
            inTree.map(item => {
              if (item.children) {
                sortTree(item.children)
                return (
                  <AntdSubMenu
                    key={item.key}
                    title={<span style={{ fontWeight: 900 }}>{prettifyPath(item.title)}</span>}
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

          const selectedKeys = [safeGetWindowPath()]
          const defaultOpenKeys = dir.map(item => item.key)
          return (
            <AntdSider
              theme={siteCfg.theme.LightVariant}
              collapsible
              // eslint-disable-next-line react/destructuring-assignment
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              trigger={null}
              breakpoint={siteCfg.theme.breakpoint}
              collapsedWidth="0"
              onBreakpoint={this.onBreakpoint}
              width={siteCfg.theme.sidebarMenuWidth}
              style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
            >
              <AntdMenu
                mode="inline"
                defaultOpenKeys={defaultOpenKeys}
                selectedKeys={selectedKeys}
                inlineIndent={siteCfg.theme.sidebarIndent}
                theme={siteCfg.theme.LightVariant}
              >
                {loop(tree)}
              </AntdMenu>
            </AntdSider>
          )
        }}
      />
    )
  }
}

// const mapStateToProps = state => ({
//   isSidebarOpen: getSidebarState(state),
// })

// const mapDispatchToProps = {
//   onSetSidebarOpen,
// }

// const SidebarContentsInternal = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SidebarContents)

// const ResponsiveSidebar = ({ headerHeight, sidebarRoot }) => (
//  <div
//    style={{
//      height: '100vh',
//      position: 'fixed',
//      top: headerHeight,
//      left: 0,
//      right: '80%',
//      bottom: 0,
//      overflow: 'hidden',
//    }}
//  >
//    <div
//      style={{
//        position: 'absolute',
//        left: 0,
//        right: 0,
//        top: 0,
//        bottom: 0,
//      }}
//    >
//      <SidebarContentsInternal sidebarRoot={sidebarRoot} />
//    </div>
//  </div>
// )
//
// const mapStateToProps2 = state => ({
//  headerHeight: getHeaderHeightState(state),
// })
//
// export default connect(mapStateToProps2)(ResponsiveSidebar)

export default SidebarContents
