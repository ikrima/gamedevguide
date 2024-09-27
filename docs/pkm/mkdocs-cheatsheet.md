# MkDocs Cheatsheet

## Usage

- live preview with hot reload builds: `mkdocs serve --dirtyreload`
  
  - [`--dirtyreload`](https://www.mkdocs.org/about/release-notes/#support-for-dirty-builds-990) only rebuilds dirty pages with changed source timestamps
- clean build: `mkdocs build --clean --dirty --site-dir ./.build/site`
  
  - `--clean`: clean build
  - `--site-dir`: specify output directory
  - `-dirty`: only rebuilds dirty pages
- start simple server: `python -m http.server -d ./.build/site`

- upgrade `mkdocs`
  
  - install `pip-check-updates`: `pip install pip-check-updates; pip install --upgrade pip-check-updates`
  - find outdated:               `pcu requirements.txt`
  - update __requirements.txt__: `pcu requirements.txt -u`

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
