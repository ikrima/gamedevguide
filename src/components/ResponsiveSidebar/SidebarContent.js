import React from 'react'
import { graphql, StaticQuery, Link } from "gatsby"

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
              excerpt(pruneLength: 250)
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
      console.log(data)
      return (
        <div>
          {data.allMarkdownRemark.edges.map(edge => <div><Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link></div>)}
        </div>
      )
    }}
  />
)

export default SidebarContent 