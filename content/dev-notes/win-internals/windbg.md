# WinDBG

A much more powerful debugger than Visual Studio but annoyingly must be downloaded as a [Windows App Store](https://www.microsoft.com/en-us/p/windbg-preview/9pgjgd53tn86?activetab=pivot:overviewtab)

## Command Cheatsheet

### Debugger Analysis

|Command|Desc|
|-------|----|
|`k`|Display backtrace|
|`!locks`|Display all resource locks held by any thread|
|`!uniqstack`|Display all thread stacks excluding duplicates|
|`!findstack`|Find all stacks containing specified symbol/module|

### Breakpoints Analysis

|Command|Desc|
|-------|----|
|`bp`|_Set Breakpoint:_ new breakpoint using address|
|`bu`|_Set Unresolved Breakpoint:_ new unresolved/deferred breakpoint using symbolic reference. Persists across module load/unload|
|`bm`|_Set Symbol Breakpoint:_ new breakpoints on symbols using pattern match; defaults to unresolved but can associate to address with `/d` switch|
|`ba`|_Break on Access:_ new data hardware breakpoint|
|`be`/`bd`/`bc`|_Breakpoint Enable/Disable/Clear:_ enable/disable/clear breakpoints|
|`bl`|_Breakpoint List:_ list breakpoints with current status|
|`.bpcmds`|_Display Breakpoint Commands:_ list breakpoints with commands|
|`br`|_Breakpoint Renumber:_ change breakpoint ID|
|`bs`|_Update Breakpoint Command:_ change breakpoint command|
|`bsc`|_Update Conditional Breakpoint:_ change breakpoint condition|

### Hang Analysis

- run analysis: `!analyze -v -hang`
- look at the stack and rerun the stack dump command (eg: `~0s ; .cxr ; kb`)
- most likely will be `NtWaitForSingleObject`.  Grab the handle pointer and `fe`

### Crash/Dump Analysis

- open dump file and analyze: `!analyze -v`
- [Debugging BSOD/Bugcheck](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/index)
- [Live Kernel Mode Debugging](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/performing-local-kernel-debugging)
- [System File Checker](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/sfc): repair missing or corrupted system files
- [BlueScreenView](http://www.nirsoft.net/utils/blue_screen_view.html): visualize BSOD minidumps
- [BSOD/Crash Dump/Minidump Tips](https://www.sysnative.com/forums/bsod-kernel-dump-analysis-debugging-information/284-bsod-method-tips.html)

## WinDBG Notes

- BreakPoints
  - can specify the location of a breakpoint by virtual address, module and function offsets, or source file and line number (when in source mode)
    - function breakpoint without offset is triggered on function entry
  - can be associated with a certain thread
  - can enable a fixed number of passes through an address before it is triggered
  - can automatically issue certain commands when it is triggered
  - can be set on non-executable memory and watch for that location to be read or written to
  - can include a command to execute on trigger
    - Ex: breaks at `MyFunction+0x47`, writes a dump file, then resumes execution: `bu MyFunction+0x47 ".dump c:\mydump.dmp; g"`
  - each breakpoint has a decimal number called the breakpoint ID associated with it. This number identifies the breakpoint in various commands
  - [Hardware Breakpoints](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/methods-of-controlling-breakpoints)
  - [Complex DataAccess breakpoints](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/ba--break-on-access)

## Windows Debugging Tips

### GFlags

Global Flags Editor (`WindowsSDK\Debuggers\x64\gflags.exe`) enables/disables advanced windows diagnostic settings/registry keys

- features
  ![](../_assets/gflags-screenshot.png)
  - advanced debugging settings e.g. break on process launch
  - page heap allocation monitoring/verification
  - kernel object reference tracing
- 
   > 
   > \[!warning\] `gflags.exe` **must be run as admin** to set windows debug settings

- [GFlags Reference](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/gflags)

### SysInternals

Collection of useful system troubleshooting tools

- `WinObj` shows all the OS objects
- `SigCheck -a sftvolwin7.sys`: verify valid signature and shows file version info
- `TCPView`: see all network traffic
- `Procmon`: count occurrences; result will collate all errors