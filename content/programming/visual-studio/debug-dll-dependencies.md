---
sortIndex: 4
sidebar: programming
---


# Debugging DLL Dependencies/LoadLibrary

## Loader Snaps Log

Enable loader snaps via [gflags](https://blogs.msdn.microsoft.com/junfeng/2006/11/20/debugging-loadlibrary-failures/) and re-run your scenario under a debugger.

## (Managed Only) Fusion Log Viewer

Fuslogvw.exe.  It ships with Visual Studio and can be quickly accessed via the VS console.  Make sure to run this as admin to get everything logged.

For more information on Fuslogvw.exe, see this (URL)[https://docs.microsoft.com/en-us/dotnet/framework/tools/fuslogvw-exe-assembly-binding-log-viewer?redirectedfrom=MSDN]

## Dependency Walker

When trying to find all the libraries the project is loading & the order, add this flag to linker additional options:
`/verbose:lib`

Use dumpbin & dependencywalker to find what libraries/dlls are linked against (MSVCRT/MSVCRTD/LIBCMT/x64 vs x86)

```batch
dumpbin.exe /Directives (use to see the runtime library that is linked
dumpbin.exe /HEADERS  (use to see if x86 vs x64 in the machine entry)
 DUMPBIN /LINKERMEMBER[:{1|2}] <libraryname.lib>      (output all the exported symbols in a lib)
```
