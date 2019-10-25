---
title: "How to install Ghost locally"
date: "2018-10-01"
meta_title: "How to install Ghost locally on Mac, PC or Linux"
meta_description: "A detailed local install guide for how to install the Ghost publishing platform on your computer running Mac, PC or Linux. Ideal for Ghost theme development."
keywords:
    - setup
    - local
    - install
    - development
---

Fast-track local install for getting Ghost running on your computer or setup for doing theme development

## Overview

Running Ghost locally is the easiest way to get your own copy of the software running and be able to do some local development with it. By the end of this guide you will have completed a local Ghost install that runs in development mode using SQLite3.

This install is **not** suitable for [production use](/install/ubuntu/) or [contributing](/install/source/) to core.


---


## Prerequisites

To install Ghost locally you will need the following:

* A computer running MacOS, Windows or Linux
* A [supported version](https://docs.ghost.org/faq/node-versions/) of [Node.js](https://nodejs.org)
* Either [yarn](https://yarnpkg.com/en/docs/install#alternatives-tab) or [npm](https://www.npmjs.com/get-npm) to manage packages
* A clean, empty directory on your machine


---


## Install Ghost-CLI

[Ghost-CLI](/api/ghost-cli/) is a commandline tool to help you get Ghost installed and configured for use, quickly and easily. The npm module can be installed with `npm` or `yarn` on a local machine, depending on your preference.

```bash
npm install ghost-cli@latest -g
```

Once installed, you can always run `ghost help` to see a list of available commands.

---

## Install Ghost

In your terminal, `cd` into an empty directory and run the install command:

```bash
ghost install local
```

Once the install is finished you'll be able to access your new site on `http://localhost:2368` and `http://localhost:2368/ghost` to access Ghost Admin ✨

<mark><strong>That's it! You're done.</strong></mark>


* Your publication is setup in `development` mode with less caching
* The SQLite3 database is auto-setup and located in `/content/data/`
* Logs only go to `stdout`

---

## Starting & Stopping

Ghost runs in a separate background process and remains running until you stop it or restart your computer. So you may find these commands useful for taming it:

* `ghost stop` to stop Ghost
* `ghost start` to start Ghost
* `ghost log` views logs
* `ghost ls` to list all running Ghost blogs

Run `ghost help` for a list of available commands, or explore the full [Ghost-CLI documentation](/api/ghost-cli/).

#### Troubleshooting
For troubleshooting and errors, try searching this documentation and [FAQ section](https://docs.ghost.org/faq/) to find information about common error messages.

---

## Developing Themes

To work on a [Ghost Handlebars Theme](/api/handlebars-themes/) locally, your custom theme should always be placed in the top-level `/content/themes/` directory.


### Live reloading

All edits made to Ghost theme files will automatically reload. If you add any **new** files to your theme during development, you'll need to restart Ghost to see the changes take effect.


### Validating with GScan

GScan is a tool that validates Ghost themes for compatibility with the latest versions of Ghost. Ghost automatically runs this tool when a theme is uploaded or activated. For development purposes, your can also run these checks yourself by locally installing it.

```bash
# Install gscan globally
npm install gscan -g

# Scan a theme directory for compatibility
gscan /path/to/ghost/content/themes/casper

# Scan a theme zip file for compatibility
gscan -z /path/to/downloads/theme.zip
```

GScan can also be accessed at [gscan.ghost.org](https://gscan.ghost.org/), where you can sign up for the latest updates as a Ghost theme developer.

## What's next

You've completed a local Ghost install — congrats! You can now put Ghost through its paces and see what it’s all about, or jump right into developing a custom Ghost theme.

When you're ready ship your site to production, [follow one of these guides](/setup/).

For more information about theme development read the [Handlebars theme documentation](/api/handlebars-themes/) and check out the [tutorials](https://docs.ghost.org/tutorials/).
