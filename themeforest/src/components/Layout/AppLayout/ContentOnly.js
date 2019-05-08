import React from 'react';
import classnames from 'classnames';
import { Layout } from 'antd';
import AppContent from 'components/Layout/Content'


class AppLayout extends React.Component {
  render() {
    const { boxedLayout } = this.props;

    return (
      <Layout id='app-layout' className={classnames('app-layout', {
        'boxed-layout'  : boxedLayout,
      })}>
        <AppContent/>
      </Layout>
    )
  }
}

export default AppLayout;
