# Windows Command Shell

## Useful Shell Commands

- Fast clone directory: `#!bat robocopy /MIR src dest`
- Remove empty directories: `#!bat robocopy dirpath dirpath /S /Move`

## Windows SymLink

|Link Types|To Files?|To Folders?|Across Volumes?|May Not Exit?|Command|
|----------|---------|-----------|---------------|-------------|-------|
|Shortcut|Yes|Yes|Yes|Yes|shortcut.exe -t target -a args|
|Symbolic link|Yes|Yes|Yes|Yes|`#!batch mklink /D LinkDir TargetDir` or `#!batch mklink LinkFile TargetFile`|
|Hard link|Yes|No|No|No|`#!batch mklink /H LinkFile TargetFile`|
|Junction (soft link)|No|Yes|Yes on same computer|Yes|`#!batch mklink /J LinkDir TargetDir`|

- **Symbolic Links/Directory Junctions**: implemented using reparse points
- **Junction/Symlink**: main difference is when looking at a remote server
  - **Junctions** are processed at the server
  - **Directory symlinks** are processed at the client
- **Hard Links**: implemented with multiple file table entries pointing to same inode
  - if original filename is deleted, the hard link will still work bc it points directly to the data on disk
- Reference [here](https://ss64.com/nt/mklink.html) and [here](https://superuser.com/questions/343074/directory-junction-vs-directory-symbolic-link)

## Parameters

- `#!batch %0`: pathname of batch script itself
- `#!batch %1`....`#!batch %9`: reference argument by number
- `#!batch %*`: refers to all the arguments e.g. `#!batch %1 %2 %3 %4 %5 ...%255`
- expansion modifiers
  - `#!batch %~f1`:     expand %1 to a fully qualified path name e.g. `c:\utils\MyFile.txt`
  - `#!batch %~d1`:     expand %1 to a drive letter only e.g. `c:`
  - `#!batch %~p1`:     expand %1 to a path only including trailing \\ e.g. `\utils\`
  - `#!batch %~n1`:     expand %1 to a file Name without file extension or path - `MyFile`  or if only a path is present, with no trailing backslash, the last folder in that path.
  - `#!batch %~x1`:     expand %1 to a file eXtension only - .txt
  - `#!batch %~s1`:     change the meaning of f, n, s and x to reference the Short 8.3 name (if it exists)
  - `#!batch %~1`:      expand %1 removing any surrounding quotes `"`
  - `#!batch %~a1`:     display the file attributes
  - `#!batch %~t1`:     display the date/time
  - `#!batch %~z1`:     display the file size
  - `#!batch %~$PATH:1` search the PATH environment variable and expand %1 to the fully qualified name of the first match found
- expansion modifiers can be combined
  - `#!batch %~dp1` expand %1 to a drive letter and path only
  - `#!batch %~sp1` expand %1 to a path shortened to 8.3 characters
  - `#!batch %~nx2` expand %2 to a file name and extension only

## Scripts

- `#!batch cmd [options] "command" [parameters]`: starts new shell in same window, optionally runing program/command/batch
  - environment is **inherited** but changes _not_ persisted back
  - `/c`: runs command and auto terminates
  - `/k`: runs command and remain open
    - This is useful for testing, e.g. to examine variables
  - If `/c or /k`, remainder of command line processed as an immediate command in new shell
  - for multiple commands, surround with quotes and use command separator '&' or '&&'; e.g. `#!batch cmd /c "foo.cmd && bar.cmd"`
  - [more usecases](https://ss64.com/nt/cmd.html)
- `#!batch start "title" [options] "command" [parameters]`: start a program/command/batch in a new window
  - environment is **inherited** but changes _not_ persisted back
  - 
     > 
     > \[!info\] behavior is different depending on context/command
     > if **command** is shell command or batch file: processed with `#!batch cmd.exe /K` i.e. window remains open
     > inside batch script, a `#!batch start` without `#!batch /wait` launches program and continues script execution
  
  - [more usecases](http://ss64.com/nt/start.html)
- `#!batch call [parameters]`: invoke a batch script or subroutine
  - environment is **inherited** but changes _are_ persisted back
  - use `#!batch setlocal` and `#!batch endlocal` to keep variables in different files separate
  - [more usecases](https://ss64.com/nt/call.html)
- 
   > 
   > \[!warning\] invoking batch script from another without `#!batch call` or `#!batch start` terminates first script and allows second one to take over

- `#!batch pause`,`#!batch puase >nul`: to pause execution until keypress [(Reference)](https://stackoverflow.com/questions/988403/how-to-prevent-auto-closing-of-console-after-the-execution-of-batch-file)

### Cheatsheet

- launching commands/scripts
  
  |Window|OnExecute|OnFinish|Changes|Example|
  |------|---------|--------|-------|-------|
  |new|continue|auto close|non-persistent|`#!batch start "title" cmd /c bar.exe arg1 arg2`|
  |new|continue|keep open|non-persistent|`#!batch start "title" cmd /k bar.exe arg1 arg2`|
  |new|block|auto close|non-persistent|`#!batch start "title" /wait cmd /c foo.cmd arg1 arg2`|
  |new|block|keep open|non-persistent|`#!batch start "title" /wait cmd /k foo.cmd arg1 arg2`|
  |same|block|auto close|non-persistent|`#!batch cmd /c foo.bat arg1 arg2`|
  |same|block|keep open|non-persistent|`#!batch cmd /k foo.bat arg1 arg2`|
  |same|block|keep open|persistent|`#!batch call foo.bat arg1 arg2`|

- escaping
  
  |Scenario|Example|
  |--------|-------|
  |Run a program and pass a Filename parameter|`#!batch cmd /c write.exe c:\docs\sample.txt`|
  |Run a program and pass a Long Filename|`#!batch cmd /c write.exe "c:\sample documents\sample.txt"`|
  |Spaces in Program Path|`#!batch cmd /c ""c:\Program Files\Microsoft Office\Office\Winword.exe""`|
  |Spaces in Program Path + parameters|`#!batch cmd /c ""c:\Program Files\demo.cmd"" Parameter1 Param2`|
  |Spaces in Program Path + parameters with spaces|`#!batch cmd /k ""c:\batch files\demo.cmd" "Parameter 1 with space" "Parameter2 with space""`|
  |Launch Demo1 and then Launch Demo2|`cmd /c ""demo1.cmd" & "demo2.cmd""`|

- Command redirection/pipe command. [(Reference)](https://ss64.com/nt/syntax-redirection.html)
  
  |Scenario|Example|
  |--------|-------|
  |\`\#!batch command > filename'|Redirect command output to a file|
  |\`\#!batch command >> filename'|APPEND into a file|
  |\`\#!batch command \< filename'|Type a text file and pass the text to command|
  |\`\#!batch commandA \| commandB'|Pipe the output from commandA into commandB|
  |\`\#!batch commandA & commandB'|Run commandA and then run commandB|
  |\`\#!batch commandA && commandB'|Run commandA, if it succeeds then run commandB|
  |\`\#!batch commandA \|\| commandB'|Run commandA, if it fails then run commandB|
  |\`\#!batch commandA && commandB \|\| commandC'|If commandA succeeds run commandB, if it fails commandC|

## Misc Windows Stuff

- Change windows command shell default ScreenBufferSize & WindowSize [(Reference)](https://technet.microsoft.com/en-us/library/cc978585.aspx)
  
  - modify registry key: `HKEY_CURRENT_USER\Console\%SystemRoot%_System32_cmd.exe`
- [Windows Update Bullshit fixes](http://answers.microsoft.com/en-us/windows/forum/windows_7-update/windows-7-windows-update-stuck-checking-for/bd559341-7dfe-430e-b61b-0b30884580b1?auth=1)

- Inspect windows file associations [(Reference)](http://stackoverflow.com/questions/1934675/how-to-execute-python-scripts-in-windows)
  
  - show associated file type for extension
    ```batch
    C:\> assoc .txt
    .txt=txtfile
    ```
  
  - show associated actions for file type
    ```batch
    C:\> ftype txtfile
    txtfile=%SystemRoot%\system32\NOTEPAD.EXE %1
    ```
