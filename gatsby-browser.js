// 3rd
// The stylesheet is in SiteCfg.js bc the antd gatsby plugin configures it in gatsby-config.js
// import './src/styles/antd.less';
// import 'antd/dist/antd.css';
import './src/styles/bootstrap/bootstrap.scss';
import './src/styles/custom.scss';

import React from 'react';
import SidebarContext from './src/contexts/SidebarContext';
import SearchWrapper from './src/contexts/SearchContext';

import './src/styles/typography.scss';

import 'prismjs/themes/prism-coy.css';
// import 'prismjs/themes/prism-solarizedlight.css';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
// Themes from https://atelierbram.github.io/syntax-highlighting/prism/demo/
// import './src/styles/prism-themes/prism-base16-ocean.dark.scss';

const wrapPageElement = ({ element, props }) => (
  <SearchWrapper {...props}>
    <SidebarContext {...props}>{element}</SidebarContext>
  </SearchWrapper>
);
export { wrapPageElement };
