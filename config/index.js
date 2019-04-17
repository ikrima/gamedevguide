module.exports = {
  pathPrefix:        "/", // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle:         "GameDev Guide", // Navigation and Site Title
  siteTitleAlt:      "GameDev & Unreal Engine Programming Guide", // Alternative Site title for SEO
  siteTitleLong:     'K&L/Bebylon Battle Royale: Dev Guide',
  siteTitleManifest: "GameDevGuide",
  siteUrl:           "https://bebylon.dev", // Domain of your site. No trailing slash!
  siteLanguage:      "en", // Language Tag on <html> element
  siteHeadline:      "GameDev & Unreal Engine Programming Guide", // Headline for schema.org JSONLD
  siteBanner:        "src/images/bebylon-icon.png", // Your image for og:image tag. You can find it in the /static folder
  favicon:           "src/images/bebylon-icon.png", // Your image for favicons. You can find it in the /src folder
  siteDescription:   "GameDev & Unreal Engine Programming Guide.", // Your site description
  author:            "@ikrima", // Author for schemaORGJSONLD
  siteLogo:          "src/images/bebylon-icon.png", // Image for schemaORGJSONLD
  siteDisplay:       "standalone", //"minimal-ui"

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter:       "@ikrimae", // Twitter Username - Optional
  ogSiteName:        "KiteLightning", // Facebook Site Name - Optional
  ogLanguage:        "en_US", // Facebook Language
  googleAnalyticsID: "UA-47614715-1",

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor:           "#292a2d",
  themeBackgroundColor: "#292a2d",

  themeLogoText:      "hello friend",
  themeDefaultTheme:  "dark",
  themeCopyrights:    "",
  themePostsPerPage:  5,
  themeShowMenuItems: 4,
  themeMenuMoreText:  "Show more",
}
