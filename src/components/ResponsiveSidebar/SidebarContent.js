import React, { Component } from 'react'
import { graphql, StaticQuery, Link } from "gatsby"
import { Tree } from 'antd'
import { connect } from "react-redux"
import { getSidebarState } from '../../store/selectors';
import { onSidebarContentExpand } from '../../actions/sidebar'
import 'antd/dist/antd.css'

const TreeNode = Tree.TreeNode

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
          const tree = convertToTree(data)
          const loop = data => data.map((item) => {
            if (item.children) {
              return (
                <TreeNode key={item.key} title={item.title}>
                  {loop(item.children)}
                </TreeNode>
              )
            }
            return (
              <TreeNode
                key={item.key} 
                title={<Link to={item.path} style={{color:'grey'}}>{item.title}</Link>}
                isLeaf
              />
            )
          })
          return (
            <div>
              <Tree
                defaultExpandAll
                showIcon={false}
              >
                {loop(tree)}
              </Tree>
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
  // onSidebarContentChange
}

export default connect(mapStateToProps, mapDispatchToProps) (SidebarContent)