const ColorsConsts = {
  WhitePoint: '#f8f8f8',
  BlackPoint: '#000000',
  Cyan: '#01bcd4',
  Green: '#66bb6a',
};

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
  siteBanner: 'static/bebylon-icon.png', // Your image for og:image tag. You can find it in the /static folder
  siteLogo: 'static/bebylon-icon.png', // Image for schemaORGJSONLD
  siteDisplay: 'minimal-ui', // "minimal-ui"
  siteLogoText: 'K&L GameDev Guide',
  siteCopyrights: '',
  favicon: 'static/bebylon-icon.png', // Your image for favicons. You can find it in the /src folder
  author: '@ikrima', // Author for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@ikrimae', // Twitter Username - Optional
  ogSiteName: 'KiteLightning', // Facebook Site Name - Optional
  ogLanguage: 'en_US', // Facebook Language
  googleAnalyticsID: 'UA-47614715-1',

  // Social Media Links
  repoURL: 'https://github.com/ikrima/gamedevguide',
  devRepoURL: 'https://github.com/ikrima/gamedevguide',
  twitterURL: 'https://twitter.com/ikrimae',

  defaultSortIndex: 999,
  inlineSearchResultMax: 10,

  theme: {
    // Manifest and Progress color
    // See: https://developers.google.com/web/fundamentals/web-app-manifest/

    // PrimaryColor: '@geekblue-6',
    PrimaryColor: '#6b23ae',
    BackgroundColor: ColorsConsts.WhitePoint,

    DefaultTheme: 'dark',
    DarkVariant: 'dark',
    LightVariant: 'light',
    PostsPerPage: 5,
    ShowMenuItems: 4,
    MenuMoreText: 'Show more',
    modifyVars: {},
    bodyFontFamily:
      '"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    headerFontFamily:
      '"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',

    sidebarMenuWidth: 300,
    sidebarIndent: 12,
    guideContentMaxWidth: 1140,
    breakpoint: 'lg',
  },
};

// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
SiteCfg.theme.modifyVars = {
  white: ColorsConsts.WhitePoint,
  black: ColorsConsts.BlackPoint,
  'primary-color': SiteCfg.theme.PrimaryColor, // primary color for all components

  'font-family-no-number': SiteCfg.theme.bodyFontFamily,
  'font-family': '@font-family-no-number',

  'body-background': SiteCfg.theme.BackgroundColor,
  'component-background': SiteCfg.theme.BackgroundColor,
  'layout-body-background': SiteCfg.theme.BackgroundColor,
  'layout-sider-background-light': SiteCfg.theme.BackgroundColor,
  'background-color-base': SiteCfg.theme.BackgroundColor, // Default grey background color
  'background-color-light': `lighten(${SiteCfg.theme.BackgroundColor}, 2%)`, // background of header and selected item

  // -------- Colors -----------
  // 'info-color': ColorsConsts.Cyan, // cyan
  // 'success-color': ColorsConsts.Green, // green
  // 'processing-color': '@blue-6',
  // 'error-color': '@red-5', // #ff4d4f
  // 'highlight-color': '@red-5',
  // 'warning-color': '@gold-5', // #ffc53d
  // 'normal-color': '#d9d9d9',

  // 'line-height-base': '1.714285714285714', // 24px

  // // Base Scaffolding Variables
  // // ---

  // 'border-radius-base': '6px',

  // // ICONFONT
  // // @icon-url               : "/vendors/antd/iconfont/iconfont"; // By default it use alicdn.com
  // 'menu-dark-bg': ColorsConsts.BlackPoint,
  // 'menu-dark-submenu-bg': `darken(${ColorsConsts.BlackPoint}, 3%)`,
};

module.exports = SiteCfg;
