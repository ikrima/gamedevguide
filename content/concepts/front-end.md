---
title: "Front-end"
meta_title: "Ghost front-end - Use any framework or custom front-end"
meta_description: "Ghost ships with it's own powerful Handlebars.js theme layer – or you can use a static site generator or custom front-end via the Ghost API. Read more!"
keywords:
    - concepts
    - ghost
    - publishing
    - front-end
sidebar: "concepts"
---

Ghost is a full headless CMS which is completely agnostic of any particular front end or static site framework.

Just like Ghost's admin client, its front-end is both optional and interchangeable. While Ghost's early architecture represented more of a standard monolithic web-app, it's now compatible with just about any front-end you can throw at it.

It doesn't even have to be a website!


## Handlebars Themes

Ghost ships with its own [Handlebars.js](/api/handlebars-themes/) theme layer served by an Express.js webserver, so out of the box it automatically comes with a default front-end. This is a really fast way to get a site up and running, and despite being relatively simple Handlebars is both powerful and extremely performant.

Ghost Handlebars Themes have the additional benefit of being fairly widely adopted since the platform first launched back in 2013, so there's a broad [third party marketplace](https://ghost.org/marketplace) of pre-built themes as well as [extensive documentation](/api/handlebars-themes/) on how to build a custom theme.


## Static Site Generators

Thanks to its decoupled architecture Ghost is also compatible with just about any of the front-end frameworks or static site generators which have become increasingly popular thanks to being fun to work with, extremely fast, and more and more powerful as the JAMstack grows in maturity. So it works with the tools you already use.

This very documentation site is running on a [Gatsby.js](/api/gatsby/) front-end, connected to both **Ghost** and **GitHub** as content sources, hosted statically on [Netlify](https://netlify.com) with dynamic serverless functions powered by [AWS Lambda](https://aws.amazon.com/lambda/) (like the feedback form at the bottom of this page). It's a brave new world!

We're working on greatly expanding our range of documentation, tools and SDKs to better serve the wider front-end development community.


## Custom front-ends

Of course you can also just build your own completely custom front-end, too. Particularly if you're using the Ghost API as a service to drive content infrastructure for a mobile or native application which isn't based on the web.
