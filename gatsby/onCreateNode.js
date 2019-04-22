const _ = require('lodash')

const path = require(`path`)

const { createFilePath } = require('gatsby-source-filesystem')
const { sanitizePath, removeTrailingFwdSlash, prettifyPath } = require('./utils')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  let pgTitle = ''
  let sideMenuHeading = ''

  if (node.internal.type === `File`) {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split(`---`)[1]}/`
    createNodeField({ node, name: `slug`, value: slug })
  } else if (node.internal.type === `MarkdownRemark` && typeof node.slug === `undefined`) {
    const nodeFilePath = removeTrailingFwdSlash(
      createFilePath({ node, getNode, basePath: 'pages' })
    )
    const slug = sanitizePath(nodeFilePath)
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
    const pathSlugsArray = nodeFilePath.split('/')
    pgTitle = node.frontmatter.title
      ? node.frontmatter.title
      : prettifyPath(pathSlugsArray[pathSlugsArray.length - 1])

    sideMenuHeading = node.frontmatter.sideMenuHeading
      ? node.frontmatter.sideMenuHeading
      : prettifyPath(pathSlugsArray[pathSlugsArray.length - 1])

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(tag => `/tags/${_.kebabCase(tag)}/`)
      createNodeField({ node, name: `tagSlugs`, value: tagSlugs })
    }
  }

  createNodeField({
    node,
    name: 'pageTitle',
    value: pgTitle,
  })
  createNodeField({
    node,
    name: 'sideMenuHeading',
    value: sideMenuHeading,
  })
}

module.exports = exports.onCreateNode
