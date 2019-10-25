---
title: "Users"
meta_title: "Users & Permissions – Manage your team"
meta_description: "Ghost has built-in staff user permissions to allow teams to collaborate effectively. Learn all about user permissions in Ghost."
keywords:
    - concepts
    - ghost
    - publishing
    - users
sidebar: "concepts"
---

Staff users within Ghost have access to the admin area with varying levels of permissions for what they can do.


## Roles & permissions

There are five different staff user roles within Ghost

- **Contributors:** Can log in and write posts, but cannot publish
- **Authors:** Can create and publish new posts and tags
- **Editors:** Can invite, manage and edit authors and contributors
- **Administrators:** Have full permissions to edit all data and settings
- **Owner:** An admin who cannot be deleted and has access to billing details


## Author archives

Like [tags](/concepts/tags/), staff users are another resource by which content can be organised and sorted. Multiple authors can be assigned to any given post to generate bylines. Equally, author archives can be generated on the front end based on which posts an author is assigned to.

Also like tags, within Ghost Handlebars Themes author archives are automatically added to the Google XML Sitemap, and have their own pagination + RSS feeds.

Here's an example of an [author archive](https://demo.ghost.io/author/martin/) in the default Ghost Theme:

[![Author Archive](../images/concepts/author-archive.jpg)](https://demo.ghost.io/author/martin/)

Public author archives are only generated for staff users who are assigned to published posts, any other staff users are not publicly visible.


## Security & trust

If running the front-end of your site and the Ghost admin client on the same domain, there are certain permissions escalation vectors which are unavoidable.

Ghost considers staff users to be "trusted" by default - so if you're running in an environment where users are untrusted, you should ensure that Ghost-Admin and your site's front-end run on separate domains.


## Sample API data

Here's a sample author object from the Ghost [Content API](/api/content/)

`embed:api/v2/content/demo/authors.json`
