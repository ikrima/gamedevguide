import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { PageHeader as AntdPageHeader } from 'antd'
import MainLayout from '../components/main-layout'
// import { connect } from 'react-redux'
// import { onSidebarContentExpand } from '../actions/layout'
// import { getSidebarExpandedKey } from '../store/selectors'
import 'katex/dist/katex.min.css'
import siteCfg from '../../SiteCfg'

const _ = require('lodash')

function Template({
  data, // this prop will be injected by the GraphQL query below.
  // onSidebarContentExpand,
  // expandedKey,
}) {
  const {
    fields: { pageTitle },
    frontmatter,
    html,
  } = data.mdx ? data.mdx : data.markdownRemark

  let markdownHtml
  if (data.mdx) {
    markdownHtml = <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
  } else {
    markdownHtml = <div className="guide-content" dangerouslySetInnerHTML={{ __html: html }} />
  }

  return (
    <MainLayout>
      {/* <Layout sidebarRoot={curPageRoot}> */}
      <AntdPageHeader
        title={pageTitle + (_.isEmpty(frontmatter.pageSubTitle) ? '' : ':')}
        subTitle={frontmatter.pageSubTitle}
        // breadcrumb={{ routes }}
      />
      <div className="guide-container" style={{ maxWidth: siteCfg.theme.guideContentMaxWidth }}>
        {markdownHtml}
      </div>
      {/* </Layout> */}
    </MainLayout>
  )
}

export default Template

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      fields {
        slug
        pageTitle
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        pageSubTitle
        root
      }
      html
    }
    mdx(fields: { slug: { eq: $path } }) {
      fields {
        slug
        pageTitle
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        pageSubTitle
        root
      }
      code {
        body
      }
    }
  }
`
