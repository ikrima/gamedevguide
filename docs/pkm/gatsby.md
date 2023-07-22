# Gatsby Cheatsheet

## Setup

- Installing
  `nodejs` upgrade is the same as installing a new nodejs version
  From Powershell elevated prompt:
  
  ```powershell
  cinst -y nvm.portable
  nvm install 10.16.0
  nvm install latest
  
  nvm use 10.16.0 # (or for each nodejs installation bc you globally installed modules arent shared)
  npm install -g npm@latest
  # !!!!!! IMPORTANT
  # CAREFUL WITH THIS ONE: It does unbelievably dumb fucking shit like wreck your user path and then adds python27 directory to that path variable, wrecking existing python installs
  npm install -g windows-build-tools
  npm install -g gatsby-cli
  ```

- Upgrade Gatsby
  
  ```bash
  npm outdated         # to identify new releases for all your dependencies
  gatsby info
  node -v
  npm -v
  npm update -g gatsby # upgrade gatsby globally
  npm update --dev     # update all packages in project
  ```

- Building
  
  ```bash
  npm run dev
  npm run develop # clean & start develop environment
  npm run build & npm run serve
  ```

- Misc Commands
  
  ```bash
  npm run lint
  npm run lint:fix
  npm run format:js
  npm run format:md
  npm run format:mdx
  npm run formatp:md   # this uses prettier which isnt as configurable
  npm run formatp:mdx  # this uses prettier which isnt as configurable
  ```

## Usage

```bash
gatsby new gamedevguide https://github.com/ikrima/gamedevguide (or git clone + yarn)
gatsby develop (yarn develop)
gatsby build
gatsby serve
`http://localhost:8000`
`http://localhost:8000/___graphql`
```

## Reference

- Gatsby Guides
  
  - Lifecycle: <https://medium.com/narative/understanding-gatsbys-lifecycle-31c473ba2f2d>
- Useful Examples
  
  - Narative.co: <https://github.com/narative/narative.co>
    - Has example of modal shortcut key launcher
  - <https://gatsby-docz.netlify.com/docs/>
  - <https://using-remark.gatsbyjs.org/> & <https://github.com/gatsbyjs/gatsby/tree/master/examples/using-remark>
  - <https://github.com/LekoArts/gatsby-starter-minimal-blog>
  - <https://mkdevdiary.netlify.com/gatsby-plugins-seo-and-images>
  - <http://github.com/kyleamathews/blog>
  - Advanced Gatsby starter with better performance: <https://github.com/ericwindmill/gatsby-starter-docs>
  - gatsby-remark-external-links
  - Ant Design Pro: <http://pro.ant.design/docs/use-components-alone>
  - Ant Design Kitchen Sink: <http://kitchen.alipay.com/>
