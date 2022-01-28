# Powershell

## Snippets/Reminders

* `%`: alias for `foreach-object`
* `$_`: current item in `foreach-object`
* `get-member`: object introspection
* string interpolation
  * use `$` in double quotes e.g. `"blaaa $myvar"` or `"blaaaa$($myobjVar.name)"`
  * no string expansion: `'$blaaa'`

## Common batch operations

* Get all items in a directory: `powershell>Get-ChildItem *`
* Get all subdirectories: `powershell>Get-ChildItem -Attributes Directory -Recurse`
* Operate foreach files in directory: `powershell>Get-ChildItem *.docx | % Name`

## Basics

|||
|--|--|
|Cmdlet|Commands built into shell written in .NET|
|Functions|Commands written in PowerShell language|
|Parameter|Argument to a Cmdlet/Function/Script|
|Alias|Shortcut for a Cmdlet or Function|
|Scripts|Text files with .ps1 extension|
|Applications|Existing windows programs|
|`\|` Pipeline operator|Pass objects Get-process word \| Stop-Process|
|Ctrl+c|Interrupt current command|
|Left/right|Navigate editing cursor|
|Ctrl+left/right|Navigate a word at a time|
|Home/End|Move to start / end of line|
|Up/down|Move up and down through history|
|Insert|Toggles between insert/overwrite mode|
|F7|Command history in a window|
|Tab/Shift-Tab|Command line completion|

## Help

|||
|--|--|
|`Get-Command`|Get all commands|
|`Get-Command -Module RGHS`|Get all commands in RGHS module|
|`Get-Command Get-p*`|Get all commands starting with get-p|
|`Get-Help get-process`|Get help for command|
|`Get-Process \| Get-Member`|Get members of the object|
|`Get-Process \| format-list -properties *`|Get-Process as list with all properties|

## Basic Operators

|||
|--|--|
|`=,+=,-=,++,--`|Assign values to variable|
|`-and,-or,-not,!`|Connect expressions/statements|
|`-eq, -ne`|Equal, not equal|
|`-gt, -ge`|Greater than, greater than or equal|
|`-lt, -le`|Less than, less than or equal|
|`-replace`|“Hi” -replace “H”, “P”|
|`-match,-notmatch`|Regular expression match|
|`-like,-notlike`|Wildcard matching|
|`-contains,-notcontains`|Check if value in array|
|`-in, -notin`|Reverse of contains/notcontains|

## Flow Control

````powershell
If(){} Elseif(){ } Else{ }
while(){}
For($i=0; $i -lt 10; $i++){}
Foreach($file in dir C:\){$file.name}
1..10 | foreach{$_}
````
