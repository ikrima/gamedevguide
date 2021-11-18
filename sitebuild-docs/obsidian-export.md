# Obsidian Export

[obsidian exporter](https://github.com/ikrima/obsidian-export): markdown exporter
- Build
  ```batch
  cd obsidian-export &
  cargo build --release
  ```
- Running: (Note: `obsidian-export.exe` won't override existing files)
  ```batch
  mkdir %EDEV_SRCDIR%/personal/gdgTmpContent &
  %EDEV_SRCDIR%/personal/tolva-docs/obsidian-export/target/release/obsidian-export.exe %EDEV_SRCDIR%/personal/tolva-docs/docs %EDEV_SRCDIR%/personal/gdgTmpContent &
  robocopy /MIR %EDEV_SRCDIR%/personal/gdgTmpContent %EDEV_SRCDIR%/personal/gamedevguide/content/dev-notes &
  rmdir /s/q %EDEV_SRCDIR%/personal/gdgTmpContent
  ```

[mkdocs-roamlinks-plugin](https://github.com/Jackiexiao/mkdocs-roamlinks-plugin)
- Might be good for reference but not used

## Export from Notion

- Worked better: https://github.com/connertennery/Notion-to-Obsidian-Converter
- https://github.com/visualcurrent/Notion-2-Obsidan

## Export from OneNote

Use instructions in [onenote-export] to export to markdown and then import normally
