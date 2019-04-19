import React from 'react'
import { Link } from 'gatsby'
import { Button as AntdButton, PageHeader as AntdPageHeader, Divider as AntdDivider } from 'antd'
import Layout from '../components/Layout'
import siteCfg from '../../SiteCfg'

const IndexPage = () => (
  <Layout>
    <div>
      <div align="center">
        <br />
        <AntdPageHeader title="K&amp;L/Bebylon Battle Royale: GameDev &amp; Unreal Engine Programming Guide" />
        <AntdDivider />
        <Link to="/ue4guide/UnrealEngine">
          <AntdButton type="primary" size="large" style={{ marginRight: 10 }}>
            Get Started
          </AntdButton>
        </Link>
        <AntdButton type="primary" size="large" href={siteCfg.repoURL}>
          Github
        </AntdButton>
      </div>
    </div>
  </Layout>
)

export default IndexPage
