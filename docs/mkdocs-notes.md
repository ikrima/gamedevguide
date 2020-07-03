# Notes

- install:
  - mkdocs: `pip install mkdocs`
  - cinder theme: `git clone https://github.com/chrissimpkins/cinder themes/material`
  - mkdocs-material:
    - recommended: `pip install mkdocs-material` as it installs pymkdown dependencies
    - `git clone https://github.com/squidfunk/mkdocs-material themes/material`
  - mkdocs extensions:
    - `pip install mkdocs-git-revision-date-localized-plugin`
    - `pip install mkdocs-awesome-pages-plugin`
    - `pip install mkdocs-plugin-progress`
    - more here: <https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins> & <https://github.com/Python-Markdown/markdown/wiki/Third-Party-Extensions>

- config:
  - mkdocs.yml: site config
  - material theme:
    - look at sample: [[themes/material/mkdocs.yml]]

- dev:
  - `mkdocs serve`: hot reload builds

- build:
  - `mkdocs build --clean`

- tbd:
  - add blog: <https://github.com/fmaida/mkdocs-blog-plugin>