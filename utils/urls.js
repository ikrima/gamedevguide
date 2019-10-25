const url = require(`url`)
const siteUrl = process.env.SITE_URL || `https://docs.ghost.org`

const convertToAbsoluteUrl = path => url.resolve(siteUrl, path)

module.exports.urlForMarkdown = (node, fallback, absolute) => {
    // Passing a `path` property in frontmatter will overwrite the
    // slug that we build from the folder structure

    let slug = node.frontmatter.path ? node.frontmatter.path : fallback

    // Remove the version slug from the latest API version docs
    // TODO: use env config to add latest API version
    if (slug.match(/\/api\/v2\/\S*/i)) {
        slug = slug.replace(/\/v2/, ``)
    }

    return absolute ? convertToAbsoluteUrl(slug) : slug
}

// Create a Gatsby-style URL for resources in Ghost. These are currently the same but they might not always be
module.exports.urlForGhostPost = (postNode, section, absolute) => {
    const path = `/${section}/${postNode.slug}/`

    return absolute ? convertToAbsoluteUrl(path) : path
}
module.exports.urlForGhostTag = (tagNode, section, absolute) => {
    const path = `/${section}/${tagNode.slug}/`

    return absolute ? convertToAbsoluteUrl(path) : path
}

module.exports.convertToAbsoluteUrl = convertToAbsoluteUrl
