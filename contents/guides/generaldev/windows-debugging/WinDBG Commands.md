---
sortIndex: 1
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

Debugging BSOD/Bugcheck/:
<https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/index>

Live Kernel Mode Debugging:
<https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/performing-local-kernel-debugging>

System File Checker:

BSOD/Crash Dump/Minidump:
BlueScreenView  <http://www.nirsoft.net/utils/blue_screen_view.html>

Resources:
<https://www.sysnative.com/forums/bsod-kernel-dump-analysis-debugging-information/284-bsod-method-tips.html>
