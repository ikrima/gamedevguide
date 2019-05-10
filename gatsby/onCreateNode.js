const _ = require('lodash');

const path = require(`path`);

const { createFilePath } = require('gatsby-source-filesystem');
const { prettifySlug, relFilePathToSlug, absFilePathToSlug, isGuideName } = require('./utils');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  let pgTitle = '';
  let sideMenuHeading = '';
  let guideName = 'blog';

  if (
    (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) &&
    typeof node.slug === `undefined`
  ) {
    const nodeFilePath = createFilePath({
      node,
      getNode,
      basePath: 'pages',
      trailingSlash: false,
    });
    const slug = relFilePathToSlug(nodeFilePath);
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
    const pathSlugsArray = slug.split('/');
    pgTitle = node.frontmatter.title
      ? node.frontmatter.title
      : prettifySlug(_.last(pathSlugsArray));
    if (isGuideName(_.nth(pathSlugsArray, 1))) {
      guideName = _.nth(pathSlugsArray, 1);
    }

    sideMenuHeading = node.frontmatter.sideMenuHeading
      ? node.frontmatter.sideMenuHeading
      : prettifySlug(_.last(pathSlugsArray));

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(tag => `/tags/${_.kebabCase(tag)}/`);
      createNodeField({ node, name: `tagSlugs`, value: tagSlugs });
    }
  } else if (node.internal.type === `File`) {
    const pathObj = path.parse(
      node.relativePath.startsWith('/') ? node.relativePath : `/${node.relativePath}`
    );
    const pathDir = absFilePathToSlug(pathObj.dir).replace(/\/$/, '');
    const pathName = absFilePathToSlug(pathObj.name);
    const pathExt = ['.md', '.mdx', '.js', '.jsx'].includes(pathObj.ext) ? '' : pathObj.ext;

    const slug = `${pathDir}/${pathName}${pathExt}`;
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }

  createNodeField({
    node,
    name: 'pageTitle',
    value: pgTitle,
  });
  createNodeField({
    node,
    name: 'sideMenuHeading',
    value: sideMenuHeading,
  });
  createNodeField({
    node,
    name: 'guideName',
    value: guideName,
  });
};

module.exports = exports.onCreateNode;
