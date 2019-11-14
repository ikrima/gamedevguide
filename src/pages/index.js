import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { Icon, Box } from '../components/common'
import { Layout } from '../components/common/layout'
import { HomeHeader, HomeAPIBox, HomeFAQLink } from '../components/home'
import { Spirit } from '../styles/spirit-styles'
import { MetaData, getMetaImageUrls } from '../components/common/meta'

const HomePage = ({ data, location }) => {
    // Add meta title and description for this page here to overwrite the site meta data as set in the config
    const title = `K&L GameDev Guide `
    const description = `Get familiar with Ghost - the open source professional publishing platform.  Install guides, tutorials, API docs and FAQs.`
    const imageUrl = getMetaImageUrls()

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
                title={title}
                description={description}
                image={imageUrl}
            />
            <Layout
                headerDividerStyle="shadow"
                bodyClass="bg-white"
                mainClass="bg-whitegrey-l2 pb-vw6 pb-vw3-ns"
                header={<HomeHeader />}
            >

            </Layout>
        </>
    )
}

HomePage.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                siteUrl: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default HomePage

export const pageQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
    }
`
