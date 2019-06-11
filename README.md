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

- Upgrade

```shell
gatsby info
node -v
npm -v
npm update -g gatsby ; upgrade gatsby globally
npm update --dev ; update all packages in project
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