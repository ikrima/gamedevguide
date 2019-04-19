import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Header from '../Header/Header'
//import './Layout.css'
import ResponsiveSidebar from '../ResponsiveSidebar';
import Container from '../Container';
import ResponsiveAnchor from '../ResponsiveAnchor';
import ResponsiveTopBar from '../ResponsiveTopBar';
// import { setPostPageOn, setPostPageOff } from '../../actions/layout'
import { connect } from 'react-redux'
import { pathPrefix } from '../../../gatsby-config'
import MediaQuery from "react-responsive";
import { onSetSidebarDocked } from "../../actions/layout";

import SidebarContents from '../SidebarContents'
import TableOfContents from '../TableOfContents'
import { Layout as AntdLayout, Breadcrumb as AntdBreadcrumb } from 'antd'
const { Sider: AntdSider, Content: AntdContent } = AntdLayout

const RootLayout = ({
  children,
  // setPostPageOn,
  // setPostPageOff,
  sidebarRoot,
  //onSetSidebarDocked,
}) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            siteNavTitle
            siteTitleLong
            siteDescription
            siteKeywords
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
      // const allPosts = data.allMarkdownRemark.edges.map(
      //   edge => edge.node.fields.slug
      // )
      // let onPostPage
      // if (typeof window !== "undefined") {
      //   let path
      //   if (pathPrefix.endsWith("/")) {
      //     path = safeGetWindowPath().replace(pathPrefix.slice(0, -1), "")
      //   } else {
      //     path = safeGetWindowPath().replace(pathPrefix, "")
      //   }
      //   if (
      //     allPosts.indexOf(path) >= 0 ||
      //     allPosts.indexOf(path.slice(0, -1)) >= 0
      //   ) {
      //     // setPostPageOn()
      //     onPostPage = true
      //   } else {
      //     // setPostPageOff()
      //     onPostPage = false
      //   }
      // }

      const { siteNavTitle, siteTitleLong, siteDescription, siteKeywords } = data.site.siteMetadata
      // return (
      //   <MediaQuery maxWidth={1000}>
      //     {matches => (
      //       <>
      //         <Helmet
      //           title={siteTitleLong}
      //           meta={[
      //             { name: "description", content: "Sample" },
      //             { name: "keywords", content: "sample, something" },
      //           ]}
      //         >
      //           <html lang="en" />
      //         </Helmet>
      //         <Header siteNavTitle={siteNavTitle} />
      //         {matches && onPostPage ? (
      //           <ResponsiveTopBar root={sidebarRoot} />
      //         ) : null}
      //         {!matches && onPostPage ? (
      //           <>
      //             <ResponsiveSidebar root={sidebarRoot} /> <ResponsiveAnchor />{" "}
      //           </>
      //         ) : null}
      //         <Container sidebarDocked={!matches} onPostPage={onPostPage}>
      //           {children}
      //         </Container>
      //       </>
      //     )}
      //   </MediaQuery>
      // )
      return (
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto 1fr",
            height: "100vh",
          }}
        >
          <Helmet
            title={siteTitleLong}
            meta={[
              { name: "description", content: siteDescription },
              { name: "keywords", content: siteKeywords },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <Header siteNavTitle={siteNavTitle} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              height: "100%",
            }}
          >
            <SidebarContents root={sidebarRoot} />
            <AntdLayout>
              {/* <Breadcrumb
                style={{ padding: '16px', backgroundColor: '#f0f2f5' }}
              >
                {safeGetWindowPath().split('/').map(part => (
                  <Breadcrumb.Item>
                    <Link to={part} style={{ padding: 4 }}>
                      {part}
                    </Link>
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb> */}
              <AntdContent
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                }}
              >
                {children}
              </AntdContent>
            </AntdLayout>
            <TableOfContents />
          </div>
          <AntdLayout>
            <AntdSider
              width={200}
              style={{ background: "#fff", height: "100%" }}
            />
          </AntdLayout>
        </div>
      )
    }}
  />
)

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
}


//const mapDispatchToProps = {
//  // setPostPageOn,
//  // setPostPageOff,
//  onSetSidebarDocked
//}

//export default connect(()=>({}), mapDispatchToProps) (RootLayout)
export default RootLayout
