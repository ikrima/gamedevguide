# Site Build Guide

## Obsidian

### Import

Use instructions in \[pkm-conversion-notes\] to convert from OneNote, Notion, etc

### Export

- [obsidian export](https://github.com/ikrima/obsidian-export): export obsidian vault to markdown files
  
  - build
    ```bash
    pushd site-tools/obsidian-export && cargo build --release && popd
    ```
  
  - run
     > 
     > \[!note\] `obsidian-export` won't override existing files
    
    ```bash
    mkdir %EDEV_SRCDIR%/personal/gdgTmpContent &
    %EDEV_SRCDIR%/personal/tolva-docs/obsidian-export/target/release/obsidian-export.exe %EDEV_SRCDIR%/personal/tolva-docs/docs %EDEV_SRCDIR%/personal/gdgTmpContent &
    robocopy /MIR %EDEV_SRCDIR%/personal/gdgTmpContent %EDEV_SRCDIR%/personal/gamedevguide/content/dev-notes &
    rmdir /s/q %EDEV_SRCDIR%/personal/gdgTmpContent
    ```
  
  - deploy: [![Deploy to Netlify from GitHub](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ikrima/ikrima)
- Obsidian MkDocs Publisher
  
  - [obs2mk](https://github.com/ObsidianPublisher/obsidian-mkdocs-publisher-python): python exporter to mkdocs material compatible site
  - [Obsidian Github Publisher](https://github.com/ObsidianPublisher/obsidian-github-publisher): obsidian plugin version of above
    - [docs](https://obsidian-publisher.netlify.app)
  - [mkdocs-obsidian template](https://github.com/ObsidianPublisher/obsidian-mkdocs-publisher-template)
  - [Obsidian forum thread](https://forum.obsidian.md/t/obsidian-mkdocs-publisher-a-free-publish-alternative/29540/37)
  - [repos](https://github.com/orgs/ObsidianPublisher/repositories): related mkdocs extensions/utilities

### Extensions

- [Plugin Development](https://marcus.se.net/obsidian-plugin-docs)

## Linting

### Vale

[Vale](https://earthly.dev/blog/markdown-lint/): grammar linter

- install
  
  ```bash
  choco install vale
  vale sync
  ```

- usage
  
  - disable specific rule: `#!md <!-- vale gitlab.rulename = NO -->,<!-- vale gitlab.rulename = YES -->`
  - disable all rules:     `#!md <!-- vale off -->/<!-- vale on -->`

### Markdown Lint

- usage
  - disable specific rule: `#!md <!-- markdownlint-disable MDXXX -->,<!-- markdownlint-enable MDXXX -->`
  - disable all rules:     `#!md <!-- markdownlint-disable -->,<!-- markdownlint-enable -->`
