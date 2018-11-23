import React, { Component } from 'react'
import { graphql, StaticQuery, Link } from "gatsby"
import { Menu } from 'antd'
import { connect } from "react-redux"
import { getSidebarState } from '../../store/selectors';
import { onSidebarContentExpand } from '../../actions/sidebar'
import 'antd/dist/antd.css'

const SubMenu = Menu.SubMenu

const convertToTree = (data) => {
  const list = data.allMarkdownRemark.edges
    .map(edge => {
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

class SidebarContent extends Component {
  onExpand = (expendedKeys) => {
    this.props.onSidebarContentExpand(expendedKeys)
  }

  render() {
    const { expandedKeys } = this.props.sidebar
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
          const [tree, dir] = convertToTree(data)
          const loop = data => data.map((item) => {
            if (item.children) {
              return (
                <SubMenu key={item.key} title={<span>{item.title}</span>}>
                  {loop(item.children)}
                </SubMenu>
              )
            }
            return (
              <Menu.Item key={item.key}>
                <Link to={item.path}>{item.title}</Link>
              </Menu.Item>
            )
          })
          const selectedKeys = data.allMarkdownRemark.edges
            .filter(item => window.location.pathname === item.node.fields.slug ||
              window.location.pathname+'/' === item.node.fields.slug)
            .length > 0 ? [expandedKeys] : []
          const defaultOpenKeys = dir.map(item => item.key)
          return (
            <div>
              <Menu 
                mode="inline"
                defaultOpenKeys={defaultOpenKeys}
                selectedKeys={selectedKeys}
              >
                {loop(tree)}
              </Menu>
            </div>
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
  onSidebarContentExpand,
}

export default connect(mapStateToProps, mapDispatchToProps) (SidebarContent)