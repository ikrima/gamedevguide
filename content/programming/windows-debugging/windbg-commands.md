---
sortIndex: 1
sidebar: programming
---

# Deadlocks

- !locks

# Hang analysis

- !analyze -v -hang
- Look at the stack and rerun the stack dump command (eg: ~0s ; .cxr ; kb)
- Most likely will be NtWaitForSingleObject.  Grab the handle pointer and fe

# Usesful

- !uniqstack 
- !findstack

# Crash Dump Analysis

Use windbg.exe to open dump file

Use following command:
`!analyze -v`

Debugging BSOD/Bugcheck:
<https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/index>

Live Kernel Mode Debugging:
<https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/performing-local-kernel-debugging>

System File Checker:

BSOD/Crash Dump/Minidump:
BlueScreenView  <http://www.nirsoft.net/utils/blue_screen_view.html>

Resources:
<https://www.sysnative.com/forums/bsod-kernel-dump-analysis-debugging-information/284-bsod-method-tips.html>

# Misc Commands

Debug Commands:
k: Display backtrace

WinDBG:
https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/methods-of-controlling-breakpoints
bp 	Address breakpoint
bu 	Unresolved/deferred breakpoint. Persists across module load/unload
bm	Set symbol breakpoint on pattern match
bc/bd/be	Clear/enable/disable BP

Can also do breakpoint commands. Ex:
0:000> bu MyFunction+0x47 ".dump c:\mydump.dmp; g"


bl	List existing breakpoints
ba	Set Read Data breakpoint


Complex DataAccess breakpoints:
https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/ba--break-on-access-
