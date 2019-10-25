---
title: "Ghost Admin"
meta_title: "Ghost Admin Client – An interface for editors who need a powerful tool to manage content"
meta_description: "Ghost is installed with a streamlined admin interface for editors who need a powerful tool to manage their content, and it's decoupled for maximum performance."
keywords:
    - concepts
    - ghost
    - publishing
    - architecture
sidebar: "concepts"
---

A streamlined clientside admin interface for editors who need a powerful tool to manage their content.

Traditionally, people writing content and people writing code rarely agree on the best platform to use. Tools with great editors generally lack speed and extensibility, and speedy frameworks basically always sacrifice user experience.


## Overview

Thanks to its decoupled architecture Ghost is able to have the best of both worlds. Ghost-Admin is a completely independent client application to the Ghost Core API which doesn't have any impact on performance. And, writers don't need to suffer their way through learning Git just to publish a new post.

Great for editors. Great for developers. Also available as [Desktop App](https://ghost.org/downloads/).

![Ghost Admin](../images/concepts/ghost-admin.png)


## Publishing workflow

Hacking together some Markdown files and throwing a static-site generator on top is nice in theory, but anyone who has tried to manage a content archive knows how quickly this falls apart even under light usage. What happens when you want to schedule a post to be published on Monday?

![Publishing Worfklow](../images/concepts/publishing-workflow.png)

Great editorial teams need proper tools which help them be effective, which is why Ghost-Admin has all the standard editorial workflow features available at the click of a button. From inputting custom social and SEO data to customising exactly how and where content will be output.


## Best-in-class editor

Ghost Admin also comes with a world-class editor for authoring posts, which is directly tied to a rock-solid document storage format. More on that a bit later!

![Ghost Editor](../images/concepts/ghost-admin-editor.png)

But, our default client app isn't the only way to interact with content on the Ghost [Admin API](/api/admin/). You can send data into Ghost from pretty much anywhere, or even write your own custom admin client if you have a particular usecase which requires it.

Ghost-Admin is extremely powerful but entirely optional.
