import React from 'react'
import { graphql } from 'gatsby'
// import { connect } from 'react-redux'
import _ from 'lodash'
import { PageHeader as AntdPageHeader } from 'antd'
import Layout from '../components/Layout'
// import { onSidebarContentExpand } from '../actions/layout'
// import { getSidebarExpandedKey } from '../store/selectors'
import 'katex/dist/katex.min.css'

function Template({
  data, // this prop will be injected by the GraphQL query below.
  // onSidebarContentExpand,
  // expandedKey,
}) {
  const {
    markdownRemark: {
      fields: { pageTitle },
      frontmatter,
      html,
      // id,
    },
  } = data

  // if (expandedKey !== id) {
  //  onSidebarContentExpand(id)
  // }

  return (
    <Layout sidebarRoot={frontmatter.root}>
      <div className="blog-post-container">
        <div className="blog-post">
          <AntdPageHeader
            title={pageTitle + (_.isEmpty(frontmatter.pageSubTitle) ? '' : ':')}
            subTitle={frontmatter.pageSubTitle}
          />
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </Layout>
  )
}

// const mapStateToProps = state => ({
//  expandedKey: getSidebarExpandedKey(state),
// })

// const mapDispatchToProps = {
//  onSidebarContentExpand,
// }

// export default connect(
//  mapStateToProps,
//  mapDispatchToProps
// )(Template)

export default Template

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
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
