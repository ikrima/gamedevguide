# Obsidian Export

- export to markdown
  - [obsidian exporter](https://github.com/zoni/obsidian-export)
    - Cmd (Note: `obsidian-export.exe` won't override existing files)

      ```cmd
      obsidian-export.exe tolva-docs/docs gdgTmpContent
      robocopy /MIR gdgTmpContent gamedevguide/content
      nukedir gdgTmpContent
      ```

  - [mkdocs-roamlinks-plugin](https://github.com/Jackiexiao/mkdocs-roamlinks-plugin)
