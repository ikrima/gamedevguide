# Contributing to Ghost Documentation

If you're interested in contributing to Ghost's docs, you're in the right place! This guide contains instuctions for how to install this repository from source and work on the site locally.


## Quick Edits

If you just want to fix a typo or contribute a piece of content, the quickest way to get started is to fork the repository and edit the relevant Markdown file in the [/content](https://github.com/TryGhost/docs/tree/master/content) folder directly in the browser. Then commit and open a pull request on this repository.


## Installation from Source

1. `git clone` this repo & `cd` into it as usual
2. `git submodule update --init` to pull down the submodules
3. `npm install --global gatsby-cli` to install Gatsby
4. `yarn` to install top-level dependencies.
5. Copy `.env.example` to `.env.development`


### Run Locally

```
gatsby develop
```
- View: [http://localhost:8000](http://localhost:8000)
- Alias: `yarn dev`


### Create Production Build

```
gatsby build
```

and

```
gatsby serve
```

- View: [http://localhost:9000](http://localhost:9000)
- Alias: `yarn serve`


## Testing

Before submitting changes, run

```
yarn test
```

This will run some tests to verify that

- Algolia integration works
- Frontend works as expected
- No linting issues are present

## Submitting Pull Requests

Once you've made a change on your local branch, you can commit it and open a Pull Request which will be reviewed by 1-2 members of the Ghost core team. Small changes usually get merged as soon as we've had chance to read through them!

If any changes or discussion are needed, we'll let you know!

If you are making changes to the submodules in the docs-api repo, you need to submit those separately as PRs to that repository.


## Contributor License Agreement

By contributing your code to Ghost you grant the Ghost Foundation a non-exclusive, irrevocable, worldwide, royalty-free, sublicenseable, transferable license under all of Your relevant intellectual property rights (including copyright, patent, and any other rights), to use, copy, prepare derivative works of, distribute and publicly perform and display the Contributions on any licensing terms, including without limitation:
(a) open source licenses like the MIT license; and (b) binary, proprietary, or commercial licenses. Except for the licenses granted herein, You reserve all right, title, and interest in and to the Contribution.

You confirm that you are able to grant us these rights. You represent that You are legally entitled to grant the above license. If Your employer has rights to intellectual property that You create, You represent that You have received permission to make the Contributions on behalf of that employer, or that Your employer has waived such rights for the Contributions.

You represent that the Contributions are Your original works of authorship, and to Your knowledge, no other person claims, or has the right to claim, any right in any invention or patent related to the Contributions. You also represent that You are not legally obligated, whether by entering into an agreement or otherwise, in any way that conflicts with the terms of this license.

The Ghost Foundation acknowledges that, except as explicitly described in this Agreement, any Contribution which you provide is on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR A PARTICULAR PURPOSE.
