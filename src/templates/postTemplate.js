import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout";
import { connect } from 'react-redux'
import { onSidebarContentExpand } from '../actions/layout'
import "katex/dist/katex.min.css"
import { getSidebarExpandedKey } from "../store/selectors";

function Template({
  data, // this prop will be injected by the GraphQL query below.
  onSidebarContentExpand,
  expandedKey,
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, id } = markdownRemark
  if (expandedKey !== id) {
    onSidebarContentExpand(id)
  }

  return (
    <Layout sidebarRoot={frontmatter.root}>
    <div className="blog-post-container">
      <div className="blog-post">
        {/* <h1>{frontmatter.title}</h1>
        <h5>{frontmatter.date}</h5> */}
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    expandedKey : getSidebarExpandedKey(state)
  }
}

const mapDispatchToProps = {
  onSidebarContentExpand,
}

export default connect(mapStateToProps, mapDispatchToProps) (Template)

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path} }) {
      fields {
        slug
      }
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        root
      }
    }
  }
`