const siteCfg = require("./SiteCfg")
const pathPrefix = siteCfg.pathPrefix === "/" ? "" : siteCfg.pathPrefix

module.exports = {
  pathPrefix: siteCfg.pathPrefix,
  siteMetadata: {
    siteUrl:           siteCfg.siteUrl + pathPrefix,
    siteNavTitle:      siteCfg.siteNavTitle,
    siteTitleLong:     siteCfg.siteTitleLong,
    siteDescription:   siteCfg.siteDescription,
    siteKeywords:      siteCfg.siteKeywords,

    author:        siteCfg.userTwitter,
    logoText:      siteCfg.siteLogoText,
    copyrights:    siteCfg.siteCopyrights,
    logo: {
      src: siteCfg.siteLogo,
      alt: "",
    },

    postsPerPage:  siteCfg.theme.PostsPerPage,
    showMenuItems: siteCfg.theme.ShowMenuItems,
    menuMoreText:  siteCfg.theme.MenuMoreText,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true,
      },
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
        modifyVars: siteCfg.theme.modifyVars,
      },
    },
    "gatsby-plugin-sitemap",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-lodash",
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [`.mdx`],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `MenuItems`, // a fixed string
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `menuItems`,
        path: `${__dirname}/src/menuItems`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteCfg.siteTitleAlt,
        short_name: siteCfg.siteTitleManifest,
        description: siteCfg.siteDescription,
        start_url: siteCfg.pathPrefix,
        background_color: siteCfg.theme.BackgroundColor,
        theme_color: siteCfg.theme.Color,
        display: siteCfg.siteDisplay,
        icon: siteCfg.favicon,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              related: false,
              noIframeBorder: true,
            },
          },
          "gatsby-remark-responsive-iframe",
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-smartypants`,

          `gatsby-remark-katex`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: "post-toc-anchor",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 800,
            },
          },
        ],
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: siteCfg.googleAnalyticsID,
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Enables Google Optimize using your container Id
        //optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        //experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        //variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        //cookieDomain: "example.com",
      },
    },
  ],
  pathPrefix: "/",
}
