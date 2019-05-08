import React from 'react';
import { Layout, Icon } from 'antd';
import APPCONFIG from 'constants/appConfig';
import DEMO from 'constants/demoData';
const { Footer } = Layout;

const AppFooter = () => (
  <Footer className="app-footer app-footer-custom">
    <div className="footer-inner-v1">
      <span className="small">
        © {APPCONFIG.year} <a className="brand" target="_blank" rel="noopener noreferrer" href={DEMO.productLink}>{APPCONFIG.brand}</a>
      </span>
      <span className="small">
        Built with Love <Icon type="heart-o" />
      </span>
    </div>
  </Footer>
)

export default AppFooter;
