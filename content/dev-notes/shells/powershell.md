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

### Basic Operators

|||
|--|--|
|`=`,`+=`,`-=`,`*=`,`/=`,`%=`,`++`,`--`|assigns one or more values to variable|
|`-and`,`-or`,`-xor`,`-not`/`!`|logical operators|
|`-band`,`-bor`,`-bxor`,`-bnot`,`-shr`,`-shl`|bitwise operators|
|`-split`|splits a string (ex: `“abcdefghi” -split “de”`)|
|`-join`|joins multiple strings (ex: `“abc”,”def”,”ghi” -join “;”`)|
|\`|\`|
|`,`|comma operator (array constructor)|
|`@()`|array subexpression operator|

### Comparison Operators

|||
|--|--|
|`-eq`,`-ieq`,`-ceq`|equal|
|`-ne`,`-ine`,`-cne`|not equal|
|`-gt`,`-igt`,`-cgt`|greater than|
|`-ge`,`-ige`,`-cge`|greater than or equal to|
|`-lt`,`-ilt`,`-clt`|less than|
|`-le`,`-ile`,`-cle`|less than or equal to|
|`-like`,`-ilike`,`-clike`|wildcard matching|
|`-notlike`,`-inotlike`,`-cnotlike`|negation of `-like`|
|`-match`,`-imatch`,`-cmatch`|regular expression match|
|`-notmatch`,`-inotmatch`,`-cnotmatch`|negation of `-match`|
|`-replace`, `-ireplace`, `-creplace`|replace matching elements (ex: `“abcde” -replace “bc”, “TEST”`)|
|`-contains`,`-icontains`,`-ccontains`|check if value in array (ex: `1,2,3,4,5 -contains 3`)|
|`-notcontains`,`-inotcontains`,`-cnotcontains`|negation of `-contains`|
|`-in`,`-notin`|syntactic reverse of `-contains/-notcontains` (ex: `3 -in 1,2,3,4,5`)|

- _string comparisons_: default case-insensitive
  - `-c` prefix: case sensitive variant e.g. `-ceq`
  - `-i` prefix: case-insensitive variant e.g. `-ieq`
- `$list -op $foo`: shortcut for using operator as filter i.e. returns list items satisfying `-op`
   > 
   > \[!important\]
   > `-contains, -in, -is, -replace`: can't be used this way
  
  ```powershell
  $a = (1,2) -eq 3 
    := (1,2) | Where-Object { $_ -eq 2 }
  $a.GetType().Name # result: Object[]
  $a.Count          # result: 0
  ```

### Type Operators

|||
|--|--|
|`-is`,`-isnot`|test if object is an instance of a specified .NET type (ex: `42 –is [int]`)|
|`-as`|attempt type conversion to .NET type (ex: `$a = 42 –as [String]`)|
|`[]`|type cast (ex: `[datetime]$birthday = "1/10/66"`)|
|`()`|grouping expression operator|

### Flow Control

```powershell
if ($expr) {...} elseif ($expr) {...} else {...}
while ($expr) {...}
for ($i = 0; $i -lt 10; $i++) {...}
foreach ($file in Get-ChildItem 'C:\') { $file.name }
1..10 | ForEach-Object { $_ }
```

### Special Operators

- `($list).property/method`: Member Access Enumeration i.e. shortcut for map on collection
  
  ```powershell
  (Get-Service -Name event*).DisplayName 
    := (Get-Service -Name event*).ForEach({ $_.DisplayName })
    := (Get-Service -Name event*) | ForEach-Object { $_.DisplayName }
  # result: @('Windows Event Log', 'COM+ Event System', ...)
  ```
  
   > 
   > \[!note\] Nuances
   > 
   > - if property exists on collection, only the collection property is returned
   >   ```powershell
   >   (Get-Service).Count => 176
   >   ```
   > 
   > - if error occurs during enumeration, method is invoked only on the items enumerated before error
   > - [more details](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_member-access_enumeration) around undefined members, `$null` values, errors, etc

- `$()`: subexpression operator that evaluates inner expression with result treated as a variable i.e. `expr` form of `block stmts`
  
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
  . c:/scripts/sample.ps1
  . ./sample2.ps1
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

### Redirection Operators

|n|Output streams|
|-|--------------|
|`1`|`success` stream i.e. `stdout`|
|`2`|`error` stream i.e. `stderr`|
|`3`|`warning` stream|
|`4`|`verbose` stream|
|`5`|`debug` stream|
|`6`|`information` stream|
|`*`|`all` Streams|

|||
|--|--|
|`[n]>`|**send** stream to _file_ (default: `n=1`)|
|`[n]>>`|**append** stream to _file_ (default: `n=1`)|
|`[n]>&1`|**redirects** stream to `success` stream (default: `n=1`)|

 > 
 > \[!note\] limitations
 > can only redirect to `success` stream

```powershell
Get-Process word* | Stop-Process
Do-Something 3>   warning.txt # Writes warning output to warning.txt
Do-Something 4>>  verbose.txt # Appends verbose.txt with the verbose output
Do-Something 5>&1             # Writes debug output to the output stream
Do-Something *>&1             # Redirects all streams to stdout
Do-Something *>   out.txt     # Redirects all streams to out.txt
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
|`Ctrl`+`c`|Interrupt current command|
|`Left`/`Right`|Navigate editing cursor|
|`Ctrl`+`Left`/`Right`|Navigate a word at a time|
|`Home`/`End`|Move to start / end of line|
|`Up'/'Down`|Move up and down through history|
|`Insert`|Toggles between insert/overwrite mode|
|`F7`|Command history in a window|
|`Tab`/`Shift`+`Tab`|Command line completion|

### Scripting

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
  
  - `& foo @(arg0,arg2,...)`: call operator invokes expression in child scope that's discarded (e.g. any global variable changes not persisted)
  - `. foo @(arg0,arg2,...)`: dot sourcing invokes expression in current scope (e.g. global changes are persisted)
- common batch operations
  
  - get all items in a directory: `#!powershell Get-ChildItem *`
  - get all subdirectories: `#!powershell Get-ChildItem -Attributes Directory -Recurse`
  - get all files in directory: `#!powershell Get-ChildItem *.docx | % Name`
- enabling `-WhatIf, -Confirm, etc`
  
  - add `[CmdletBinding(SupportsShouldProcess = $true)]` to param block
  - inside function, wrap state change code with `if ($PSCmdlet.ShouldProcess(target,operation)) {...}`
- dump variables in a scope e.g. scope captured by `GetNewClosure()`
  
  ```powershell
  $m = (Get-Command testFunc2).Module
  & $m Get-Variable -Scope 0
  ```

- dump function definition
  
   > 
   > \[!warning\] Function provider has no containers and is always rooted
  
  ```powershell
  Get-ChildItem -Path Function:              # Dump all the functions in the current session
  (Get-Item -Path function:mkdir).Definition # Dump Function Definition
  $function:mkdir                            # Alternate Syntax for above
  ```

- create function closure
  
   > 
   > \[!warning\] appears to capture "only" local variables i.e. those from the caller's current scope
  
  ```powershell
  function New-Function {
    $x = $global:x
    $function:global:testFunc2 = {$x}.GetNewClosure()
  }
  ```

- invocation info
  
  - `$PSScriptRoot, $PSCommandPath`: info about the current script
  
  - `$MyInvocation.PSScriptRoot, $MyInvocation.PSCommandPath`: info about the invoker or calling script
  
  - `$MyInvocation` Properties
    
    |Property||
    |--------|--|
    |`$MyInvocation.BoundParameters`|This member provides a dictionary of the parameters that were bound for this script or command.|
    |`$MyInvocation.CommandOrigin`|This property tells you if you were being invoked inside the runspace or if it was an external request.|
    |`$MyInvocation.DisplayScriptPosition`|The position for the invocation or error.|
    |`$MyInvocation.ExpectingInput`|Is true if this command is expecting input...|
    |`$MyInvocation.HistoryId`|History ID that represents the command. If unavailable, this will be -1.|
    |`$MyInvocation.InvocationName`|Command name used to invoke this string - if invoked through an alias, then this would be the alias name.|
    |`$MyInvocation.Line`|The text of the line that contained this cmdlet invocation.|
    |`$MyInvocation.MyCommand`|Provide basic information about the command|
    |`$MyInvocation.OffsetInLine`|Command's character offset in that line. If the command was executed directly through the host interfaces, this will be -1.|
    |`$MyInvocation.PipelineLength`|How many elements are in the containing pipeline|
    |`$MyInvocation.PipelinePosition`|which element this command was in the containing pipeline|
    |`$MyInvocation.PositionMessage`|Formatted message indicating where the cmdlet appeared in the line|
    |`$MyInvocation.PSCommandPath`|This property tells you the full path to the command from where you were being invoked|
    |`$MyInvocation.PSScriptRoot`|This property tells you the directory from where you were being invoked|
    |`$MyInvocation.ScriptLineNumber`|The line number in the executing script that contained this cmdlet.|
    |`$MyInvocation.ScriptName`|The name of the script containing the cmdlet.|
    |`$MyInvocation.UnboundArguments`|This member provides a list of the arguments that were not bound to any parameter|

### PSScriptAnalyzer Linter

- [PSScriptAnalyzer Overview](https://github.com/PowerShell/PSScriptAnalyzer/blob/master/README.md)
- [PSScriptAnalyzerSettings](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/using-scriptanalyzer#settings-support-in-scriptanalyzer)
- [Built-in Presets](https://github.com/PowerShell/PSScriptAnalyzer/tree/master/Engine/Settings)
- [Built-in Rules](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/readme)

 > 
 > \[!info\] [Built-in Rules](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/readme)

|Rule|Enabled|Config|Severity|
|----|:-----:|:----:|--------|
|[PSAlignAssignmentStatement](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/alignassignmentstatement)|No|Yes|Warning|
|[PSAvoidAssignmentToAutomaticVariable](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidassignmenttoautomaticvariable)|Yes||Warning|
|[PSAvoidDefaultValueForMandatoryParameter](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoiddefaultvalueformandatoryparameter)|Yes||Warning|
|[PSAvoidDefaultValueSwitchParameter](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoiddefaultvalueswitchparameter)|Yes||Warning|
|[PSAvoidGlobalAliases](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidglobalaliases)|Yes||Warning|
|[PSAvoidGlobalFunctions](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidglobalfunctions)|Yes||Warning|
|[PSAvoidGlobalVars](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidglobalvars)|Yes||Warning|
|[PSAvoidInvokingEmptyMembers](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidinvokingemptymembers)|Yes||Warning|
|[PSAvoidLongLines](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidlonglines)|No|Yes|Warning|
|[PSAvoidMultipleTypeAttributes](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidmultipletypeattributes)|Yes||Warning|
|[PSAvoidNullOrEmptyHelpMessageAttribute](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidnulloremptyhelpmessageattribute)|Yes||Warning|
|[PSAvoidOverwritingBuiltInCmdlets](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidoverwritingbuiltincmdlets)|Yes|Yes|Warning|
|[PSAvoidSemicolonsAsLineTerminators](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidsemicolonsaslineterminators)|No||Warning|
|[PSAvoidShouldContinueWithoutForce](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidshouldcontinuewithoutforce)|Yes||Warning|
|[PSAvoidTrailingWhitespace](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidtrailingwhitespace)|Yes||Warning|
|[PSAvoidUsingBrokenHashAlgorithms](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingbrokenhashalgorithms)|Yes||Warning|
|[PSAvoidUsingCmdletAliases](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingcmdletaliases)|Yes|Yes|Warning|
|[PSAvoidUsingComputerNameHardcoded](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingcomputernamehardcoded)|Yes||Error|
|[PSAvoidUsingConvertToSecureStringWithPlainText](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingconverttosecurestringwithplaintext)|Yes||Error|
|[PSAvoidUsingDeprecatedManifestFields](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingdeprecatedmanifestfields)|Yes||Warning|
|[PSAvoidUsingDoubleQuotesForConstantString](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingdoublequotesforconstantstring)|No|Yes|Warning|
|[PSAvoidUsingEmptyCatchBlock](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingemptycatchblock)|Yes||Warning|
|[PSAvoidUsingInvokeExpression](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusinginvokeexpression)|Yes||Warning|
|[PSAvoidUsingPlainTextForPassword](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingplaintextforpassword)|Yes||Warning|
|[PSAvoidUsingPositionalParameters](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingpositionalparameters)|Yes||Warning|
|[PSAvoidUsingUsernameAndPasswordParams](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingusernameandpasswordparams)|Yes||Error|
|[PSAvoidUsingWMICmdlet](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingwmicmdlet)|Yes||Warning|
|[PSAvoidUsingWriteHost](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingwritehost)|Yes||Warning|
|[PSDSCDscExamplesPresent](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/dscdscexamplespresent)|Yes||Information|
|[PSDSCDscTestsPresent](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/dscdsctestspresent)|Yes||Information|
|[PSDSCReturnCorrectTypesForDSCFunctions](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/dscreturncorrecttypesfordscfunctions)|Yes||Information|
|[PSDSCStandardDSCFunctionsInResource](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/dscstandarddscfunctionsinresource)|Yes||Error|
|[PSDSCUseIdenticalMandatoryParametersForDSC](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/dscuseidenticalmandatoryparametersfordsc)|Yes||Error|
|[PSDSCUseIdenticalParametersForDSC](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/dscuseidenticalparametersfordsc)|Yes||Error|
|[PSDSCUseVerboseMessageInDSCResource](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/dscuseverbosemessageindscresource)|Yes||Error|
|[PSMisleadingBacktick](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/misleadingbacktick)|Yes||Warning|
|[PSMissingModuleManifestField](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/missingmodulemanifestfield)|Yes||Warning|
|[PSPlaceCloseBrace](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/placeclosebrace)|No|Yes|Warning|
|[PSPlaceOpenBrace](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/placeopenbrace)|No|Yes|Warning|
|[PSPossibleIncorrectComparisonWithNull](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/possibleincorrectcomparisonwithnull)|Yes||Warning|
|[PSPossibleIncorrectUsageOfAssignmentOperator](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/possibleincorrectusageofassignmentoperator)|Yes||Warning|
|[PSPossibleIncorrectUsageOfRedirectionOperator](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/possibleincorrectusageofredirectionoperator)|Yes||Warning|
|[PSProvideCommentHelp](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/providecommenthelp)|Yes|Yes|Information|
|[PSReservedCmdletChar](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/reservedcmdletchar)|Yes||Error|
|[PSReservedParams](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/reservedparams)|Yes||Error|
|[PSReviewUnusedParameter](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/reviewunusedparameter)|Yes||Warning|
|[PSShouldProcess](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/shouldprocess)|Yes||Warning|
|[PSUseApprovedVerbs](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/useapprovedverbs)|Yes||Warning|
|[PSUseBOMForUnicodeEncodedFile](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/usebomforunicodeencodedfile)|Yes||Warning|
|[PSUseCmdletCorrectly](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/usecmdletcorrectly)|Yes||Warning|
|[PSUseCompatibleCmdlets](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/usecompatiblecmdlets)|Yes|Yes|Warning|
|[PSUseCompatibleCommands](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/usecompatiblecommands)|No|Yes|Warning|
|[PSUseCompatibleSyntax](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/usecompatiblesyntax)|No|Yes|Warning|
|[PSUseCompatibleTypes](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/usecompatibletypes)|No|Yes|Warning|
|[PSUseConsistentIndentation](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/useconsistentindentation)|No|Yes|Warning|
|[PSUseConsistentWhitespace](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/useconsistentwhitespace)|No|Yes|Warning|
|[PSUseCorrectCasing](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/usecorrectcasing)|No|Yes|Information|
|[PSUseDeclaredVarsMoreThanAssignments](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/usedeclaredvarsmorethanassignments)|Yes||Warning|
|[PSUseLiteralInitializerForHashtable](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/useliteralinitializerforhashtable)|Yes||Warning|
|[PSUseOutputTypeCorrectly](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/useoutputtypecorrectly)|Yes||Information|
|[PSUseProcessBlockForPipelineCommand](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/useprocessblockforpipelinecommand)|Yes||Warning|
|[PSUsePSCredentialType](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/usepscredentialtype)|Yes||Warning|
|[PSUseShouldProcessForStateChangingFunctions](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/useshouldprocessforstatechangingfunctions)|Yes||Warning|
|[PSUseSingularNouns](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/usesingularnouns)|Yes||Warning|
|[PSUseSupportsShouldProcess](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/usesupportsshouldprocess)|Yes||Warning|
|[PSUseToExportFieldsInManifest](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/usetoexportfieldsinmanifest)|Yes||Warning|
|[PSUseUsingScopeModifierInNewRunspaces](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/useusingscopemodifierinnewrunspaces)|Yes||Warning|
|[PSUseUTF8EncodingForHelpFile](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/useutf8encodingforhelpfile)|Yes||Warning|

- disable rule
  
  ```powershell
  [System.Diagnostics.CodeAnalysis.SuppressMessage('PSAvoidUsingWriteHost', '')]
  ```
  
   > 
   > \[!note\] can control scoping
   > 
   > - scope to file, add to top of file and `param()` below attribute
   >   ```powershell
   >   [System.Diagnostics.CodeAnalysis.SuppressMessage('PSAvoidUsingWriteHost','')]
   >   param()
   >   ```
   > 
   > - namespace scope
   >   ```powershell
   >   [System.Diagnostics.CodeAnalysis.SuppressMessage('PSAvoidUsingWriteHost','',Scope='Namespace')]
   >   ```

- list approved powershell verbs
  
  ```powershell
  Get-Verb | Sort-Object Verb
  ```

## Resources

- [PowerShell Cheatsheet](../_assets/powershell-4-lang-ref.pdf)
- [ss64 Powershell](https://ss64.com/ps/): concise reference
- [powershell.one](https://powershell.one/): dives into more intermediate scripting topics like modules, scripting, etc
- Everything You Wanted To Know About: series geared towards fast ramp up
  - [Arrays](https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-arrays)
  - [Hashtable](https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-hashtable)
  - [PsCustomObject](https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-pscustomobject)
  - [String Interpolation](https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-string-substitutions)
- [PowerShell Best Practices and Style Guide](https://poshcode.gitbook.io/powershell-practice-and-style)
