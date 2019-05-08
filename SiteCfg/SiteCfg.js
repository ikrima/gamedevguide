const SiteCfg = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteNavTitle: 'K&L GameDev Guide', // Navigation
  siteTitleShort: 'K&L GameDev Guide', // Site Title
  siteTitleLong: 'K&L/Bebylon Battle Royale: GameDev & Unreal Engine Programming Guide', // Alternative Site title for SEO
  siteDescription: 'GameDev & Unreal Engine Programming Guide.', // Your site description
  siteKeywords:
    'unreal, unreal-engine, ue4, gamedev, guide, programming, unrealengine, houdini, houdini-engine, houdini-digital-assets, houdini-plugin, unreal-engine-4, unreal-engine-plugin, graphics, graphics-programming, graphics-rendering, rendering',
  siteTitleManifest: 'GameDevGuide',
  siteUrl: 'https://bebylon.dev', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteHeadline: 'GameDev & Unreal Engine Programming Guide', // Headline for schema.org JSONLD
  siteBanner: 'src/images/bebylon-icon.png', // Your image for og:image tag. You can find it in the /static folder
  siteLogo: 'src/images/bebylon-icon.png', // Image for schemaORGJSONLD
  siteDisplay: 'minimal-ui', // "minimal-ui"
  siteLogoText: 'K&L GameDev Guide',
  siteCopyrights: '',
  favicon: 'src/images/bebylon-icon.png', // Your image for favicons. You can find it in the /src folder
  author: '@ikrima', // Author for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@ikrimae', // Twitter Username - Optional
  ogSiteName: 'KiteLightning', // Facebook Site Name - Optional
  ogLanguage: 'en_US', // Facebook Language
  googleAnalyticsID: 'UA-47614715-1',

  // Social Media Links
  repoURL: 'https://github.com/kitelightning/gamedevguide',
  devRepoURL: 'https://github.com/ikrima/gamedevguide',
  twitterURL: 'https://twitter.com/ikrimae',

  defaultSortIndex: 999,
  inlineSearchResultMax: 5,

  theme: {
    // Manifest and Progress color
    // See: https://developers.google.com/web/fundamentals/web-app-manifest/
    Color: '#292a2d',
    BackgroundColor: '#292a2d',
    DefaultTheme: 'dark',
    DarkVariant: 'dark',
    LightVariant: 'light',
    PostsPerPage: 5,
    ShowMenuItems: 4,
    MenuMoreText: 'Show more',
    modifyVars: {},

    sidebarMenuWidth: 300,
    sidebarIndent: 12,
    guideContentMaxWidth: 1140,
    breakpoint: 'lg',
  },
}

SiteCfg.theme.modifyVars = {
  // "font-family":            "Arial",
  'layout-body-background': SiteCfg.theme.BackgroundColor,
  'primary-color': SiteCfg.theme.Color, // primary color for all components
  // "link-color":             "#1890ff",                            // link color
  // "success-color":          "#52c41a",                            // success state color
  // "warning-color":          "#faad14",                            // warning state color
  // "error-color":            "#f5222d",                            // error state color
  // "font-size-base":         "14px",                               // major text font size
  // "heading-color":          "rgba(0, 0, 0, .85)",                 // heading text color
  // "text-color":             "rgba(0, 0, 0, .65)",                 // major text color
  // "text-color-secondary":   "rgba(0, 0, 0, .45)",                 // secondary text color
  // "disabled-color":         "rgba(0, 0, 0, .25)",                 // disable state color
  // "border-radius-base":     "4px",                                // major border radius
  // "border-color-base":      "#d9d9d9",                            // major border color
  // "box-shadow-base":        "0 2px 8px rgba(0, 0, 0, .15)",       // major shadow for layers
}

module.exports = SiteCfg
