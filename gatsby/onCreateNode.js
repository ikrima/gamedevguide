const { sanitizePath, removeTrailingFwdSlash, prettifyPath } = require("./utils")
const { createFilePath } = require(`gatsby-source-filesystem`)

module.exports = exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  let pgTitle = ""
  if (node.internal.type === `MarkdownRemark`) {
    const nodeFilePath = removeTrailingFwdSlash(createFilePath({ node, getNode, basePath: `pages` }))
    const slug = sanitizePath(nodeFilePath)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    pgTitle = prettifyPath(nodeFilePath.split("/").pop())
  }
  createNodeField({
    node,
    name: `pageTitle`,
    value: pgTitle,
  })
}