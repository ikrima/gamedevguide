import React from 'react'
import { graphql } from 'gatsby'
// import { connect } from 'react-redux'
import _ from 'lodash'
import { PageHeader as AntdPageHeader } from 'antd'
import Layout from '../components/Layout'
// import { onSidebarContentExpand } from '../actions/layout'
// import { getSidebarExpandedKey } from '../store/selectors'
import 'katex/dist/katex.min.css'
import siteCfg from '../../SiteCfg'

import {
  prettifyPath,
  getBreadCrumbRootPrefix,
  safeGetWindowPath,
  safeGetRelWindowPathSlugs,
} from '../../gatsby/utils'

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

  const routes = safeGetRelWindowPathSlugs().map(item => ({
    path: item,
    breadcrumbName: prettifyPath(item),
  }))

  const curPageRoot = getBreadCrumbRootPrefix(
    safeGetWindowPath(),
    frontmatter ? frontmatter.root : null
  )

  return (
    <Layout sidebarRoot={curPageRoot}>
      <AntdPageHeader
        title={pageTitle + (_.isEmpty(frontmatter.pageSubTitle) ? '' : ':')}
        subTitle={frontmatter.pageSubTitle}
        breadcrumb={{ routes }}
      />
      <div className="guide-container" style={{ maxWidth: siteCfg.theme.guideContentMaxWidth }}>
        <div className="guide-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
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
