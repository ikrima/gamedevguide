---
title: "Install from Source"
keywords:
    - Developer install
    - Contribution
    - Contribute to Ghost
---

This guide is for installing a local development copy of Ghost from source, primarily for the purpose of modifying Ghost core


## Prerequisites

Before getting started, you'll need these global packages to be installed:

- **A [supported version](https://docs.ghost.org/faq/node-versions/) of [Node.js](https://nodejs.org)** - Ideally installed via [nvm](https://github.com/creationix/nvm#install-script)
- **[Yarn](https://yarnpkg.com/en/docs/install#alternatives-tab)** - to manage all the packages


#### Then install these global packages

```bash
yarn global add knex-migrator grunt-cli ember-cli bower
```


---


## Create GitHub forks

First you'll need to make forks of both the [Ghost](https://github.com/tryghost/ghost) and [Ghost-Admin](https://github.com/tryghost/ghost-admin) repositories. Click on the fork button right at the top, wait for a copy to be created over on your personal GitHub account, and you should be all set!


![Fork](/images/setup/fork.gif)


---


## Configure repositories

The next step is to configure the Git repositories for local development

### Ghost Core

The main Ghost repository contains the full Ghost package, including the Admin client and default theme which will also be automatically set up

```bash
# First clone Ghost with submodules and make it your working dir
git clone --recurse-submodules git@github.com:TryGhost/Ghost && cd Ghost
```

#### Properly rename your references

```bash
# Rename origin to upstream
git remote rename origin upstream

# Add your fork as an origin, editing in <YourUsername>!
git remote add origin git@github.com:<YourUsername>/Ghost.git
```

### Ghost Admin

Because Ghost-Admin is a submodule repository of the main Ghost repository, the same steps need to be repeated to configure Git here, too.

```bash
# Switch to Ghost-Admin dir
cd core/client
```

#### Properly rename your references again

```bash
# Rename origin to upstream again
git remote rename origin upstream

# Add your fork as an origin, editing in <YourUsername>!
git remote add origin git@github.com:<YourUsername>/Ghost-Admin.git
```

#### Bring Ghost-Admin up to date

```bash
# Quick check that everything is on latest
git checkout master && git pull upstream master

# Then return to Ghost root directory
cd ../../
```


---


## Run setup & installation

```bash
# Only ever run this once
yarn setup
```
The `setup` task will install dependencies, initialise the database, set up git hooks & initialise submodules and run a first build of the admin. The very first build generally takes **a while**, so now's a good time to re-open that Reddit tab.


---


## Start Ghost

```bash
# Run Ghost in development mode
grunt dev
```

<mark><strong>Ghost is now running at</strong> http://localhost:2368/</mark>


---


## Stay up to date

When your working copies become out of date due to upstream changes, this is the command always brings you back up to latest `master`

```bash
# Update EVERYTHING
grunt master
```

That's it, you're done with the install! The rest of this guide is about working with your new development copy of Ghost.

---


## Dev Commands

When running locally there are a number development utility commands which come in handy for running tests, building packages, and other helpful tasks.

### Running Ghost

The most commonly used commands for running the core codebase locally

```bash
grunt dev
# Default way of running Ghost in development mode
# Builds admin files on start & then watches for changes

grunt dev --server
# Ignores admin changes

grunt dev --no-server-watch
# Ignores server changes

grunt build
# Build admin client manually

grunt prod
# Build full Ghost package for production
```

### Database tools

Ghost uses it's own tool called `knex-migrator` to manage database migrations

```bash
knex-migrator reset
# Wipe the database

knex-migrator init
# Populate a fresh database
```

### Server Tests

Tests run with SQlite. To use MySQL, prepend commands with `NODE_ENV=testing-mysql`

```bash
grunt test-all
# Run all tests

grunt test-unit
# Run unit tests

grunt test-acceptance
# Run acceptance tests

grunt test-regression
# Run regression tests

grunt test:path/to/test.js
# Run a single test

grunt lint
# Make sure your code doesn't suck
```

### Client Tests

Client tests should always be run inside the `core/client` directory. Any time you have `grunt dev` running the client tests will be available at http://localhost:4200/tests


```bash
ember test
# Run all tests in Chrome + Firefox

ember test --server
# Run all tests, leave results open, and watch for changes

ember test -f 'gh-my-component'
# Run tests where `describe()` or `it()` matches supplied argument
# Note: Case sensitive

ember test --launch=chrome
# Run all tests in Chrome only

ember test -s -f 'Acceptance: Settings - General' --launch=chrome
# Most useful test comment for continuous local development
# Targets specific test of area being worked on
# Only using Chrome to keep resource usage minimal
```


---


## Troubleshooting

Some common Ghost development problems and their solutions

**ERROR: (EADDRINUSE) Cannot start Ghost**<br>
This error means that Ghost is already running, and you need to stop it

**ERROR: ENOENT**<br>
This error means that the mentioned file doesn't exist

**ERROR Error: Cannot find module**<br>
Install did not complete. Remove your `node_modules` and re-run `yarn`

**Error: Cannot find module './build/default/DTraceProviderBindings'**<br>
You switched node versions. Remove your `node_modules` and re-run `yarn`

**ENOENT: no such file or directory, stat 'path/to/favicon.ico' at Error (native)**<br>
Your admin client has not been built. Run `grunt prod` for production or `grunt dev`

**TypeError: Cannot read property 'tagName' of undefined**<br>
You can't run `ember test` at the same time as `grunt dev`. Wait for tests to finish before continuing and wait for the "Build successful" message before loading admin.

**yarn.lock conflicts**<br>
When rebasing a feature branch it's possible you'll get conflicts on `yarn.lock` because there were dependency changes in both `master` and `<feature-branch>`.

1. Note what dependencies have changed in `package.json`<br>
   <small>(Eg. `dev-1` was added and dev dep `dev-2` was removed)</small>
2. `git reset HEAD package.json yarn.lock` - unstages the files
3. `git checkout -- package.json yarn.lock` - removes local changes
4. `yarn add dev-1 -D` - re-adds the dependency and updates yarn.lock
5. `yarn remove dev-2` - removes the dependency and updates yarn.lock
6. `git add package.json yarn.lock` - re-stage the changes
7. `git rebase --continue` - continue with the rebase

It's always more reliable to let `yarn` auto-generate the lockfile rather than trying to manually merge potentially incompatible changes.
