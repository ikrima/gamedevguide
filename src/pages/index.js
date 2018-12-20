import React from 'react'
import Layout from '../components/Layout'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import { Link } from "gatsby"

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <div align="center">
        <br/>
          <p style={{color: "cornflowerblue", fontSize: 50, fontWeight: 'bold'}}>
            Gatsby Markdown Starter
          </p>
          <h2>Boilerplate for markdown-based website</h2>
          <br/>
          <Link to="/docs/test">
            <Button type="primary" size="large" style={{marginRight: 10}}>Get Started</Button>
          </Link>
          <a href="https://github.com/cvluca/gatsby-starter-markdown">
            <Button type="primary" size="large">Github</Button>
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage