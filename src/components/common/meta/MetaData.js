import React from 'react'
import PropTypes from 'prop-types'
import url from 'url'

import ArticleMetaGhost from './ArticleMetaGhost'
import ArticleMetaMD from './ArticleMetaMD'
import WebsiteMeta from './WebsiteMeta'

const MetaData = ({
    data,
    type,
    title,
    description,
    image,
    fetchAuthorData,
    overwriteDefaultImage,
    location,
}) => {
    const { ghostPost, markdownRemark } = data || {}
    const { siteMetadata } = data.site

    const canonical = url.resolve(siteMetadata.siteUrl, location.pathname, `/`)

    if (type === `article`) {
        if (ghostPost) {
            return (
                <ArticleMetaGhost
                    data={data}
                    canonical={canonical}
                    fetchAuthorData={fetchAuthorData}
                    title={title}
                    image={image}
                    overwriteDefaultImage={overwriteDefaultImage}
                />
            )
        } else if (markdownRemark) {
            return (
                <ArticleMetaMD
                    data={data}
                    canonical={canonical}
                />
            )
        }
    } else if (type === `website` || type === `series`) {
        return (
            <WebsiteMeta
                data={data}
                canonical={canonical}
                title={title}
                description={description}
                image={image}
                type={type}
            />
        )
    }

    return null
}

MetaData.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                siteUrl: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        ghostPost: PropTypes.object,
        markdownRemark: PropTypes.object,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([`website`, `series`, `article`]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    fetchAuthorData: PropTypes.bool,
    overwriteDefaultImage: PropTypes.bool,
}

export default MetaData
