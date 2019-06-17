/* eslint-disable */

import React, { useContext, useState, useEffect } from 'react';
import { Menu as AntdMenu, Input as AntdInput } from 'antd';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Context as SidebarContext } from '../../contexts/SidebarContext';
import siteCfg from '../../../SiteCfg';
import { allGuideTOCs } from '../../../SiteCfg/json/GuideTOC';
import _ from 'lodash';

import {
  separateSlugs,
  prettifySlug,
  safeGetRelWindowPath,
  getGuideNameFromWindowPath,
  isInBrowser,
} from '../../../gatsby/utils';

const AntdSubMenu = AntdMenu.SubMenu;
const AntdSearch = AntdInput.Search;

export default function SidebarToC() {
  const {
    state: { openKeys },
    dispatch,
    initialKeys,
  } = useContext(SidebarContext);

  const [searchFilter, setSearchFilter] = useState('');
  const { guides } = useStaticQuery(graphql`
    query sidebarToCQuery {
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
  `);

  const getHeadingSlugPrefixes = (inTOCModelView, maxDepth = 2) => {
    const _getSlugPrefixes = (curDepth, tocNode) =>
      tocNode.childTOCs && curDepth < maxDepth
        ? [tocNode.slugPrefix].concat(
            _.flatMap(tocNode.childTOCs, o => _getSlugPrefixes(curDepth + 1, o))
          )
        : [tocNode.slugPrefix];
    return _getSlugPrefixes(0, inTOCModelView);
  };

  const createTOCModelView = inMarkdownNodes => {
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

  const curPageGuideName = getGuideNameFromWindowPath();
  const curGuideRelRoot = `/${curPageGuideName}`;
  const mdNodes = guides.edges
    .map(({ node }) => (node.childMdx ? node.childMdx : node.childMarkdownRemark))
    .filter(node => node.fields.slug.startsWith(curGuideRelRoot));

  function createTOCNodes(tocTree, searchFilter) {
    const childSubTreeNodes =
      tocTree && tocTree.childTOCs
        ? tocTree.childTOCs.map(tocSubTree => (
            <AntdSubMenu
              key={tocSubTree.slugPrefix}
              sort={tocSubTree.sortIndex}
              title={tocSubTree.prettyTitle || prettifySlug(tocSubTree.slugPart)}
            >
              {createTOCNodes(tocSubTree, searchFilter)}
            </AntdSubMenu>
          ))
        : [];

    const leafNodes =
      tocTree &&
      tocTree.childPages
        .filter(childPage => {
          if (searchFilter === undefined || searchFilter.trim() === '') {
            return true;
          } else {
            var title = childPage.title || prettifySlug(childPage.slugPart);
            var terms = searchFilter.trim().split(' ');
            var indexes = terms
              .map(item => {
                return title.toLowerCase().indexOf(item.toLowerCase());
              })
              .filter(item => item !== -1);
            return indexes.length > 0;
          }
        })
        .map(childPage => (
          <AntdMenu.Item
            key={childPage.slug}
            sort={childPage.sortIndex}
            className={safeGetRelWindowPath() === childPage.slug && 'ant-menu-item-selected'}
          >
            <Link to={childPage.slug} onClick={() => dispatch({ type: 'closeSD' })}>
              <span className="nav-text">{childPage.title}</span>
            </Link>
          </AntdMenu.Item>
        ));

    var combinedNodes = _.concat(
      leafNodes,
      childSubTreeNodes.filter(item =>
        searchFilter.trim() !== '' && item.props.children.length === 0 ? false : true
      )
    );

    combinedNodes.sort((a, b) => {
      if (a.props.sort < b.props.sort) {
        return -1;
      } else if (a.props.sort > b.props.sort) {
        return 1;
      }
    });

    combinedNodes ? _.reduce(combinedNodes, (prev, curr) => [prev, curr]) : '';

    return combinedNodes;
  }

  const selectedKeys = [safeGetRelWindowPath()];
  let bDisplaySidebar = !!(curPageGuideName && curPageGuideName.length > 1);
  var guideTocMV = bDisplaySidebar
    ? _.find(
        createTOCModelView(mdNodes).childTOCs,
        o => o.slugPart.toLowerCase() === curPageGuideName.toLowerCase()
      )
    : null;
  bDisplaySidebar = !!guideTocMV;

  const getAllKeys = function(tree, keys) {
    tree &&
      tree.childTOCs.forEach(submenu => {
        keys.push(submenu.slugPrefix);
        if (submenu.childTOCs) {
          getAllKeys(submenu, keys);
        }
      });
  };
  var allkeys = [];
  getAllKeys(guideTocMV, allkeys);

  const defaultOpenKeys = bDisplaySidebar ? getHeadingSlugPrefixes(guideTocMV, 2) : [];
  const allOpen = searchFilter.trim() === '' ? null : allkeys;

  return (
    <AntdMenu
      mode="inline"
      style={{ minHeight: '100vh' }}
      onOpenChange={keys => {
        // const flattenedKeys = !(_.isNil(keys) || _.isEmpty(keys)) ? _.uniq(_.flattenDeep(keys)) : []
        searchFilter.trim() === '' && dispatch({ type: 'openKeys', payload: keys });
      }}
      openKeys={allOpen ? allOpen : openKeys}
      theme={siteCfg.theme.DarkVariant}
      defaultOpenKeys={defaultOpenKeys}
      selectedKeys={selectedKeys}
      inlineIndent={siteCfg.theme.sidebarIndent}
    >
      {console.log(openKeys)}
      {/* <div className="py-3" /> */}
      <AntdMenu.Item>
        {/* SEARCH */}
        <AntdSearch
          placeholder="Search the TOC"
          onChange={e => {
            var str = e.target.value;
            setSearchFilter(str);
          }}
        />
      </AntdMenu.Item>

      {isInBrowser() ? createTOCNodes(guideTocMV, searchFilter) : <div />}
    </AntdMenu>
  );

  // const items = allGuideTOCs
  // const isBrowser = typeof window !== 'undefined';
  // function createToC(itms) {
  //   const createItem = ({ prettyTitle, slugPart }) => (
  //     <Menu.Item
  //       key={slugPart}
  //       className={isBrowser && window.location.pathname === slugPart && 'ant-menu-item-selected'}
  //     >
  //       <Link to={`${slugPart}`} onClick={() => dispatch({ type: 'closeSD' })}>
  //         <span className="nav-text"> {prettyTitle}</span>
  //       </Link>
  //     </Menu.Item>
  //   );
  //   return itms.map(item => {
  //     if (!item.items) {
  //       return createItem(item);
  //     }
  //     return (
  //       <SubMenu key={item.prettyTitle} title={item.prettyTitle}>
  //         {createToC(item.items)}
  //       </SubMenu>
  //     );
  //   });
  // }
  // return (
  //   <Menu
  //     mode="inline"
  //     style={{ minHeight: '100vh' }}
  //     onOpenChange={keys => {
  //       if (openKeys.includes(keys[0])) {
  //         dispatch({ type: 'openKeys', payload: [] });
  //       } else {
  //         dispatch({ type: 'openKeys', payload: [keys[0]] });
  //       }
  //     }}
  //     defaultOpenKeys={openKeys}
  //     theme="light"
  //   >
  //     {' '}
  //     <div className="py-3" />
  //     {createToC(items)}
  //   </Menu>
  // );
}
