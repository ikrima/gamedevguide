import React from 'react'
import classnames from 'classnames'
import { Layout } from 'antd'
import AppHeader from './components/Layout/Header'
import AppFooter from './components/Layout/Footer'
import AppContent from './components/Layout/Content'
import AppSidenav from './components/Layout/Sidenav'

class AppLayout extends React.Component {
  render() {
    const { boxedLayout, fixedSidenav, fixedHeader } = this.props

    return (
      <Layout
        id="app-layout"
        className={classnames('app-layout', {
          'boxed-layout': boxedLayout,
          'fixed-sidenav': fixedSidenav,
          'fixed-header': fixedHeader,
        })}
      >
        <AppSidenav />
        {fixedHeader ? (
          <Layout>
            <AppHeader />
            <Layout>
              <AppContent />
              <AppFooter />
            </Layout>
          </Layout>
        ) : (
          <Layout>
            <AppHeader />
            <AppContent />
            <AppFooter />
          </Layout>
        )}
      </Layout>
    )
  }
}

export default AppLayout
