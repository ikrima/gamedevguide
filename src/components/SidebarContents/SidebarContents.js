import React, { Component } from 'react'
import { graphql, StaticQuery, Link } from "gatsby"
import { connect } from "react-redux"
import { getSidebarState } from '../../store/selectors';
import { onSetSidebarOpen } from '../../actions/layout'
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import './SidebarContents.css'
import { pathPrefix } from '../../../gatsby-config'

const SubMenu = Menu.SubMenu

const convertToTree = (data) => {
  const list = data.map(edge => {
      return ({
        path: edge.node.fields.slug,
        key: edge.node.id,
        title: edge.node.frontmatter.title,
        parents: edge.node.frontmatter.parents
      })
    })
  return constructTree(list)
}

const constructTree = (list) => {
  let tree = []
  let dir = []
  list.forEach(item => {
    if (item.parents === [] || item.parents === null) tree.push(item)
    else {
      let subtree = tree
      for (let i = 0; i < item.parents.length; i++) {
        if (subtree
          .filter(node => node.title === item.parents[i] && node.children)
          .length === 0) {
          const newNode = {
            key: "tree/" + item.parents[i],
            title: item.parents[i],
            children: []
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
  tree.sort((a,b)=> {
    if (((a.children && b.children) || 
    (!a.children && !b.children)) &&
    a.title > b.title) return 1
    else if (a.children) return 1
    return -1
  })
}

class SidebarContents extends Component {
  onSetSidebarOpen = () => {
    this.props.onSetSidebarOpen(false)
  }

  render() {
    const { expandedKey } = this.props.sidebar
    const { root } = this.props
    return (
      <StaticQuery
        query={graphql`
          query sidebarContentQuery {
            allMarkdownRemark(sort: { order: ASC, fields: [fields___slug] }) {
              edges {
                node {
                  fields {
                    slug
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
          const [tree, dir] = convertToTree(data.allMarkdownRemark.edges.filter(node => 
            node.node.fields.slug.startsWith(root)
          ))
          sortTree(tree)
          const loop = data => data.map((item) => {
            if (item.children) {
              sortTree(item.children)
              return (
                <SubMenu key={item.key} title={<span style={{fontWeight:900}}>{item.title}</span>}>
                  {loop(item.children)}
                </SubMenu>
              )
            }
            return (
              <Menu.Item key={item.key}>
                <Link to={item.path} onClick={this.onSetSidebarOpen}>{item.title}</Link>
              </Menu.Item>
            )
          })
          const path = window.location.pathname.replace(pathPrefix.slice(0,-1),"")
          const selectedKeys = data.allMarkdownRemark.edges
            .filter(item => path === item.node.fields.slug ||
              (path.slice(0,-1) === item.node.fields.slug && path.slice(-1) === '/'))
            .length > 0 ? [expandedKey] : []
          const defaultOpenKeys = dir.map(item => item.key)
          return (
              <Menu 
                mode="inline"
                defaultOpenKeys={defaultOpenKeys}
                selectedKeys={selectedKeys}
                inlineIndent={12}
              >
                {loop(tree)}
              </Menu>
          )
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sidebar: getSidebarState(state)
  }
}

const mapDispatchToProps = {
  onSetSidebarOpen
}

export default connect(mapStateToProps, mapDispatchToProps) (SidebarContents)