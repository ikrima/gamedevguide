const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const guidePageTemplate = path.resolve('src/templates/guidePageTemplate.js')
  const blogPostTemplate = path.resolve('src/templates/blogPostTemplate.js')

  return new Promise((resolve, reject) => {
    graphql(`
      {
        guides: allFile(
          filter: { ext: { in: [".md", ".mdx"] }, sourceInstanceName: { eq: "guides" } }
        ) {
          edges {
            node {
              childMdx {
                fields {
                  slug
                }
                id
              }
              childMarkdownRemark {
                fields {
                  slug
                }
                id
              }
            }
          }
        }
        blogposts: allFile(
          filter: { ext: { in: [".md", ".mdx"] }, sourceInstanceName: { eq: "blogposts" } }
        ) {
          edges {
            node {
              childMdx {
                fields {
                  slug
                }
                id
              }
              childMarkdownRemark {
                fields {
                  slug
                }
                id
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        // console.log(result.errors)
        reject(result.errors)
      }

      // Create page templates
      result.data.guides.edges.forEach(({ node }) => {
        const mdNode = node.childMdx ? node.childMdx : node.childMarkdownRemark
        createPage({
          path: mdNode.fields.slug,
          component: guidePageTemplate,
          context: {
            id: node.id,
          }, // additional data can be passed via context
        })
      })

      result.data.blogposts.edges.forEach(({ node }) => {
        const mdNode = node.childMdx ? node.childMdx : node.childMarkdownRemark
        createPage({
          path: `${mdNode.fields.slug}`,
          component: blogPostTemplate,
          context: {
            id: node.id,
          }, // additional data can be passed via context
        })
      })

      resolve()
    })
  })
}

module.exports = exports.createPages
