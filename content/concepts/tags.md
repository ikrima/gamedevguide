---
title: "Tags"
meta_title: "Using Tags – Filter and organise your content"
meta_description: "Discover how to use the primary taxonomy within Ghost for filtering and organising content with ease, control design, and drive automation within your site."
keywords:
    - concepts
    - ghost
    - publishing
    - tags
sidebar: "concepts"
---

Tags are the primary taxonomy within Ghost for filtering and organising the relationships between your content.

Right off the bat, probably the best way to think about tags in Ghost is like labels in GMail. Tags are a powerful, dynamic taxonomy which can be used to categorise content, control design, and drive automation within your site.


## Tag types

Tags are much more than just simple keywords - there are several different ways of using them to accomplish a variety of use-cases.

### Regular tag

All tags come with their own data object and can have a title, description, image and meta data. Ghost Handlebars Themes will automatically generate tag archive pages for any tags which are assigned to active posts. For example all posts tagged with `News` will appear on `example.com/tag/news/`, as well as in the automatically generated XML sitemap.

### Primary tag

Ghost has a concept of `primary_tag`, used simply to refer to the very first tag which a post has. This is useful for when you want to return a singular, most-important tag rather than a full array of all tags assigned to a post.

### Internal tag

Tags which are prefixed by a `#` character, otherwise known as hashtags, are internal tags within Ghost - which is to say that they aren't rendered publicly. This can be particularly useful when you want to drive particular functionality based on a tag, but you don't necessarily want to output the tag for readers to see.


## Example usage

As a quick example of how you might use tags, let's look at a quick example of a Hollywood news site which is publishing a post about Ryan Reynolds being announced as the lead in a new movie called "Son of Deadpool".

![Tags](../images/concepts/tags.png)

Here the post has 4 tags:

- `Breaking news` - The **primary tag**
- `Ryan Reynolds` - A regular tag
- `New Releases` - A regular tag
- `#feature` - An internal tag

The front-end of the site has configured a rotating banner on the homepage to pull the latest 3 posts from the `Breaking News` category and highlight them right at the top of the page with a **Breaking News** label beside the byline.

The `Ryan Reynolds` and `New Releases` tags generate archives so that readers can browse other stories in the same categories, as well as their own sitemaps.

The `#feature` tag is used by the front-end or theme-layer as a conditional flag for activating specific formatting. In this instance the Deadpool PR team have supplied some marketing material including a giant wallpaper image which would make a great background, so the post is tagged with `#feature` to push the post image to be full bleed and take over the whole page.

You can see this use-case in action on the main Ghost blog. Here's [a regular post](https://ghost.org/blog/image-galleries/), and here's a [#feature](https://ghost.org/blog/5/). The design of the post reacts to the tags.


## Tag archives

All actively used public tags (so, those not prefixed with `#`) generate automatic tag archives within Ghost Handlebars Themes. Tag archives are automatically added to the Google XML Sitemap, and have their own pagination and RSS feeds.

Here's an example of an [tag archive](https://demo.ghost.io/tag/getting-started/) in the default Ghost Theme:

[![Tag Archive](../images/concepts/tag-archive.jpg)](https://demo.ghost.io/tag/getting-started/)

Tag archives are only generated for tags which are assigned to published posts, any other tags are not publicly visible.


## Sample API data

Here's a sample tag object from the Ghost [Content API](/api/content/):

`embed:api/v2/content/demo/tags.json`
