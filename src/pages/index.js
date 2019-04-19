import React from 'react'
import Layout from '../components/Layout'
import Header from "../components/Header"
import { Button } from 'antd'
import { Link } from "gatsby"
import { Divider as AntDivider} from 'antd'
import siteCfg from "../../SiteCfg"

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <div align="center">
          <br />
          <h2>
            K&amp;L/Bebylon Battle Royale: GameDev & Unreal Engine Programming
            Guide
          </h2>
          <AntDivider />
          <Link to="/ue4guide/UnrealEngine">
            <Button type="primary" size="large" style={{ marginRight: 10 }}>
              Get Started
            </Button>
          </Link>
          <Button
            type="primary"
            size="large"
            href={siteCfg.repoURL}
          >
            Github
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage