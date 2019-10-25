// We can't use fragments here as Gatsby doesn't support them
// String interpolation is essentially the same
const defaultGhostFields = `
slug
title
url
published_at
feature_image
tags {
    slug
    name
    description
    meta_title
    meta_description
    feature_image
}
`

const defaultMarkdownFields = `
fields {
    slug
}
`

const allGhostPosts = function allGhostPosts(tag, fields = defaultGhostFields) {
    if (!tag) {
        throw new Error(`Please provide a tag property`)
    }

    let query = `
        {
            allGhostPost(
                sort: {order: ASC, fields: published_at},
                filter: {
                    tags: {elemMatch: {slug: {eq: "${tag}"}}},
                    slug: {ne: "data-schema"}
                }
            ) {
                edges {
                    node {
                        ${fields}
                    }
                }
            }
        }
    `

    return query
}

const allMarkdownPosts = function allMarkdownposts(section, fields = defaultMarkdownFields) {
    let regex = `/^(?!/data-schema\/).*(?<!README\/)$/` // eslint-disable-line no-useless-escape
    let sectionFilter = `section: {eq: "${section}"},`
    let query = `
        {
            allMarkdownRemark(
                sort: {order: ASC, fields: [frontmatter___date]},
                filter: {fields: {
                    slug: {regex: "${regex}"},
                    ${section ? sectionFilter : ``}
                }}
            ) {
                edges {
                    node {
                        ${fields}
                    }
                }
            }
        }
    `

    return query
}

module.exports = {
    allGhostPosts: allGhostPosts,
    allMarkdownPosts: allMarkdownPosts,
}
