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
  list.forEach(item => {
    if (item.parents === [] || item.parents === null) tree.push(item)
    else {
      let subtree = tree
      for (let i = 0; i < item.parents.length; i++) {
        if (subtree
          .filter(node => node.title === item.parents[i] && node.children)
          .length === 0) {
          subtree.push({
            key: "tree/" + item.parents[i],
            title: item.parents[i],
            children: []
          })
        }
        subtree = subtree.find(node => node.title === item.parents[i] && node.children).children
      }
      subtree.push(item)
    }
  })
  return tree
}

class SidebarContent extends Component {
  onExpand = (expendedKeys) => {
    this.props.onSidebarContentExpand(expendedKeys)
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
          const tree = convertToTree(data)
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
          return (
            <div>
              <Menu 
                mode="inline"
                defaultOpenKeys={tree.map(node => node.key)}
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