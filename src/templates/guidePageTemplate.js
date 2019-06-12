import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { PageHeader as AntdPageHeader } from 'antd';
import MainLayout from '../components/main-layout';
import 'katex/dist/katex.min.css';
import siteCfg from '../../SiteCfg';

import { prettifySlug, safeGetRelWindowPathSlugs } from '../../gatsby/utils';

function Template({
  data, // this prop will be injected by the GraphQL query below.
  // onSidebarContentExpand,
  // expandedKey,
}) {
  const {
    fields: { pageTitle },
    frontmatter,
    html,
  } = data.mdx ? data.mdx : data.markdownRemark;

  const routes = safeGetRelWindowPathSlugs().map(item => ({
    path: null,
    breadcrumbName: prettifySlug(item),
  }));

  // const curPageRoot = getBreadCrumbRootPrefix(safeGetRelWindowPath(), frontmatter)

  let markdownHtml;
  if (data.mdx) {
    markdownHtml = <MDXRenderer>{data.mdx.code.body}</MDXRenderer>;
  } else {
    markdownHtml = <div className="guide-content" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <MainLayout showSidebar showToC sidebarToC>
      {/* <Layout sidebarRoot={curPageRoot}> */}

      <AntdPageHeader
        title={pageTitle + (_.isEmpty(frontmatter.pageSubTitle) ? '' : ':')}
        subTitle={frontmatter.pageSubTitle}
        breadcrumb={{ routes }}
      />
      <div className="guide-container" style={{ maxWidth: siteCfg.theme.guideContentMaxWidth }}>
        {markdownHtml}
      </div>
      {/* </Layout> */}
    </MainLayout>
  );
}

export default Template;

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
`;
