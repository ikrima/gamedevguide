[![Netlify Status](https://api.netlify.com/api/v1/badges/b04d49f2-9006-49ee-9f9a-569f59732aff/deploy-status)](https://app.netlify.com/sites/gamedevguide/deploys)

# Game Development Notes

# Roadmap

- [x] Add typescript
- [x] Remove Redux
- [x] General simplifications
- [x] Convert all markdown files to kebab case
- [ ] Add search
- [ ] Perf: Use Emotion - https://jenniferwadella.com/blog/all-the-dumb-mistakes-i-made-building-my-first-gatsby-site
- [ ] Perf: Image Optimization - https://medium.com/@kyle.robert.gill/ridiculously-easy-image-optimization-with-gatsby-js-59d48e15db6e

# Notes To Myself
## Bootstrap Install:
cinst -y nodejs
cinst -y yarn
npm install -g gatsby-cli
npm install -g yarn

## OneNote Conversion
 - cinst -y pandoc
 - OneNote 2016 + OneNoteBatch to batch export to docx/html
 - Get-ChildItem -Path "./process_pendingdocx/*.docx" | % {pandoc --extract-media "process_markdown/assets" -s $_.FullName --wrap=none --reference-links -t markdown_strict -o "process_markdown/$($_.BaseName).md" }
   - Can also use commonmark or gfm as markdown flavors
 - Typora & StackEdit are great markdown editors

## Gatsby Notes
gatsby new gamedevguide https://github.com/ikrima/gamedevguide (or git clone + yarn)
gatsby develop (yarn develop)
gatsby build
gatsby serve
`http://localhost:8000`
`http://localhost:8000/___graphql`

# Useful Examples:
  - This theme (already bought) to copy paste styling: http://iarouse.com/dist-react-ant-design/v1.1.4/#/app/layout/page
  - https://using-remark.gatsbyjs.org/ & https://github.com/gatsbyjs/gatsby/tree/master/examples/using-remark
  - https://github.com/LekoArts/gatsby-starter-minimal-blog
  - https://mkdevdiary.netlify.com/gatsby-plugins-seo-and-images
  - http://github.com/kyleamathews/blog
  - gatsby-remark-external-links
  - Ant Design Pro: http://pro.ant.design/docs/use-components-alone
  - Ant Design Kitchen Sink: http://kitchen.alipay.com/

# TODO notes
check headerHeight
    \src\components\Container\Container.js
    \src\components\ResponsiveAnchor\ResponsiveAnchor.js
    \src\components\ResponsiveSidebar\ResponsiveSidebar.js
    \src\components\ResponsiveTopBar\ResponsiveTopBar.js

check getHeaderHeightState
    getFooterHeightState

<div className="container">

tags template
antd
.path
.title