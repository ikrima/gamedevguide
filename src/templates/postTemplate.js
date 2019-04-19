import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout";
import { connect } from 'react-redux'
import { onSidebarContentExpand } from '../actions/layout'
import "katex/dist/katex.min.css"
import { getSidebarExpandedKey } from "../store/selectors";
import {PageHeader as AntdPageHeader} from "antd"
import _ from "lodash"

function Template({
  data, // this prop will be injected by the GraphQL query below.
  onSidebarContentExpand,
  expandedKey,
}) {
  const { markdownRemark: {fields:{pageTitle}, frontmatter, html, id }} = data

  if (expandedKey !== id) {
    onSidebarContentExpand(id)
  }

  return (
    <Layout sidebarRoot={frontmatter.root}>
      <div className="blog-post-container">
        <div className="blog-post">
          <AntdPageHeader title={pageTitle + (_.isEmpty(frontmatter.pageSubTitle) ? "" : ":")} subTitle={frontmatter.pageSubTitle} />
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
        pageTitle
      }
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        pageSubTitle
        root
      }
    }
  }
`