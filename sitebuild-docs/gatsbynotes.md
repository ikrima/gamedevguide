# Notes To Myself

## Bootstrap Install

- Installing/Upgrade nodejs (upgrade is the same as installing a new nodejs version)

  From Powershell eleveated prompt:
  ```shell

  cinst -y nvm.portable
    nvm install 10.16.0
    nvm install latest

  nvm use 10.16.0 (or for each nodejs installation bc you globally installed modules arent shared)
    npm install -g npm@latest
    ; !!!!!! IMPORTANT
    ; CAREFUL WITH THIS ONE: It does unbelievably dumb fucking shit like wreck your user path and then adds python27 directory to that path variable, wrecking existing python installs
    npm install -g windows-build-tools
    npm install -g gatsby-cli
  ```

- Upgrade Gatsby

  ```shell
  npm outdated ;  to identify new releases for all your dependencies
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
- Tools
  - GitBook - Careful not to use V2
    - https://www.gitbook.com/ 
  - MkDocs https://www.mkdocs.org/
    - Material For MkDocs: https://squidfunk.github.io/mkdocs-material/
  - Useful links:
    - Comparison [https://blog.strapi.io/gitbook-open-source-documentation/](https://blog.strapi.io/gitbook-open-source-documentation/)

- OneNote Export
  - Look at bookmark OneNote folder in firefox
  - Batch export:
    - Export to Word OneNote Batch: https://www.onenotegem.com/onenote-batch.html
    - OneNote Gem: https://www.onenotegem.com/gem-for-onenote.html
  - onenote-export https://github.com/Sjlver/onenote-export

- Conversion To New Format
  - gitbook convert: https://github.com/GitbookIO/gitbook-convert
  - Pandoc: (https://pandoc.org/) to convert from word/pdf to markdown

# Gatsby Notes

## Cheatsheet

```shell
gatsby new gamedevguide https://github.com/ikrima/gamedevguide (or git clone + yarn)
gatsby develop (yarn develop)
gatsby build
gatsby serve
`http://localhost:8000`
`http://localhost:8000/___graphql`
```

## Notes

- Gatsby Guides
  - Lifecycle: <https://medium.com/narative/understanding-gatsbys-lifecycle-31c473ba2f2d>

- Useful Examples
  - Narative.co: https://github.com/narative/narative.co
    - Has example of modal shortcut key launcher
  - https://gatsby-docz.netlify.com/docs/
  - https://using-remark.gatsbyjs.org/ & https://github.com/gatsbyjs/gatsby/tree/master/examples/using-remark
  - https://github.com/LekoArts/gatsby-starter-minimal-blog
  - https://mkdevdiary.netlify.com/gatsby-plugins-seo-and-images
  - http://github.com/kyleamathews/blog
  - Advanced Gatsby starter with better performance: https://github.com/ericwindmill/gatsby-starter-docs
  - gatsby-remark-external-links
  - Ant Design Pro: http://pro.ant.design/docs/use-components-alone
  - Ant Design Kitchen Sink: http://kitchen.alipay.com/

----------------

# Webdev

## Webdev bs Pt 3

- [ ] Algolia Search integration
  - [ ] Still need the fast elasticlunar search component to be available. For now, can you add a config var in SiteCfg.js to toggle whether the site is built with the algolia component vs elastic lunr
  - [ ] https://blog.tability.io/switching-to-documentation-as-code-with-gatsby-js-and-netlify-search-analytics-3-3/
- [ ] #Perf: Sidebar search is slow.
    - This is probably bc of the hierarchy construction of the sidebar and related to the other perf issues. This can happen just once during the build process and cache it into a generated json as an easy solution.
- [ ] Webpage's title tag != the current page title
    - [ ] What other SEO/sitemap/etc things need to be done?
- [ ] Sidebar doesn't respond to touch controls on mobile/ipad
- [ ] Integrate Jeri image viewer for use in mdx: https://jeri.io/
- [ ] #Perf: The site responsiveness in clicking around is sluggish compared to how fast it should be (ignoring initial load)
    - [ ] This is the level of site responsiveness to reach: Live Site: https://gatsby-docs-starter.netlify.com/lesson-one & Source: https://github.com/ericwindmill/gatsby-starter-docs
        - Ofcourse look at the code or perf profile, but some thoughts on what it could be:
            - Might be reloading the entire page
            - Some expensive initialization might be reperformed on every page click vs being persistent
            - Some advanced gatsby configuration settings might be set wrong. For example, the gatsby starter used for our site was the basic gatsby starter while the Gatsby Docs Starter used the Gatsby Advanced Starter. In the [Readme](https://github.com/ericwindmill/gatsby-starter-docs), it references "fast loading times thanks to pre-rendered HTML & automatic chunk loading of JS files"
            - Defintely seems evident that it's reloading the entire page or sidebar as you click around. If you sync to #4f5ce285417af3ae9be19521d5aacc36a5e2d271 with the bug of autoexpanding sidebar, you can notice it
- [ ] Add Blog section
    - Use netlify CMS: <https://www.netlifycms.org/docs/gatsby/> <https://www.gatsbyjs.org/docs/sourcing-from-netlify-cms/>

## Webdev bs Pt 4

- [ ] CSS help: https://css-tricks.com/snippets/css/a-guide-to-flexbox/ http://grid.malven.co/ https://visme.co/blog/layout-design/
- [ ] Further prettification: Look at css styling from https://casual-effects.com/markdeep/#examples
- [ ] Add autodemarcation of notes still to be fully transitioned
- [ ] Paginate search results
- [ ] #Perf: Use Emotion - https://jenniferwadella.com/blog/all-the-dumb-mistakes-i-made-building-my-first-gatsby-site
- [ ] #Perf: Image Optimization - https://medium.com/@kyle.robert.gill/ridiculously-easy-image-optimization-with-gatsby-js-59d48e15db6e
- [ ] #Visual: Find a decent visual theme for markdown (https://github.com/pedronauck/gatsby-starter-docz)
- [ ] Prettify site with Gatsby Theme support: Examples
      - https://medium.com/@kyle.robert.gill/a-simple-guide-to-gatsbyjs-themes-a4f9765c5ac7
      - https://www.christopherbiscardi.com/post/running-a-gatsby-starter-as-a-theme
      - https://github.com/jannikbuschke/gatsby-antd-docs
      - https://github.com/apollographql/gatsby-theme-apollo/tree/master/packages/gatsby-theme-apollo-docs
      - https://github.com/alxshelepenok/gatsby-starter-lumen
      - https://unrealartoptimization.github.io/
- [ ] Edit on github sidebar link for markdown pages

----------------

## Webdev bs Pt 2

- [x] Autoexpand sidebar when someone goes to a page directly
- [x] Remove Ant Admin Theme and choose a UI system
  - [x] Material UI:
    - This looks like it has an easy integration with Gatsby and easy styling support
    - If it'd be fast to update the code from ant design to this, I'd prefer this
    - https://www.gatsbyjs.org/packages/gatsby-plugin-material-ui/
  - [x] Ant Design UI System **_(choosing this)_**
    - The other option is to stick with Ant Design.
    - Here's an example integration with gatsby: https://github.com/jannikbuschke/gatsby-antd-docs
- [x] Add search bar on the left column to search headings (example: https://gatsby-docz.netlify.com/docs/)
- [x] Make submenu headings in sidebar more noticable and more vertically more compact
- [x] #Perf: The site responsiveness in clicking around is sluggish compared to how fast it should be
    - [x] This should also not reset the scroll position of the sidebar toc menu
- [x] Improve the search components
    - [x] Inline seach should display a list of excerpts and highlights
    - [x] Search results page should also display excerpts and highlights
    - [x] Allow search for specific guides
- [x] Add support for ordering between sidebar toc submenu headers and site pages

## Webdev bs Pt 1

- [x] Site should work on mobile
  - [x] Button to open Left Sidebar TOC drawer does not appear in mobile view
  - [x] ~~Left sidebar menu should be collapsed~~
  - [x] ~~Page TOC right sidebar menu should go away~~
- [x] ~~Regression of syntax highlighting no longer working~~
- [x] ~~Remove Redux~~
- [x] ~~General simplifications~~
- [x] ~~Convert all markdown files to kebab case~~
- [x] ~~Visual: Make sidebar collapsible~~
- [x] ~~Visual: Fix CSS typography for content. Looks like CSS fighting each other. The main guide content should match the styling of the St. Annes preset in https://kyleamathews.github.io/typography.js/~~
    - ~~Specifically, the margins around headings & paragraphs is zero on the site~~
- [x] Visual: When you click to another page in a guide, the sidebar menu's headers will reset to their default state (fully toggled open and expanded). Instead, the menu state should persist from page to page. (Ex: click on some of the menu headers to collapse them. Then navigate to another page in the guide. The headers that you collapsed should stay collapsed)
- [x] ~~Add search - https://www.gatsbyjs.org/docs/adding-search/~~
  - [x] ~~Use elastic lunr & corresponding gatsby plugin~~
  - [x] ~~Should support partial matches, searching titles, and content of guides md file~~
  - [x] ~~Add Ant design Search react component in header~~
    - [x] ~~First 5 results should show up in a pop up~~
    - [x] ~~Should have button to click it to open to another search results page with all the results~~
    - [x] ~~Search should groupby guides~~
