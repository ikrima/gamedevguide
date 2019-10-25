---
title: "Development Principles"
meta_title: "Ghost Development Principles – Feature requests & product roadmap"
meta_description: "Ghost is developed by a small core team and a great deal of care is given to deciding what features get built. Find out more about our development principles."
keywords:
    - concepts
    - ghost
    - publishing
    - principles
sidebar: "concepts"
---

Developing Ghost as a product is a complex process undertaken by a small number of people with a great deal of care.

## Product roadmap

The Ghost product team maintains a broad 1-2 year product roadmap at any given time which defines the overall direction of the company and the software. While the exact roadmap isn't shared publicly (we tried it and it turned out to be more distracting than helpful), the things being worked on are generally very visible [on GitHub](https://github.com/tryghost/ghost).

**Currently our primary focus areas largely surround:**

- Making Ghost more flexible and easy to integrate with other apps & services
- Creating new, sustainable business models for publishers
- Refining and improving the core functionality of the product


## Feature requests

We welcome feature requests from users over in [the ideas category](https://forum.ghost.org/c/Ideas) of the Ghost Forum. Here people can request and suggest things which they'd like to see in Ghost, and others can add their vote or comment. 

The ideas board is a great way for us to gauge user demand, but it's not a democratic system. We don't automatically build things just because they get a lot of votes, and not everything that gets requested makes it into core.

The best way to get a feature you want looked at quicker is to [get involved by contributing to the project](/concepts/contributing/) to help build it. That's how open source software works!


## What makes it into core?

There are a million things we *could* build, but we certainly can't build all of them - nor would we want to. So how do we determine what goes where?

Features which are fundamentally core to creating and managing a modern publication tend to be the things which are almost always included in core. These are the types of features without which the platform would be fundamentally less useful, or too reliant on external services for comfort.

This is the area where we spend the majority of our product development time and where we believe we can create something special.


## What doesn't?

Conversely, there are certain features which we very deliberately leave out of core.

### Integrations

For features which are so large that there are multiple entire companies and startups dedicated to doing just-that-one-thing, we most frequently build integrations rather than competing features. Particularly when the things in question are technologically complex, and not a core focus where we have any particular strength.

*Eg: Search, Comments, Media Management, Newsletters*

### Custom tools

Where specific features are only relevant to a small number of people, or small number of users, they tend to be implemented in external custom tools which are specific to those tasks. This keeps core leaner and meaner for everyone.

*Eg: Importers, Compatibility scanners*

### Specialist functionality

Certain features are suitable for inclusion in core, but they are niche pieces of functionality which require a specific skillset both to build and maintain. Typically these features do not automatically get built unless they have a dedicated specialist volunteer contributor to build them.

*Eg: Niche security headers, Deep i18n and a10y issues, niche perf. optimisations*
