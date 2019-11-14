const _ = require(`lodash`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const urlUtils = require(`../utils/urls`);
const {
    markdownQueryConfig,
    defaultMarkdownSection
} = require(`../utils/query-config`);
const knownSections = _.map(markdownQueryConfig, `section`);
const {
    prettifySlug,
    relFilePathToSlug,
    absFilePathToSlug,
    isGuideName
} = require("./utils");
const path = require(`path`);

module.exports.createMarkdownNodeFields = async ({
    node,
    getNode,
    actions
}) => {
    const { createNodeField } = actions;

    let pgTitle = "";
    let sideMenuHeading = "";
    let guideName = "blog";

    if (
        (node.internal.type === `MarkdownRemark` ||
            node.internal.type === `Mdx`) &&
        typeof node.slug === `undefined`
    ) {
        let slug = urlUtils.urlForMarkdown(
            node,
            createFilePath({ node, getNode, basePath: `pages` })
        );
        // Section is the first part of the path
        let section = slug.match(/^\/(.*?)\//)[1];
        section = _.includes(knownSections, section)
            ? section
            : defaultMarkdownSection;

        createNodeField({
            node,
            name: `slug`,
            value: slug
        });

        const pathSlugsArray = slug.split("/");
        pgTitle = node.frontmatter.title
            ? node.frontmatter.title
            : prettifySlug(_.last(pathSlugsArray));

        if (isGuideName(_.nth(pathSlugsArray, 1))) {
            guideName = _.nth(pathSlugsArray, 1);
        }
        sideMenuHeading = node.frontmatter.sideMenuHeading
            ? node.frontmatter.sideMenuHeading
            : prettifySlug(_.last(pathSlugsArray));

        if (node.frontmatter.tags) {
            const tagSlugs = node.frontmatter.tags.map(
                tag => `/tags/${_.kebabCase(tag)}/`
            );
            createNodeField({ node, name: `tagSlugs`, value: tagSlugs });
        }

        createNodeField({
            node,
            name: `section`,
            value: section
        });
    } else if (node.internal.type === `File`) {
        const pathObj = path.parse(
            node.relativePath.startsWith("/")
                ? node.relativePath
                : `/${node.relativePath}`
        );
        const pathDir = absFilePathToSlug(pathObj.dir).replace(/\/$/, "");
        const pathName = absFilePathToSlug(pathObj.name);
        const pathExt = [".md", ".mdx", ".js", ".jsx"].includes(pathObj.ext)
            ? ""
            : pathObj.ext;

        const slug = `${pathDir}/${pathName}${pathExt}` || '/';
        createNodeField({
            node,
            name: "slug",
            value: slug
        });
    }
    createNodeField({
        node,
        name: "pageTitle",
        value: pgTitle
    });
    createNodeField({
        node,
        name: "sideMenuHeading",
        value: sideMenuHeading
    });
    createNodeField({
        node,
        name: "guideName",
        value: guideName
    });
};
