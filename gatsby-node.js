/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = require('./gatsby/createPages')
exports.onCreateNode = require('./gatsby/onCreateNode')
// exports.onCreateBabelConfig = ({ actions }) => {
//   actions.setBabelPlugin({
//     name: "babel-plugin-import",
//     options: {
//       libraryName: 'antd',
//       style: true,
//     },
//   })
// }