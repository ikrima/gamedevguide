# Powershell

Basic terminology

* **Cmdlet**: Commands built into shell written in .NET
* **Functions**: Commands written in PowerShell language
* **Parameter**: Argument to a Cmdlet/Function/Script
* **Alias**: Shortcut for a Cmdlet or Function
* **Scripts**: Text files with .ps1 extension
* **Applications**: Existing windows programs

## Snippets/Reminders

* `%`: alias for `foreach-object`
* `$_`: current item in `foreach-object`
* `Get-Member`: object introspection
* pretty print
  * object: `Write-Host ($foo | Format-Table | Out-String)`
  * array: `Write-Host ($foo | Format-List | Out-String)`
* string interpolation
  * use `$` in double quotes e.g. `"blaaa $myvar"` or `"blaaaa$($myobjVar.name)"`
  * no string expansion: `'$blaaa'`
* invoke command/script
  * `& foo @(arg0,arg2,...)`: call operator invokes expresion in child scope that's discarded (e.g. any global variable changes not persisted)
  * `. foo @(arg0,arg2,...)`: dot sourcing invokes expresion in current scope (e.g. global changes are persisted)
* Common batch operations
  * Get all items in a directory: `powershell>Get-ChildItem *`
  * Get all subdirectories: `powershell>Get-ChildItem -Attributes Directory -Recurse`
  * Operate foreach files in directory: `powershell>Get-ChildItem *.docx | % Name`

## Useful Commands

|Command||
|-------|--|
|`Update-Help`|Downloads and installs newest help files|
|`Get-Help get-process`|Get help for command|
|`Get-Command`|Get all commands|
|`Get-Command -Module RGHS`|Get all commands in RGHS module|
|`Get-Command Get-p*`|Get all commands starting with get-p|
|`Get-Member`|Gets the properties and methods of objects|
|`Get-Module`|Gets all imported and importable modules|
|`Get-Process \| Get-Member`|Get members of the object|
|`Get-Process \| format-list -properties *`|Get-Process as list with all properties|
|Ctrl+c|Interrupt current command|
|Left/right|Navigate editing cursor|
|Ctrl+left/right|Navigate a word at a time|
|Home/End|Move to start / end of line|
|Up/down|Move up and down through history|
|Insert|Toggles between insert/overwrite mode|
|F7|Command history in a window|
|Tab/Shift-Tab|Command line completion|

## Basics

### Basic Operators

|Operator||
|--------|--|
|`=, +=, -=, *=, /=, %=, ++, --`|Assigns one or more values to variable|
|`-and,-or,-not,!`|logical operators|
|`-eq, -ne`|Equal, not equal|
|`-gt, -ge`|Greater than, greater than or equal to|
|`-lt, -le`|Less than, less than or equal to|
|`-replace`|changes the specified elements of a value. (ex: `“abcde” -replace “bc”, “TEST”`)|
|`-match, -notmatch`|Regular expression match|
|`-like, -notlike`|Wildcard matching|
|`-contains, -notcontains`|Check if value in array (ex: `1,2,3,4,5 -contains 3`)|
|`-in, -notin`|Reverse of contains/notcontains|

### Other Operators

|Operator||
|--------|--|
|`-Split`:|Splits a string (ex: `“abcdefghi” -split “de”`)|
|`-join`:|Joins multiple strings (ex: `“abc”,”def”,”ghi” -join “;”`)|
|`..`:|Range operator (ex: \`1..10|
|`-is, -isnot`:|test if object is an instance of a specified .NET type (ex: `42 –is [int]`)|
|`-as`:|attempt type conversion to .NEt type (ex: `$a = 42 –as [String]`)|
|`-f`:|string format (ex: \`1..10|
|`[ ]`:|type cast (ex: `[datetime]$birthday = "1/10/66"`)|
|`,`:|Comma operator (Array constructor)|
|`.`:|Dot-sourcing operator runs a script in the current scope (ex: `. c:\scripts\sample.ps1`)|
|`$()`:|Subexpression operator|
|`@()`:|Array subexpression operator|
|`&`:|The call operator, also known as the "invocation operator," lets you run commands that are stored in variables and represented by strings|

### Stream Operators

`|`:  Pipeline operator to pass objects (ex: `Get-process word | Stop-Process |`)
`>, >>`: enables sending particular types of output (success, error, warning, verbose, and debug) to output stream

* Output streams
  * \* All output
  * 1 Success output
  * 2 Errors
  * 3 Warning messages
  * 4 Verbose output
  * 5 Debug messages
* Ex:
  ````powershell
  # Writes warning output to warning.txt
  Do-Something 3> warning.txt
  # Appends verbose.txt with the verbose output
  Do-Something 4>> verbose.txt
  # Writes debug output to the output stream
  Do-Something 5>&1
  # Redirects all streams to out.txt
  Do-Something *> out.txt
  ````

### Flow Control

````powershell
If(){} Elseif(){ } Else{ }
while(){}
For($i=0; $i -lt 10; $i++){}
Foreach($file in dir C:\){$file.name}
1..10 | foreach{$_}
````

## Scripting

* Enabling `-WhatIf, -Confirm, etc`
  * add `[CmdletBinding(SupportsShouldProcess = $true)]` to param block
  * inside function, wrap state change code with `if ($PSCmdlet.ShouldProcess(target,operation)) {...}`

## Resources

* [Powershell CheatSheet](../_assets/powershell-4-lang-ref.pdf)
* [Everything You Wanted To Know About Arrays](https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-arrays)
* [Everything You Wanted To Know About Hashtable](https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-hashtable)
* [Everything You Wanted To Know About PsCustomObject](https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-pscustomobject)
* [Everything You Wanted To Know About String Interpolation](https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-string-substitutions)
