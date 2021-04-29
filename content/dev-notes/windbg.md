# WinDBG

## Windows Debugging Tips

### WinDBG

This is a much more powerful debugger than Visual Studio. It's annoying that the latest verison has to be downloaded as a Windows App Store app https://www.microsoft.com/en-us/p/windbg-preview/9pgjgd53tn86?activetab=pivot:overviewtab

### GFlags

GFlags (the Global Flags Editor), gflags.exe, enables and disables advanced debugging, diagnostic, and troubleshooting features. It is most often used to turn on indicators that other tools track, count, and log.
https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/gflags-overview

Usage

* Run GFlags.exe (as admin) to set windows debug settings
* Can then pass commands to trace stack, trace handles, etc
  ![gflags-screenshot.png](..\_assets\dev-notes\gflags-screenshot.png)

### Tools

Some useful system troubleshooting tools

* SysInternals: WinObj
  * Shows all the OS objects
* SigCheck -a sftvolwin7.sys
  * Verify valid signature and shows file version info
* TCPView
  * See all network traffic
* Procmon
  * Count Occurrences Result will collate all errors
* WindowsSDK\\Debuggers\\x64\\gflags.exe

## WinDBG Commands

### Deadlocks

* `!locks`

### Hang analysis

* `!analyze -v -hang`
* Look at the stack and rerun the stack dump command (eg: `~0s ; .cxr ; kb`)
* Most likely will be NtWaitForSingleObject.  Grab the handle pointer and `fe`

### Stack

* `!uniqstack`
* `!findstack`

### Crash Dump Analysis

Use windbg.exe to open dump file and use following command:
`!analyze -v`

* Debugging BSOD/Bugcheck https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/index
* Live Kernel Mode Debugging: https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/performing-local-kernel-debugging
* System File Checker
* BSOD/Crash Dump/Minidump
* BlueScreenView  [http://www.nirsoft.net/utils/blue_screen_view.html](http://www.nirsoft.net/utils/blue_screen_view.html)

Resources: https://www.sysnative.com/forums/bsod-kernel-dump-analysis-debugging-information/284-bsod-method-tips.html

### Misc Commands

Debug Commands:

````
k: Display backtrace
````

WinDBG [hardware breakpoints](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/methods-of-controlling-breakpoints)

````
bp 	Address breakpoint
bu 	Unresolved/deferred breakpoint. Persists across module load/unload
bm	Set symbol breakpoint on pattern match
bc/bd/be	Clear/enable/disable BP
````

Can also do breakpoint commands. Ex:

````
0:000> bu MyFunction+0x47 ".dump c:\mydump.dmp; g"
````

````
bl	List existing breakpoints
ba	Set Read Data breakpoint
````

Complex DataAccess breakpoints: https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/ba--break-on-access-
