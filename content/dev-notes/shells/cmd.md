# Windows Command Shell

## Useful Shell Commands

- Fast clone directory: `#!bat robocopy /MIR src dest`
- Remove empty directories: `#!bat robocopy dirpath dirpath /S /Move`

## Windows SymLink

|Link Types|To files?|To folders?|Across volumes?|Possibly non-existent?|Command|
|----------|---------|-----------|---------------|----------------------|-------|
|Shortcut|Yes|Yes|Yes|Yes|shortcut.exe -t target -a args|
|Symbolic link|Yes|Yes|Yes|Yes|`#!bat mklink /D LinkDir TargetDir` or `#!bat mklink LinkFile TargetFile`|
|Hard link|Yes|No|No|No|`#!bat mklink /H LinkFile TargetFile`|
|Junction (soft link)|No|Yes|Yes on same computer|Yes|`#!bat mklink /J LinkDir TargetDir`|

- **Symbolic Links/Directory Junctions**: implemented using reparse points
- **Junction/Symlink**: main difference is when looking at a remote server
  - **Junctions** are processed at the server
  - **Directory symlinks** are processed at the client
- **Hard Links**: implemented with multiple file table entries pointing to same inode
  - if original filename is deleted, the hard link will still work bc it points directly to the data on disk
- Reference [here](https://ss64.com/nt/mklink.html) and [here](https://superuser.com/questions/343074/directory-junction-vs-directory-symbolic-link)

## Parameters

- '#!bat %0': pathname of batch script itself
- `#!bat %1`....`#!bat %9`: reference argument by number
- '#!bat %\*': refers to all the arguments e.g. `#!bat %1 %2 %3 %4 %5 ...%255`
- expansion modifiers
  - `#!bat %~f1`:     expand %1 to a fully qualified path name e.g. `c:\utils\MyFile.txt`
  - `#!bat %~d1`:     expand %1 to a drive letter only e.g. `c:`
  - `#!bat %~p1`:     expand %1 to a path only including trailing \\ e.g. `\utils\`
  - `#!bat %~n1`:     expand %1 to a file Name without file extension or path - `MyFile`  or if only a path is present, with no trailing backslash, the last folder in that path.
  - `#!bat %~x1`:     expand %1 to a file eXtension only - .txt
  - `#!bat %~s1`:     change the meaning of f, n, s and x to reference the Short 8.3 name (if it exists)
  - `#!bat %~1`:      expand %1 removing any surrounding quotes `"`
  - `#!bat %~a1`:     display the file attributes
  - `#!bat %~t1`:     display the date/time
  - `#!bat %~z1`:     display the file size
  - `#!bat %~$PATH:1` search the PATH environment variable and expand %1 to the fully qualified name of the first match found
- expansion modifiers can be combined
  - `#!bat %~dp1` expand %1 to a drive letter and path only
  - `#!bat %~sp1` expand %1 to a path shortened to 8.3 characters
  - `#!bat %~nx2` expand %2 to a file name and extension only

## Scripts

- `#!bat cmd [options] "command" [parameters]`: starts new shell in same window, optionally runing program/command/batch
  - environment is **inherited** but changes _not_ persisted back
  - `/c`: runs command and auto terminates
  - `/k`: runs command and remain open
    - This is useful for testing, e.g. to examine variables
  - If `/c or /k`, remainder of command line processed as an immediate command in new shell
  - for multiple commands, surround with quotes and use command separator '&' or '&&'; e.g. `#!bat cmd /c "foo.cmd && bar.cmd"`
  - [more usecases](https://ss64.com/nt/cmd.html)
- `#!bat start "title" [options] "command" [parameters]`: start a program/command/batch in a new window
  - environment is **inherited** but changes _not_ persisted back
  - 
     > 
     > \[!info\] behavior is different depending on context/command
     > if **command** is shell command or batch file: processed with `#!bat cmd.exe /K` i.e. window remains open
     > inside batch script, a `#!bat start` without `#!bat /wait` launches program and continues script execution
  
  - [more usecases](http://ss64.com/nt/start.html)
- `#!bat call [parameters]`: invoke a batch script or subroutine
  - environment is **inherited** but changes _are_ persisted back
  - use `#!bat setlocal` and `#!bat endlocal` to keep variables in different files separate
  - [more usecases](https://ss64.com/nt/call.html)
- 
   > 
   > \[!warning\] invoking batch script from another without `#!bat call` or `#!bat start` terminates first script and allows second one to take over

- `#!bat pause` or `#!bat puase >nul`: to pause execution until keypress [Reference](https://stackoverflow.com/questions/988403/how-to-prevent-auto-closing-of-console-after-the-execution-of-batch-file)

### Cheatsheet

- launching commands/scripts
  
  |Window|OnExecute|OnFinish|Changes|Example|
  |------|---------|--------|-------|-------|
  |new|continue|auto close|non-persistent|`#!bat start "title" cmd /c bar.exe arg1 arg2`|
  |new|continue|keep open|non-persistent|`#!bat start "title" cmd /k bar.exe arg1 arg2`|
  |new|block|auto close|non-persistent|`#!bat start "title" /wait cmd /c foo.cmd arg1 arg2`|
  |new|block|keep open|non-persistent|`#!bat start "title" /wait cmd /k foo.cmd arg1 arg2`|
  |same|block|auto close|non-persistent|`#!bat cmd /c foo.bat arg1 arg2`|
  |same|block|keep open|non-persistent|`#!bat cmd /k foo.bat arg1 arg2`|
  |same|block|keep open|persistent|`#!bat call foo.bat arg1 arg2`|

- escaping
  
  |Scenario|Example|
  |--------|-------|
  |Run a program and pass a Filename parameter|`#!bat cmd /c write.exe c:\docs\sample.txt`|
  |Run a program and pass a Long Filename|`#!bat cmd /c write.exe "c:\sample documents\sample.txt"`|
  |Spaces in Program Path|`#!bat cmd /c ""c:\Program Files\Microsoft Office\Office\Winword.exe""`|
  |Spaces in Program Path + parameters|`#!bat cmd /c ""c:\Program Files\demo.cmd"" Parameter1 Param2`|
  |Spaces in Program Path + parameters with spaces|`#!bat cmd /k ""c:\batch files\demo.cmd" "Parameter 1 with space" "Parameter2 with space""`|
  |Launch Demo1 and then Launch Demo2|`cmd /c ""demo1.cmd" & "demo2.cmd""`|

- Command redirection/ pipe command. \[Reference\]<https://ss64.com/nt/syntax-redirection.html>
  
  |Scenario|Example|
  |--------|-------|
  |\`\#!bat command > filename'|Redirect command output to a file|
  |\`\#!bat command >> filename'|APPEND into a file|
  |\`\#!bat command \< filename'|Type a text file and pass the text to command|
  |\`\#!bat commandA \| commandB'|Pipe the output from commandA into commandB|
  |\`\#!bat commandA & commandB'|Run commandA and then run commandB|
  |\`\#!bat commandA && commandB'|Run commandA, if it succeeds then run commandB|
  |\`\#!bat commandA \|\| commandB'|Run commandA, if it fails then run commandB|
  |\`\#!bat commandA && commandB \|\| commandC'|If commandA succeeds run commandB, if it fails commandC|

## Misc Windows Stuff

- Change windows command shell default ScreenBufferSize & WindowSize
  
  - modify registry key: `HKEY_CURRENT_USER\Console\%SystemRoot%_System32_cmd.exe`
  - [Reference](https://technet.microsoft.com/en-us/library/cc978585.aspx)
- [Windows Update Bullshit fixes](http://answers.microsoft.com/en-us/windows/forum/windows_7-update/windows-7-windows-update-stuck-checking-for/bd559341-7dfe-430e-b61b-0b30884580b1?auth=1)

- Inspect windows file associations
  
  - show associated file type for extension
    ```bat
    C:\> assoc .txt
    .txt=txtfile
    ```
  
  - show associated actions for file type
    ```bat
    C:\> ftype txtfile
    txtfile=%SystemRoot%\system32\NOTEPAD.EXE %1
    ```
  
  - [Reference](http://stackoverflow.com/questions/1934675/how-to-execute-python-scripts-in-windows)
