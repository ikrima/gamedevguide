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
    mkdir %EDEV_VF_SRC%/personal/gdgTmpContent &
    %EDEV_VF_SRC%/personal/tolva-docs/obsidian-export/target/release/obsidian-export.exe %EDEV_VF_SRC%/personal/tolva-docs/docs %EDEV_VF_SRC%/personal/gdgTmpContent &
    robocopy %EDEV_VF_SRC%/personal/gdgTmpContent %EDEV_VF_SRC%/personal/gamedevguide/content/dev-notes /MIR &
    rmdir /s/q %EDEV_VF_SRC%/personal/gdgTmpContent
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

|Usage|Syntax|
|-----|------|
|disable specific rule|`#!markdown <!-- vale gitlab.rulename = NO -->,<!-- vale gitlab.rulename = YES -->`|
|disable all rules|`#!markdown <!-- vale off -->/<!-- vale on -->`|

### Markdown Lint

|Usage|Scope|Syntax|
|-----|-----|------|
|disable/enable rule(s)|Region|`<!-- markdownlint-disable [RULE(S)...] -->`,`<!-- markdownlint-enable [RULE(S)...] -->`|
|disable rule(s)|Inline|`<!-- markdownlint-disable-line [RULE(S)...] -->`|
|disable rule(s)|Next line|`<!-- markdownlint-disable-next-line [RULE(S)...] -->`|
|disable/enable rule(s)|File|`<!-- markdownlint-disable-file [RULE(S)...] -->`,`<!-- markdownlint-enable-file [RULE(S)...] -->`|
|capture/restore rule config|Region|`<!-- markdownlint-capture -->`,`<!-- markdownlint-restore -->`|

- examples
  ```markdown
  <!-- markdownlint-disable MD005 no-space-in-emphasis -->
  Scope-Region: Deliberate space * in * emphasis
  <!-- markdownlint-enable MD005 no-space-in-emphasis -->
  
  Scope-Inline: Deliberate space * in * emphasis <!-- markdownlint-disable-line no-space-in-emphasis -->
  
  <!-- markdownlint-disable-next-line no-space-in-emphasis -->
  Scope-NextLine: Deliberate space * in * emphasis
  
  Temporarily disable rule(s) then restore former config:
  <!-- markdownlint-capture -->
  <!-- markdownlint-disable -->
  Any violations you want
  <!-- markdownlint-restore -->
  
  Initial config is captured by default so pattern above can be simplified:
  <!-- markdownlint-disable -->
  Any violations you want
  <!-- markdownlint-restore -->
  ```
