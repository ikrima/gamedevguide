const path = require(`path`);
const remark = require('remark');
const visit = require('unist-util-visit');
const _ = require('lodash');
const siteCfg = require('./SiteCfg');

const pathPrefix = siteCfg.pathPrefix === '/' ? '' : siteCfg.pathPrefix;

const gbRemarkPluginsList = [
  {
    resolve: 'gatsby-remark-embed-video',
    options: {
      related: false,
      noIframeBorder: true,
    },
  },
  'gatsby-remark-responsive-iframe',
  {
    resolve: 'gatsby-remark-prismjs',
    options: {
      classPrefix: 'language-',
      inlineCodeMarker: '>',
      aliases: {},
      showLineNumbers: true,
      noInlineHighlight: false,
    },
  },
  'gatsby-remark-smartypants',

  {
    resolve: 'gatsby-remark-katex',
    options: {
      // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
      strict: 'warn',
      // displayMode: true,
    },
  },
  {
    resolve: 'gatsby-remark-autolink-headers',
    options: {
      className: 'post-toc-anchor',
    },
  },
  {
    resolve: 'gatsby-remark-images',
    options: {
      // It's important to specify the maxWidth (in pixels) of
      // the content container as this plugin uses this as the
      // base for generating different widths of each image.
      maxWidth: 800,
    },
  },
];

module.exports = {
  pathPrefix: siteCfg.pathPrefix,
  __experimentalThemes: ['gatsby-theme-defaults'],
  siteMetadata: {
    siteUrl: siteCfg.siteUrl + pathPrefix,
    siteNavTitle: siteCfg.siteNavTitle,
    siteTitleLong: siteCfg.siteTitleLong,
    siteDescription: siteCfg.siteDescription,
    siteKeywords: siteCfg.siteKeywords,

    author: siteCfg.userTwitter,
    logoText: siteCfg.siteLogoText,
    copyrights: siteCfg.siteCopyrights,
    logo: {
      src: siteCfg.siteLogo,
      alt: '',
    },

    postsPerPage: siteCfg.theme.PostsPerPage,
    showMenuItems: siteCfg.theme.ShowMenuItems,
    menuMoreText: siteCfg.theme.MenuMoreText,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Source Serif Pro', 'Source Sans Pro'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        javascriptEnabled: true,
        modifyVars: siteCfg.theme.modifyVars,
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-lodash',
    {
      resolve: 'gatsby-mdx',
      options: {
        defaultLayouts: {
          guides: require.resolve('./src/templates/guidePageTemplate.js'),
          blogposts: require.resolve('./src/templates/blogPostTemplate.js'),
          default: require.resolve('./src/components/main-layout.js'),
        },
        extensions: ['.mdx'],
        gatsbyRemarkPlugins: gbRemarkPluginsList,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-typography',
    //   options: {
    //     pathToConfigModule: 'src/utils/typography.js',
    //   },
    // },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-transformer-json',
      options: {
        typeName: ({ node }) => _.last(path.parse(node.absolutePath).dir.split('/')),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'menuItems',
        path: `${__dirname}/SiteCfg/json/MenuItems`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'guideTOC',
        path: `${__dirname}/SiteCfg/json/GuideTOC`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'guides',
        path: `${__dirname}/contents/guides`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blogposts',
        path: `${__dirname}/contents/blogposts`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteCfg.siteTitleShort,
        short_name: siteCfg.siteTitleShort,
        description: siteCfg.siteDescription,
        start_url: siteCfg.pathPrefix,
        background_color: siteCfg.theme.BackgroundColor,
        theme_color: siteCfg.theme.PrimaryColor,
        display: siteCfg.siteDisplay,
        icon: siteCfg.favicon,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: `<!--excerpt-->`,
        plugins: gbRemarkPluginsList,
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public|themeforest)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    'gatsby-plugin-remove-trailing-slashes',
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          siteCfg.googleAnalyticsID, // Google Analytics / GA
          // 'AW-CONVERSION_ID', // Google Ads / Adwords / AW
          // 'DC-FLOODIGHT_ID', // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared accross all trackingIds
        // gtagConfig: {
        //   optimize_id: 'OPT_CONTAINER_ID',
        //   anonymize_ip: true,
        //   cookie_expires: 0,
        // },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ['/preview/**', '/do-not-track/me/too/'],
        },
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: ['title', 'menuTitle', 'slug', 'guideName', 'excerpt', 'content'],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          Mdx: {
            title: node => node.fields.pageTitle,
            excerpt: node => node.excerpt,

            menuTitle: node => node.fields.sideMenuHeading,
            slug: node => node.fields.slug,
            content: node => node.rawMarkdownBody,
            guideName: node => node.fields.guideName,
          },
          MarkdownRemark: {
            title: node => node.fields.pageTitle,
            excerpt: node => {
              const length = 136;
              const tree = remark().parse(node.rawMarkdownBody);
              let excerpt = '';
              visit(tree, 'text', n => {
                excerpt += n.value;
              });
              return `${excerpt.slice(0, length)}...`;
            },

            menuTitle: node => node.fields.sideMenuHeading,
            slug: node => node.fields.slug,

            content: node => node.rawMarkdownBody,
            guideName: node => node.fields.guideName,
          },
        },
      },
    },
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId: siteCfg.googleAnalyticsID,
    //     // Puts tracking script in the head instead of the body
    //     // head: false,
    //     // Setting this parameter is optional
    //     // anonymize: false,
    //     // Setting this parameter is also optional
    //     respectDNT: true,
    //     // Avoids sending pageview hits from custom paths
    //     // exclude: ['/preview/**', '/do-not-track/me/too/'],
    //     // Enables Google Optimize using your container Id
    //     // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
    //     // Enables Google Optimize Experiment ID
    //     // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
    //     // Set Variation ID. 0 for original 1,2,3....
    //     // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
    //     // Any additional create only fields (optional)
    //     // sampleRate: 5,
    //     // siteSpeedSampleRate: 10,
    //     // cookieDomain: "example.com",
    //   },
    // },
  ],
};
