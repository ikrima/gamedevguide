/* config-overrides.js */

// const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {

  // config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);

  //do stuff with the webpack config...
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true 
  })(config, env);

  return config;
}