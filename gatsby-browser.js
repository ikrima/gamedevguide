// 3rd
// import './src/styles/antd.less';
import './src/styles/bootstrap/bootstrap.scss';
// // custom
import './src/styles/layout.scss';
import './src/styles/theme.scss';
import './src/styles/ui.scss';
import './src/styles/vendors.scss';
import './src/styles/custom.scss';

import React from 'react';
import SidebarContext from './src/contexts/SidebarContext';
import SearchWrapper from './src/contexts/SearchContext';

import 'prismjs/themes/prism-tomorrow.css';

const wrapPageElement = ({ element, props }) => (
  <SearchWrapper {...props}>
    <SidebarContext {...props}>{element}</SidebarContext>
  </SearchWrapper>
);
export { wrapPageElement };
