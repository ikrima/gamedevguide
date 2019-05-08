import React from 'react'
import { Layout } from 'antd'
import Sidebar from './parts/Sidebar'
import ContentHeader from './parts/ContentHeader'
import TableOfContent from './TableOfContents'

const { Content } = Layout
const MainLayout = ({ children, showSidebar, showToC, slug, sidebarToC }) => (
  <div id="app">
    <div id="app-layout-container">
      <Layout id="app-layout" className="app-layout ant-layout ant-layout-has-sider">
        <Layout>
          {' '}
          <ContentHeader showSidebarBtn={showSidebar} showToC={showToC} />
          <Layout>
            {' '}
            <Sidebar showSidebar={showSidebar} sidebarToC={sidebarToC} slug={slug} />
            <Content id="app-content">
              <Layout>
                <div
                  style={{ minHeight: 'calc(100vh - 60px)' }}
                  className="container-fluid no-breadcrumb page-dashboard"
                >
                  {children}
                </div>
                {showToC && <TableOfContent className="d-none d-md-block" />}
              </Layout>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  </div>
)

export default MainLayout
