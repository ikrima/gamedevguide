const path = require(`path`)

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

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}
