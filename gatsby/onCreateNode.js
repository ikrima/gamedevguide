const _ = require('lodash')

const path = require(`path`)

const { createFilePath } = require('gatsby-source-filesystem')
const { sanitizePath, removeTrailingFwdSlash, prettifyPath } = require('./utils')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  let pgTitle = ''
  let sideMenuHeading = ''

  if (
    (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) &&
    typeof node.slug === `undefined`
  ) {
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
  } else if (node.internal.type === `File`) {
    const pathObj = path.parse(
      node.relativePath.startsWith('/') ? node.relativePath : `/${node.relativePath}`
    )
    const pathDir = sanitizePath(removeTrailingFwdSlash(pathObj.dir)).replace(/\/$/, '')
    const pathName = sanitizePath(pathObj.name)
    const pathExt = ['.md', '.mdx', '.js', '.jsx'].includes(pathObj.ext) ? '' : pathObj.ext

    const slug = `${pathDir}/${pathName}${pathExt}`
    // console.log(`${node.relativePath}::::::::::${slug}`)
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
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
