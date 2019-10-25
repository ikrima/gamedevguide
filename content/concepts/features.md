---
title: "Features"
meta_title: "Ghost Features - Customisable professional publishing software"
meta_description: "Discover the powerful features built directly into Ghost's core software, including a developer friendly API, rich editor, custom themes, apps & integrations!"
keywords:
    - concepts
    - ghost
    - publishing
    - features
sidebar: "concepts"
---

Ghost comes with powerful features built directly into the core software which can be customised and configured based on the needs of each individual site.

Here's a quick overview of the main features you'll probably be interested in as you're getting started. This isn't an exhaustive list, just some highlights.


## Developer-friendly API

At its core Ghost is a self-consuming, RESTful JSON API with decoupled admin client and front-end. We provide lots of tooling to get a site running as quickly as possible, but at the end of the day it's **Just JSON** ™️, so if you want to use Ghost completely headless and write your own frontend or backend... you can!

Equally, Ghost is heavily designed for performance. There are 2-5 frontpage stories on HackerNews at any given time that are served by Ghost. It handles scale with ease and doesn't fall over as a result of traffic spikes.


## A serious editor

Ghost has the rich editor which every writer wants, but under the hood it delivers far more power than you would expect. All content is stored in a standardised JSON-based document storage format called MobileDoc, which includes support for extensible rich media objects called Cards.

In simple terms you can think of it like having Slack integrations inside Medium's editor, stored sanely and fully accessible via API.


## Custom site structures

Routing in Ghost is completely configurable based on your needs. Out of the box Ghost comes with a standard reverse chronological feed of posts with clean permalinks and basic pages, but that's easy to change.

Whether you need a full **multi-language site** with `/en/` and `/de/` base URLs, or you want to build out specific directory structures for hierarchical data like `/europe/uk/london/` — Ghost's routing layer can be manipulated in any number of ways to achieve your use case.


## Roles & permissions

Set up your site with sensible user roles and permissions built-in from the start.

- **Contributors:** Can log in and write posts, but cannot publish.
- **Authors:** Can create and publish new posts and tags.
- **Editors:** Can invite, manage and edit authors and contributors.
- **Administrators:** Have full permissions to edit all data and settings.
- **Owner:** An admin who cannot be deleted + has access to billing details.


## Custom themes

Ghost ships with a simple Handlebars.js front-end theme layer which is very straightforward to work with and surprisingly powerful. Many people stick with the default theme ([live demo](https://demo.ghost.io) / [source code](https://github.com/tryghost/casper)), which provides a clean magazine design - but this can be modified or entirely replaced.

The Ghost [Theme Marketplace](https://ghost.org/marketplace) provides a selection of pre-made third-party themes which can be installed with ease. Of course you can also build your own [Handlebars Theme](/api/handlebars-themes/) or use a [different front-end](/api/) altogether.


## Apps & integrations

Because Ghost is completely open source, built as a JSON API, has webhooks, and gives you full control over the front-end: It essentially integrates with absolutely everything. Some things are easier than others, but almost anything is possible with a little elbow grease. Or a metaphor more recent than 1803.

You can browse our large [directory of integrations](https://ghost.org/integrations/) with instructions, or build any manner of custom integration yourself by writing a little JavaScript and Markup to do whatever you want.

You don't need janky broken plugins which slow your site down. Integrations are the modern way to achieve extended functionality with ease.


## Search engine optimisation

Ghost comes with world-class SEO and everything you need to ensure that your content shows up in search indexes quickly and consistently.

#### No plugins needed

Ghost has all the fundamental technical SEO optimisations built directly into core, without any need to rely on third party plugins. It also has a far superior speed and pageload performance thanks to Node.js.

#### Automatic google XML sitemaps

Ghost will automatically generate and link to a complete Google sitemap including every page on your site, to make sure search engines are able to index every URL.

#### Automatic structured data + JSON-LD

Ghost generates [JSON-LD](https://developers.google.com/search/docs/guides/intro-structured-data) based structured metadata about your pages so that you don't have to rely on messy microformats in your markup to provide semantic context. Even if you change theme or front-end, your SEO remains perfectly intact. Ghost also adds automatic code for Facebook OpenGraph and Twitter Cards.

#### Canonical tags

Ghost automatically generates the correct `rel="canonical"` tag for each post and page so that search engines always prioritise one true link.

---

If you're curious to see more, check out the [features page](https://ghost.org/features/) on Ghost.org.
