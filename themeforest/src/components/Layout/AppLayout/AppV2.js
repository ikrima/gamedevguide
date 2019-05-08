import React from 'react';
import classnames from 'classnames';
import { Layout } from 'antd';
import AppHeader from 'components/Layout/Header'
import AppFooter from 'components/Layout/Footer'
import AppContent from 'components/Layout/Content'
import AppSidenav from 'components/Layout/Sidenav/index2'
import AppBreadcrumb from 'components/Layout/Breadcrumb'
const { Content } = Layout;

class AppLayout extends React.Component {

  render() {
    const { boxedLayout } = this.props;
    
    return (
      <Layout id='app-v2-layout' className={classnames('app-layout', {
        'boxed-layout'  : boxedLayout,
      })}>
        <AppHeader showLogo={true} />
        <AppBreadcrumb />
        <Content className="app-content">
          <Layout>
            <AppSidenav />
            <AppContent />
          </Layout>
        </Content>
        <AppFooter />
      </Layout>
    )
  }
}

export default AppLayout;
