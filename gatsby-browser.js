// 3rd
import './src/styles/antd.less';
// import 'antd/dist/antd.css';
import './src/styles/bootstrap/bootstrap.scss';
import './src/styles/custom.scss';

import React from 'react';
import SidebarContext from './src/contexts/SidebarContext';
import SearchWrapper from './src/contexts/SearchContext';

import './src/styles/typography.scss';
import 'prismjs/themes/prism-tomorrow.css';

const wrapPageElement = ({ element, props }) => (
  <SearchWrapper {...props}>
    <SidebarContext {...props}>{element}</SidebarContext>
  </SearchWrapper>
);
export { wrapPageElement };
