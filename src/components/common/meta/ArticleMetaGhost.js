import React from 'react'
import Helmet from "react-helmet"
import PropTypes from 'prop-types'
import _ from 'lodash'
import { tags as tagsHelper } from '@tryghost/helpers'

import getAuthorProperties from './getAuthorProperties'
import ImageMeta from './ImageMeta'

const ArticleMetaGhost = ({ data, canonical, fetchAuthorData, title, overwriteDefaultImage, image }) => {
    const { ghostPost } = data
    const { siteMetadata } = data.site

    const author = getAuthorProperties(ghostPost.primary_author, fetchAuthorData)
    const publicTags = _.map(tagsHelper(ghostPost, { visibility: `public`, fn: tag => tag }), `name`)
    const primaryTag = publicTags[0] || { name: `General`, slug: `general` }
    const seoImage = (overwriteDefaultImage && ghostPost.feature_image) ? ghostPost.feature_image : image

    return (
        <>
            <Helmet>
                <title>{ghostPost.meta_title || title || ghostPost.title}</title>
                <meta name="description" content={ghostPost.meta_description || ghostPost.excerpt} />
                <link rel="canonical" href={canonical} />

                <meta property="og:site_name" content={siteMetadata.title} />
                <meta property="og:type" content="article" />
                <meta property="og:title"
                    content={
                        ghostPost.og_title ||
                        title ||
                        ghostPost.meta_title ||
                        ghostPost.title
                    }
                />
                <meta property="og:description"
                    content={
                        ghostPost.og_description ||
                        ghostPost.excerpt ||
                        ghostPost.meta_description
                    }
                />
                <meta property="og:url" content={canonical} />
                <meta property="article:published_time" content={ghostPost.published_at} />
                <meta property="article:modified_time" content={ghostPost.updated_at} />
                {publicTags.map((keyword, i) => (<meta property="article:tag" content={keyword} key={i} />))}
                <meta property="article:author" content="https://www.facebook.com/ghost/" />

                <meta name="twitter:title"
                    content={
                        ghostPost.twitter_title ||
                        title ||
                        ghostPost.meta_title ||
                        ghostPost.title
                    }
                />
                <meta name="twitter:description"
                    content={
                        ghostPost.twitter_description ||
                        ghostPost.excerpt ||
                        ghostPost.meta_description
                    }
                />
                <meta name="twitter:url" content={canonical} />
                {/* <meta name="twitter.label1" content="Reading time" /> */}
                {/* <meta name="twitter:data1" content="TODO: Reading time helper and replace existing `label1` data" /> */}
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content={author.name} />
                <meta name="twitter:label2" content="Filed under" />
                <meta name="twitter:data2" content={primaryTag} />
                <meta name="twitter:site" content="@tryghost" />
                <meta name="twitter:creator" content="@tryghost" />
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org/",
                        "@type": "Article",
                        "author": {
                            "@type": "Person",
                            "name": "${author.name}",
                            ${author.image ? author.sameAsArray ? `"image": "${author.image}",` : `"image": "${author.image}"` : ``}
                            ${author.sameAsArray ? `"sameAs": ${author.sameAsArray}` : ``}
                        },
                        ${publicTags.length ? `"keywords": "${_.join(publicTags, `, `)}",` : ``}
                        "headline": "${ghostPost.meta_title || title || ghostPost.title}",
                        "url": "${canonical}",
                        "datePublished": "${ghostPost.published_at}",
                        "dateModified": "${ghostPost.updated_at}",
                        "image": {
                            "@type": "ImageObject",
                            "url": "${seoImage}",
                            "width": 1000,
                            "height": 563
                        },
                        "description": "${ghostPost.meta_description || ghostPost.excerpt}",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${siteMetadata.siteUrl}"
                        }
                    }
                `}</script>
            </Helmet>
            <ImageMeta image={seoImage} />
        </>
    )
}

// "publisher": {
//     "@type": "Organization",
//         "name": "Ghost",
//             "logo": {
//         "@type": "ImageObject",
//             "url": "https://ghost.org/favicon.png",
//                 "width": 60,
//                     "height": 60
//     }
// },

ArticleMetaGhost.defaultProps = {
    fetchAuthorData: false,
}

ArticleMetaGhost.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            published_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired,
            excerpt: PropTypes.string.isRequired,
            meta_title: PropTypes.string,
            meta_description: PropTypes.string,
            primary_author: PropTypes.object.isRequired,
            feature_image: PropTypes.string,
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                    slug: PropTypes.string,
                    visibility: PropTypes.string,
                })
            ),
            primaryTag: PropTypes.shape({
                name: PropTypes.string,
            }),
            og_title: PropTypes.string,
            og_description: PropTypes.string,
            twitter_title: PropTypes.string,
            twitter_description: PropTypes.string,
        }).isRequired,
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                siteUrl: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    canonical: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    fetchAuthorData: PropTypes.bool,
    title: PropTypes.string,
    overwriteDefaultImage: PropTypes.bool,
}

export default ArticleMetaGhost
