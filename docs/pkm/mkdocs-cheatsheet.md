# MkDocs Cheatsheet

## Usage

|Command|Desc|
|-------|----|
|`mkdocs serve`|hot reload builds|
|`mkdocs build --clean --site-dir ./.build/site`|clean build|
|`python -m http.server -d ./.build/site`|start simple server|

## Setup

- install:
  - using requirements: `pip install -r requirements.txt`
  - manually:
    - mkdocs: `pip install mkdocs`
    - cinder theme: `git clone https://github.com/chrissimpkins/cinder themes/material`
    - material theme: `pip install mkdocs-material` as it installs `pymkdown` dependencies
- `mkdocs.yml`: site config
  - [mkdocs material template for obsidian](https://github.com/jobindj/obsidian-publish-mkdocs)
- extensions
  - `pip install mkdocs-git-revision-date-localized-plugin`
  - `pip install mkdocs-awesome-pages-plugin`
  - `pip install mkdocs-plugin-progress`
  - [add blog](https://github.com/fmaida/mkdocs-blog-plugin)
  - [mkdocs-roamlinks-plugin](https://github.com/Jackiexiao/mkdocs-roamlinks-plugin) for wikilinks style linking
  - katex instant support
    - <https://stackoverflow.com/questions/63145812/mkdocs-material-latex-not-rendering-in-instant-mode>
    - <https://github.com/squidfunk/mkdocs-material/issues/1498#issuecomment-610700276>
    - <https://github.com/squidfunk/mkdocs-material/issues/2290> on not using DOMContentSwitch
  - community extension list
    - <https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins>
    - <https://github.com/Python-Markdown/markdown/wiki/Third-Party-Extensions>