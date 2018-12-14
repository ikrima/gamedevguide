import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Header from '../Header/Header'
import './Layout.css'
import ResponsiveSidebar from '../ResponsiveSidebar';
import Container from '../Container';
import ResponsiveAnchor from '../ResponsiveAnchor';
import ResponsiveTopBar from '../ResponsiveTopBar';
import { setPostPageOn, setPostPageOff } from '../../actions/layout'
import { connect } from 'react-redux'

const Layout = ({ 
  children,
  setPostPageOn,
  setPostPageOff,
}) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => {
      const allPosts = data.allMarkdownRemark.edges.map(edge => edge.node.fields.slug)
      allPosts.indexOf(window.location.pathname) >= 0 ?
      setPostPageOn() : setPostPageOff()
      
      return (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <ResponsiveTopBar />
        <ResponsiveSidebar />
        <ResponsiveAnchor />
        <Container>
          {children}
        </Container>
      </>)
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const mapDispatchToProps = {
  setPostPageOn,
  setPostPageOff,
}

export default connect(()=>({}), mapDispatchToProps) (Layout)
