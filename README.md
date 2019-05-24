[![Netlify Status](https://api.netlify.com/api/v1/badges/b04d49f2-9006-49ee-9f9a-569f59732aff/deploy-status)](https://app.netlify.com/sites/gamedevguide/deploys)

# Game Development Notes

## Guides

- [x] Conversion scripts from onenote/trillium to custom central store
- [ ] UE4
  - [x] Environment Setup
  - [ ] Build Guide
  - [ ] Packaging
  - [ ] Source Control
  - [ ] Gameplay
  - [ ] Editor Extensions
  - [ ] Tooling
  - [ ] Engine Programming
  - [ ] Rendering
- [ ] Graphics
- [ ] Programming
- [ ] Houdini

# Notes To Myself

## Bootstrap Install
- Installing

```shell
cinst -y nodejs
cinst -y yarn
npm install -g gatsby-cli
npm install -g yarn
```

- Building

```shell
npm run dev
npm run develop ; clean & start develop environment
npm run build & npm run serve
```

- Misc commands

```shell
npm run lint
npm run lint:fix
npm run format:js
npm run format:md
npm run format:mdx
npm run formatp:md   ; this uses prettier which isnt as configurable
npm run formatp:mdx  ; this uses prettier which isnt as configurable
```

## OneNote Conversion

- cinst -y pandoc
- OneNote 2016 + OneNoteBatch to batch export to docx/html
- Get-ChildItem -Path "./process*pendingdocx/\*.docx" | % {pandoc --extract-media "process_markdown/assets" -s \$*.FullName --wrap=none --reference-links -t markdown*strict -o "process_markdown/$($*.BaseName).md" }
  - Can also use commonmark or gfm as markdown flavors
- Typora & StackEdit are great markdown editors

## Gatsby Notes

```shell
gatsby new gamedevguide https://github.com/ikrima/gamedevguide (or git clone + yarn)
gatsby develop (yarn develop)
gatsby build
gatsby serve
`http://localhost:8000`
`http://localhost:8000/___graphql`
```

# Useful Examples:

- This theme (already bought) to copy paste styling: http://iarouse.com/dist-react-ant-design/v1.1.4/#/app/layout/page
- https://using-remark.gatsbyjs.org/ & https://github.com/gatsbyjs/gatsby/tree/master/examples/using-remark
- https://github.com/LekoArts/gatsby-starter-minimal-blog
- https://mkdevdiary.netlify.com/gatsby-plugins-seo-and-images
- http://github.com/kyleamathews/blog
- https://github.com/ericwindmill/gatsby-starter-docs
- gatsby-remark-external-links
- Ant Design Pro: http://pro.ant.design/docs/use-components-alone
- Ant Design Kitchen Sink: http://kitchen.alipay.com/