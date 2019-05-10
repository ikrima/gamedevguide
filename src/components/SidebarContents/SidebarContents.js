/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
// import { connect } from 'react-redux'
import { Layout as AntdLayout, Menu as AntdMenu } from 'antd';
// import { getSidebarState } from '../../store/selectors'
// import { onSetSidebarOpen } from '../../actions/layout'
import _ from 'lodash';
import siteCfg from '../../../SiteCfg';
import { allGuideTOCs } from '../../../SiteCfg/json/GuideTOC';

import { separateSlugs, prettifySlug, safeGetRelWindowPath } from '../../../gatsby/utils';

const { Sider: AntdSider } = AntdLayout;
const AntdSubMenu = AntdMenu.SubMenu;

class SidebarContents extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed /* , type */) => {
    this.setState({ collapsed });
  };

  // onBreakpoint = broken => {
  //   console.log(broken)
  // }

  filterHeadingsTocMV = inTOCModelView => {
    const retTree = {};
    const filterHeadings = (curRetRoot, tocTree) => {
      // eslint-disable-next-line no-param-reassign
      curRetRoot.slugPart = tocTree.slugPart;
      // eslint-disable-next-line no-param-reassign
      curRetRoot.slugPrefix = tocTree.slugPrefix;

      if (tocTree.childTOCs) {
        // eslint-disable-next-line no-param-reassign
        curRetRoot.childTOCs = tocTree.childTOCs.map(childTocTree => filterHeadings(childTocTree));
      }
      return curRetRoot;
    };

    filterHeadings(retTree, inTOCModelView);
    return retTree;
  };

  getHeadingSlugPrefixes = (inTOCModelView, maxDepth = 2) => {
    const _getSlugPrefixes = (curDepth, tocNode) =>
      tocNode.childTOCs && curDepth < maxDepth
        ? [tocNode.slugPrefix].concat(
            _.flatMap(tocNode.childTOCs, o => _getSlugPrefixes(curDepth + 1, o))
          )
        : [tocNode.slugPrefix];
    return _getSlugPrefixes(0, inTOCModelView);
  };

  createTOCModelView = inMarkdownNodes => {
    const tocModelView = _.cloneDeep(allGuideTOCs);

    // Add Model View bits
    {
      inMarkdownNodes.forEach(node => {
        const pathSlugParts = separateSlugs(node.fields.slug);
        const parentSlugParts = _.tail(pathSlugParts);
        const curTitle = node.fields.sideMenuHeading;

        const leafTOCNode = parentSlugParts.reduce((leafmostTOC, nextSlugPart) => {
          const foundChildTOC = _.find(leafmostTOC.childTOCs, o => o.slugPart === nextSlugPart);
          return foundChildTOC || leafmostTOC;
        }, tocModelView);

        // eslint-disable-next-line no-prototype-builtins
        if (!leafTOCNode.hasOwnProperty('childPages')) {
          leafTOCNode.childPages = [];
        }

        leafTOCNode.childPages.push({
          sortIndex:
            node.frontmatter.sortIndex === null || node.frontmatter.sortIndex === undefined
              ? siteCfg.defaultSortIndex
              : node.frontmatter.sortIndex,
          slug: node.fields.slug,
          nodeId: node.id,
          title: curTitle,
          parents: parentSlugParts,
        });
        return null;
      });

      const injectFullSlugPath = (TocSubTree, SlugPrefix) => {
        // eslint-disable-next-line no-param-reassign
        TocSubTree.slugPrefix = `${SlugPrefix}/${TocSubTree.slugPart}`;
        _.forEach(TocSubTree.childTOCs, childTOCTree => {
          injectFullSlugPath(childTOCTree, TocSubTree.slugPrefix);
        });
      };
      injectFullSlugPath(tocModelView, '');
    }

    // Sort
    {
      function sortTOCSubTree(tocNode) {
        if (!tocNode.childPages) {
          // eslint-disable-next-line no-param-reassign
          tocNode.childPages = [];
        }
        // eslint-disable-next-line no-param-reassign
        tocNode.childPages = _.sortBy(tocNode.childPages, ['sortIndex', 'slug']);

        if (tocNode.childTOCs) {
          tocNode.childTOCs.map(sortTOCSubTree);
        }
      }

      sortTOCSubTree(tocModelView);
    }

    return tocModelView;
  };

  render() {
    return (
      <StaticQuery
        query={graphql`
          query sidebarContentQuery {
            guides: allFile(
              filter: { ext: { in: [".md", ".mdx"] }, sourceInstanceName: { eq: "guides" } }
              sort: { order: ASC, fields: [fields___slug] }
            ) {
              edges {
                node {
                  childMdx {
                    fields {
                      slug
                      pageTitle
                      sideMenuHeading
                    }
                    id
                    frontmatter {
                      title
                      parents
                      sortIndex
                    }
                  }
                  childMarkdownRemark {
                    fields {
                      slug
                      pageTitle
                      sideMenuHeading
                    }
                    id
                    frontmatter {
                      title
                      parents
                      sortIndex
                    }
                  }
                }
              }
            }
          }
        `}
        render={({ guides }) => {
          const { sidebarRoot } = this.props;
          const mdNodes = guides.edges
            .map(({ node }) => (node.childMdx ? node.childMdx : node.childMarkdownRemark))
            .filter(node => node.fields.slug.startsWith(sidebarRoot));

          function createTOCNodes(tocTree) {
            const childSubTreeNodes = tocTree.childTOCs
              ? tocTree.childTOCs.map(tocSubTree => (
                  <AntdSubMenu
                    key={tocSubTree.slugPrefix}
                    title={
                      <span style={{ fontWeight: 900 }}>
                        {tocSubTree.prettyTitle || prettifySlug(tocSubTree.slugPart)}
                      </span>
                    }
                  >
                    {createTOCNodes(tocSubTree)}
                  </AntdSubMenu>
                ))
              : [];

            const leafNodes = _.map(tocTree.childPages, childPage => (
              <AntdMenu.Item key={childPage.slug}>
                <Link to={childPage.slug}>
                  <div>{childPage.title}</div>
                </Link>
              </AntdMenu.Item>
            ));
            const combinedNodes = _.concat(childSubTreeNodes, leafNodes);

            return combinedNodes ? _.reduce(combinedNodes, (prev, curr) => [prev, ', ', curr]) : '';
          }

          const selectedKeys = [safeGetRelWindowPath()];
          let bDisplaySidebar = !!(sidebarRoot && sidebarRoot.length > 1);
          const sidebarRootTocMV = bDisplaySidebar
            ? _.find(
                this.createTOCModelView(mdNodes).childTOCs,
                o => o.slugPart.toLowerCase() === sidebarRoot.slice(1).toLowerCase()
              )
            : null;
          bDisplaySidebar = !!sidebarRootTocMV;
          const defaultOpenKeys = bDisplaySidebar
            ? this.getHeadingSlugPrefixes(sidebarRootTocMV)
            : [];

          if (bDisplaySidebar) {
            return (
              <AntdSider
                theme={siteCfg.theme.LightVariant}
                collapsible
                // eslint-disable-next-line react/destructuring-assignment
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                trigger={null}
                breakpoint={siteCfg.theme.breakpoint}
                collapsedWidth="0"
                onBreakpoint={this.onBreakpoint}
                width={siteCfg.theme.sidebarMenuWidth}
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
              >
                <AntdMenu
                  mode="inline"
                  defaultOpenKeys={defaultOpenKeys}
                  selectedKeys={selectedKeys}
                  inlineIndent={siteCfg.theme.sidebarIndent}
                  theme={siteCfg.theme.LightVariant}
                >
                  {createTOCNodes(sidebarRootTocMV)}
                </AntdMenu>
              </AntdSider>
            );
          }

          return <div />;
        }}
      />
    );
  }
}

// const mapStateToProps = state => ({
//   isSidebarOpen: getSidebarState(state),
// })

// const mapDispatchToProps = {
//   onSetSidebarOpen,
// }

// const SidebarContentsInternal = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SidebarContents)

// const ResponsiveSidebar = ({ headerHeight, sidebarRoot }) => (
//  <div
//    style={{
//      height: '100vh',
//      position: 'fixed',
//      top: headerHeight,
//      left: 0,
//      right: '80%',
//      bottom: 0,
//      overflow: 'hidden',
//    }}
//  >
//    <div
//      style={{
//        position: 'absolute',
//        left: 0,
//        right: 0,
//        top: 0,
//        bottom: 0,
//      }}
//    >
//      <SidebarContentsInternal sidebarRoot={sidebarRoot} />
//    </div>
//  </div>
// )
//
// const mapStateToProps2 = state => ({
//  headerHeight: getHeaderHeightState(state),
// })
//
// export default connect(mapStateToProps2)(ResponsiveSidebar)

export default SidebarContents;
