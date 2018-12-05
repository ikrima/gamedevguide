import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/Layout'
import PostLink from '../components/PostLink';
import { setPostPageOff } from '../actions/sidebar'
import { connect } from 'react-redux'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
  setPostPageOff
}) => {
  setPostPageOff()
  const posts = edges
    .filter(edge => !! edge.node.frontmatter.date)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
  return (
    <Layout>
      <div>{posts}</div>
    </Layout>
  )
}

const mapDispatchToProps = {
  setPostPageOff,
}

export default connect(()=>({}), mapDispatchToProps) (IndexPage)

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields {
            slug
          }
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`