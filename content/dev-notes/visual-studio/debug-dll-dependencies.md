# Debugging DLL Dependencies

## LoadLibrary

- enable loader snapshots via [gflags](https://blogs.msdn.microsoft.com/junfeng/2006/11/20/debugging-loadlibrary-failures/)
  - re-run your scenario under a debugger

## Managed Dependencies

- Fusion Assembly Binding Log Viewer (`Fuslogvw.exe`) ships with Visual Studio and can be quickly accessed via the VS console
- run as admin to get everything logged
- [more info](https://docs.microsoft.com/en-us/dotnet/framework/tools/fuslogvw-exe-assembly-binding-log-viewer)

## Dependency Walker

- When trying to find all the libraries the project is loading & the order, build with this linker flag: `/verbose:lib`
- Use dumpbin & dependencywalker to find what libraries/dlls are linked against (MSVCRT/MSVCRTD/LIBCMT/x64 vs x86)
  ```bash
  dumpbin.exe /Directives                         # use to see the runtime library that is linked
  dumpbin.exe /HEADERS                            # use to see if x86 vs x64 in the machine entry
  DUMPBIN /LINKERMEMBER[:{1|2}] <libraryname.lib> # output all the exported symbols in a lib
  ```
