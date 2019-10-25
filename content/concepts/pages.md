---
title: "Pages"
meta_title: "Using Pages – Create static pages in Ghost"
meta_description: "Decide whether your content is a page or a post with one click and build static independent content like an 'About' or a 'Contact' page with ease."
keywords:
    - concepts
    - ghost
    - publishing
    - pages
sidebar: "concepts"
---

Pages are a subset of posts which are excluded from all feeds.

While posts are used for grouped content which is generally published regularly like blog posts or podcast episodes, pages serve as a separate entity for static and generally independent content like an `About` or `Contact` page.

Inside Ghost-Admin, any post can be turned into a page by checking the relevant box at the bottom of the Post Settings Menu. Equally, within the Content API, a page is just a post with a parameter of `"page": true`.


## What's different about pages?

Pages are only ever published on the slug which is given to them, and do not automatically appear anywhere on your site. While posts are displayed in the index collection, within RSS feeds, and in author and tag archives - pages are totally independent. The only way people find them is if you create manual links to them either in your content or your navigation.

Here's an example of a [page](https://demo.ghost.io/about/) in the default Ghost Theme:

[![Page](../images/concepts/page.jpg)](https://demo.ghost.io/about/)


## Custom templates

If using one of Ghost's default [Handlebars Themes](/api/handlebars-themes/), a common usecase for pages is to give them custom templates.

As well as a regular `page.hbs` default template, you can also create generic reusable custom templates like `page-wide.hbs` - or page-specific templates based on a particular slug, like `page-about.hbs` - so that you have fine-grained control over what markup is used to render your data.

Not much else to say about pages, let's move right along.
