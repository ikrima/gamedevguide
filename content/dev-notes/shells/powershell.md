# Powershell

## Crash Course

|Basic terminology|Definition|
|-----------------|----------|
|Cmdlet|Commands built into shell written in .NET|
|Functions|Commands written in PowerShell language|
|Parameter|Argument to a Cmdlet/Function/Script|
|Alias|Shortcut for a Cmdlet or Function|
|Scripts|Text files with .ps1 extension|
|Applications|Existing windows programs|

### Flow Control

```powershell
if (expr) {} elseif (expr) { } else { }
while (expr) {}
for ($i = 0; $i -lt 10; $i++) {}
foreach ($file in Get-ChildItem 'C:\') { $file.name }
1..10 | ForEach-Object { $_ }
```

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
|`-split`:|Splits a string (ex: `“abcdefghi” -split “de”`)|
|`-join`:|Joins multiple strings (ex: `“abc”,”def”,”ghi” -join “;”`)|

### Type Operators

|Operator||
|--------|--|
|`-is, -isnot`|test if object is an instance of a specified .NET type (ex: `42 –is [int]`)|
|`-as`|attempt type conversion to .NEt type (ex: `$a = 42 –as [String]`)|
|`[]`|type cast (ex: `[datetime]$birthday = "1/10/66"`)|
|`()`|grouping expression operator|
|`,`|comma operator (array constructor)|
|`@()`|array subexpression operator|

### Special Operators

- `($items).property`: select property from collection shortcut
  
  ```powershell
  (dir).FullName <=> dir | Select-Object FullName
  ```

- `$()`: block expression/subexpression operator that evalutes inner expression with result treated as a variable
  
  - can contain statements e.g. i.e. expression operator
  - each statement's output appends to final scalar or array result
  ```powershell
  if($(code returning value) -eq "somevalue") { do_something }
  $city="Copenhagen"
  $strLength = "$($city.length)"
  "The result of 2 + 3 = $(2+3)"
  $(Get-WMIObject win32_Directory)
  ```

- `&`: call/invocation operator to run command, script, or script block
  
  - can run commands stored in variables and represented by strings
  - does not parse or interpret command parameters
  ```powershell
  $c = "get-executionpolicy"
  & $c
  ```

- `.`: dot sourcing operator to run script in current scope
  
  - all script created functions/aliases/variables are added to the current scope
  ```powershell
  . c:\scripts\sample.ps1
  . .\sample2.ps1
  ```

- `-f`: format operator for string interpolation with format args e.g. padding, alignment, hex etc
  
  ```powershell
  1..10 | foreach { "{0:N2}" -f $_ }
  Get-ChildItem c:\ | ForEach-Object {'File {0} Created {1}' -f $_.fullname,$_.creationtime}
  ```

- `..`: range operator to produce number sequence
  
  ```powershell
  10..20
  1..10 | foreach {$_ * 5}
  -5..0.9 # a more readable version of the same thing.
  ```

### Stream Operators

- `|`:  Pipeline operator to pass objects (ex: `Get-process word | Stop-Process |`)
- `>, >>`: enables sending particular types of output (success, error, warning, verbose, and debug) to output stream
  - Output streams
    - \* All output
    - 1 Success output
    - 2 Errors
    - 3 Warning messages
    - 4 Verbose output
    - 5 Debug messages
  - Ex:
    ```powershell
    # Writes warning output to warning.txt
    Do-Something 3> warning.txt
    # Appends verbose.txt with the verbose output
    Do-Something 4>> verbose.txt
    # Writes debug output to the output stream
    Do-Something 5>&1
    # Redirects all streams to out.txt
    Do-Something *> out.txt
    ```

## Cheatsheet

### Useful Commands

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

### Snippets

- `%`: alias for `foreach-object`
- `$_`: current item in `foreach-object`
- `Get-Member`: object introspection
- pretty print
  - object: `Write-Host ($foo | Format-Table | Out-String)`
  - array: `Write-Host ($foo | Format-List | Out-String)`
- string interpolation
  - use `$` in double quotes e.g. `"blaaa $myvar"` or `"blaaaa$($myobjVar.name)"`
  - no string expansion: `'$blaaa'`
- invoke command/script
  - `& foo @(arg0,arg2,...)`: call operator invokes expresion in child scope that's discarded (e.g. any global variable changes not persisted)
  - `. foo @(arg0,arg2,...)`: dot sourcing invokes expresion in current scope (e.g. global changes are persisted)
- common batch operations
  - Get all items in a directory: `#!powershell Get-ChildItem *`
  - Get all subdirectories: `#!powershell Get-ChildItem -Attributes Directory -Recurse`
  - Operate foreach files in directory: `#!powershell Get-ChildItem *.docx | % Name`
- list approved powershell verbs
  ```powershell
  Get-Verb | Sort-Object Verb
  ```

### Scripting

- enabling `-WhatIf, -Confirm, etc`
  - add `[CmdletBinding(SupportsShouldProcess = $true)]` to param block
  - inside function, wrap state change code with `if ($PSCmdlet.ShouldProcess(target,operation)) {...}`
- disable code analysis rule
  ```powershell
  using namespace System.Diagnostics.CodeAnalysis
  [SuppressMessageAttribute('PSUseShouldProcessForStateChangingFunctions', '', Scope='Function')]
  ```

- dump function definition
   > 
   > \[!warning\] Function provider has no containers
  
  ```powershell
  Get-ChildItem -Path Function:              # Dump all the functions in the current session
  (Get-Item -Path function:mkdir).Definition # Dump Function Definition
  $function:mkdir                            # Alternate Syntax for above
  ```

- create function closure
   > 
   > \[!warning\] appears to capture "only" local variables i.e those from the caller's current scope
  
  ```powershell
  function New-Function {
    $x = $global:x
    $function:global:testFunc2 = {$x}.GetNewClosure()
  }
  ```

- dump variables in a scope e.g. scope captured by GetNewClosure()
  ```powershell
  $m = (Get-Command testFunc2).Module
  & $m Get-Variable -Scope 0
  ```

## Resources

- [PowerShell Cheatsheet](../_assets/powershell-4-lang-ref.pdf)
- [Everything You Wanted To Know About Arrays](https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-arrays)
- [Everything You Wanted To Know About Hashtable](https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-hashtable)
- [Everything You Wanted To Know About PsCustomObject](https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-pscustomobject)
- [Everything You Wanted To Know About String Interpolation](https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-string-substitutions)
