const _ = require('lodash')
const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const postTemplate = path.resolve('src/templates/postTemplate.js')

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        // resolve()
        reject(result.errors)
      }

      // Create page templates
      _.each(result.data.allMarkdownRemark.edges, edge => {
        createPage({
          path: edge.node.fields.slug,
          component: postTemplate,
          context: {}, // additional data can be passed via context
        })
      })

      resolve()
    })
  })
}

module.exports = exports.createPages
