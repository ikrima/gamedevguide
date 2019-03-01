---
title: Contents
root: "/docs"
parents: ["Guide"]
---
<h1 align="center">
  Contents
</h1>

## Source of contents

  All contents are stored under `/contents`. To change the root path, modify the following part in `gatsby-config.js`, simply by replace the `path` of it.

  ```sh
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `contents`,
      path: `${__dirname}/contents`
    }
  }
  ```

## Information of the page

We store the information of the page on the top of the markdown files used to generate sidebar, which currently includes the following infomation:
* `title`: the title of the page
* `date`: the date created
* `root`: root of the pages should show in the sidebar (based on the path under `/contents`)
* `parents`: parents of the page in the sidebar (the format show be `array`,top-down ordered).

### Example
The current page have the following infomation on the top of the file:

```sh
---
title: Contents
root: "/docs"
parents: ["Guide"]
---
```
The path of this file is `/contents/docs/guide/contents.md`. Since the root is `/docs`, all pages under this path will be showing in the sidebar. Some information is not used (i.e. date), so this file don't have it.

## Important to notice!
The path of the pages will automatically generated based on the root folder. However, Gatsby will also automatically gererate pages under `/src/components/pages`, so you cannot have the markdown file with the same name under the root folder.