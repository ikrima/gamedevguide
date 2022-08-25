# Knowledge Management Conversion Notes

## OneNote Export

Well this is a hellish nightmare. From best to worst:
- [ConvertOneNote2MarkDown](https://github.com/SjoerdV/ConvertOneNote2MarkDown)
  - [Extended fork](https://github.com/theohbrothers/ConvertOneNote2MarkDown)
  - [Obsidian fork](https://github.com/rab-bit/ConvertOneNote2MarkDown4Obsidian)
- [onenote-md-exporter](https://github.com/alxnbl/onenote-md-exporter)
- [Web OneNote Exporter](https://sspeiser.github.io/onenote-export)
  - [Python Automation Script](https://www.sspaeti.com/blog/how-to-take-notes-in-2021/#how-did-i-export-my-10-of-onenote-to-markdown) variant of above using `Azure -> export html -> html2markdown`
- [Semi-automatic pandoc export](https://gist.github.com/heardk/ded40b72056cee33abb18f3724e0a580)


### Old Approach

- `cinst -y pandoc`
- OneNote 2016 + OneNoteBatch to batch export to docx/html
- pandoc export command (also supports commonmark/gfm as markdown flavors)
  ```powershell
  Get-ChildItem -Path './process/pendingdocx/*.docx' | % { 
    pandoc.exe --extract-media "process_markdown/assets" -s $_.FullName --wrap=none --reference-links -t commonmark_x -o "process_markdown/$($_.BaseName).md" 
  }
  ```
- Typora & StackEdit are great markdown editors
- Tools
  - [GitBook](https://www.gitbook.com/) - Careful not to use V2
  - [MkDocs](https://www.mkdocs.org/)
    - [Material For MkDocs](https://squidfunk.github.io/mkdocs-material/)
  - Useful links:
    - Comparison [https://blog.strapi.io/gitbook-open-source-documentation/](https://blog.strapi.io/gitbook-open-source-documentation/)

- OneNote Export
  - Look at bookmark OneNote folder in firefox
  - Batch export:
    - [Export to Word OneNote Batch](https://www.onenotegem.com/onenote-batch.html)
    - [OneNote Gem](https://www.onenotegem.com/gem-for-onenote.html)
  - [onenote-export](https://github.com/Sjlver/onenote-export)

- Conversion To New Format
  - [gitbook convert](https://github.com/GitbookIO/gitbook-convert)
  - [Pandoc](https://pandoc.org/): to convert from word/pdf to markdown

## Notion Export

- Worked better: <https://github.com/connertennery/Notion-to-Obsidian-Converter>
- <https://github.com/visualcurrent/Notion-2-Obsidan>
