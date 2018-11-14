import React from 'react'
import { graphql, StaticQuery, Link } from "gatsby"

const SidebarContent = () => (
  <StaticQuery
    query={graphql`
      query sidebarContentQuery {
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___path] }) {
          edges {
            node {
              id
              excerpt(pruneLength: 250)
              frontmatter {
                path
                title
                parents
              }
            }
          }
        }
      }
    `}
    render={data => {
      console.log(data)
      return (
        <div>
          {data.allMarkdownRemark.edges.map(edge => <div><Link to={edge.node.frontmatter.path}>{edge.node.frontmatter.title}</Link></div>)}
        </div>
      )
    }}
  />
)

export default SidebarContent 