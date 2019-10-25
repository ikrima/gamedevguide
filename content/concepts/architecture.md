---
title: "Architecture"
meta_title: "Ghost Architecture – A modern, decoupled web application for professional publishers"
meta_description: "Ghost is structured with a robust JSON API at it's core, with a beautiful client app and a fully decoupled theme layer on the front-end – find out more!"
keywords:
    - concepts
    - ghost
    - publishing
    - architecture
sidebar: "concepts"
---

Ghost is structured as a modern, decoupled web application with a sensible service-based architecture.


1. **A robust core JSON API**
2. **A beautiful admin client app**
3. **A simple, powerful front-end theme layer**

These three areas work together to make every Ghost site function smoothly, but because they're decoupled there's plenty of room for customisation.


---


## How things fit together

![Ghost Architecture](../images/concepts/ghost-architecture.png)

Physically, the Ghost codebase is structured in two main directories:

- `core` - Contains the core files which make up Ghost
- `content` - Contains the files which may be added or changed by the user such as themes and images


### Data & Storage

Ghost ships with the [Bookshelf.js ORM](http://bookshelfjs.org) layer by default allowing for a range of databases to be used. Currently SQLite3 is the supported default in development while MySQL is recommended for production. Other databases are available, and compatible, but not supported by the core team.

Additionally, while Ghost uses local file storage by default it's also possible to use custom storage adapters to make your filesystem completely external. There are fairly wide range of pre-made [storage adapters for Ghost](/concepts/storage-adapters/) already available for use.

### Ghost-CLI

Orchestrating these different components is done via a comprehensive CLI and set of utilities to keep everything running and up to date.


---


## Philosophy

Ghost is architected to be familiar and easy to work with for teams who are already used to working with JavaScript based codebases, whilst still being accessible to a broad audience. It's neither the most bleeding-edge structure in the world, nor the most simple, but strives to be right balance between the two.
