---
sortIndex: 0
sidebar: programming
---

# Reminders

- % => alias for foreach-object
- $\_ in a foreach-object is current item
- get-member => object introspection
- String interpolation:
  - `powershell>"blaaa $myvar", "blaaaa$($myobjVar.name)"`
  - No string expansion: `powershell>'$blaaa'`

# Common batch operations

- Get all items in a directory: `powershell>Get-ChildItem *`
- Get all subdirectories: `powershell>Get-ChildItem -Attributes Directory -Recurse`
- Operate foreach files in directory: `powershell>Get-ChildItem *.docx | % Name`
