# Site Build Guide

## Import/Export
Use instructions in [km-conversion-notes] to convert from OneNote, Notion, etc

## Export MkDocs
[obsidian export](https://github.com/ikrima/obsidian-export): markdown exporter
- build
  ```bat
  pushd site-tools\obsidian-export && cargo build --release && popd
  
  ```
- run
  > [!note] `obsidian-export` won't override existing files
  ```bat
  mkdir %EDEV_SRCDIR%/personal/gdgTmpContent &
  %EDEV_SRCDIR%/personal/tolva-docs/obsidian-export/target/release/obsidian-export.exe %EDEV_SRCDIR%/personal/tolva-docs/docs %EDEV_SRCDIR%/personal/gdgTmpContent &
  robocopy /MIR %EDEV_SRCDIR%/personal/gdgTmpContent %EDEV_SRCDIR%/personal/gamedevguide/content/dev-notes &
  rmdir /s/q %EDEV_SRCDIR%/personal/gdgTmpContent
  ```
- deploy: [![Deploy to Netlify from GitHub](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ikrima/ikrima)

## Linting

### Markdown Lint Notes

- usage
  - disable specific rule: `<!-- markdownlint-disable MDXXX -->,<!-- markdownlint-enable MDXXX -->`
  - disable all rules:     `<!-- markdownlint-disable -->,<!-- markdownlint-enable -->`

### Vale Notes

[Vale](https://earthly.dev/blog/markdown-lint/): grammar linter

- install
  ```bat
  choco install vale
  vale sync
  ```

- usage
  - disable specific rule: `<!-- vale gitlab.rulename = NO -->,<!-- vale gitlab.rulename = YES -->`
  - disable all rules:     `<!-- vale off -->/<!-- vale on -->`
