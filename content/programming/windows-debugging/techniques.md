---
sortIndex: 0
sidebar: programming
---

# WinDBG

This is a much more powerful debugger than Visual Studio. It's annoying that the latest verison has to be downloaded as a Windows App Store app <https://www.microsoft.com/en-us/p/windbg-preview/9pgjgd53tn86?activetab=pivot:overviewtab>

# GFlags

GFlags (the Global Flags Editor), gflags.exe, enables and disables advanced debugging, diagnostic, and troubleshooting features. It is most often used to turn on indicators that other tools track, count, and log.
<https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/gflags-overview>

# Usage

- Run GFlags.exe (as admin) to set windows debug settings
  - Can then pass commands to trace stack, trace handles, etc
    ![](../assets/gflags-screenshot.png)
