import React from 'react'
import { graphql, StaticQuery } from "gatsby"
import { Tree } from 'element-react'

import 'element-theme-default'

const convertToTree = (data) => {
  const list = data.allMarkdownRemark.edges
    .map(edge => {
      return ({
        path: edge.node.fields.slug,
        id: edge.node.id,
        label: edge.node.frontmatter.title,
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
          .filter(node => node.label === item.parents[i] && node.children)
          .length === 0) 
        {
          subtree.push({
            id: "tree/"+item.parents[i],
            label: item.parents[i],
            children: []
          })
        }
        subtree = subtree.find(node => node.label === item.parents[i] && node.children).children
      }
      subtree.push(item)
    }
  })
  return tree
}

const SidebarContent = () => (
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
      return (
        <div>
          <Tree 
            data={tree}
            option={{children:'children', label:'label'}}
            highlightCurrent={true}
            defaultExpandAll={true}
            onNodeClicked={(data, reactElement,)=>{
              console.debug('onNodeClicked: ', data, reactElement)
              if (data.path) window.location.href = data.path
            }}
          />
          {/* {data.allMarkdownRemark.edges.map(edge => <div><Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link></div>)} */}
        </div>
      )
    }}
  />
)

export default SidebarContent 