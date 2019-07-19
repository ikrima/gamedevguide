---
sortIndex: 1
---

## Magic Numbers

| | |
| --- | --- |
| CCCCCCCC | Used by Microsoft's C++ debugging runtime library and many DOS environments to mark uninitialized stack memory. CC resembles the opcode of the INT 3 debug breakpoint interrupt on x86 processors. |
| CDCDCDCD | Used by Microsoft's C/C++ debug malloc() function to mark uninitialized heap memory, usually returned from HeapAlloc()[15] |
| FDFDFDFD | Used by Microsoft's C/C++ debug malloc() function to mark "no man's land" guard bytes before and after allocated heap memory[15] |
| FEEEFEEE | "Fee fee", Used by Microsoft's debug HeapFree() to mark freed heap memory. Some nearby internal bookkeeping values may have the high word set to FEEE as well.[15] |

From <http://en.wikipedia.org/wiki/Magic_number_(programming)>

CRT runtime Debugging Techniques
http://msdn.microsoft.com/en-us/library/zh712wwf(v=vs.120).aspx
http://msdn.microsoft.com/en-us/library/k70yt3e2.aspx

## Global in Watch Window

The way to scope the global is as follows using the Context Operator:
  `cpp>{,,foobar.dll}g_pMyStruct`
  where foobar.dll defines g_pMyStruct as a global pointer. The same syntax can be used to scope breakpoints as well.

# Debugging

- `alias`: List useful commands
- Command window: `? …` to execute immediate window things
- Immediate window: `> …` to execute commands
  - Ex: ">shell cmd"

## Context Operator

Syntax
There are two ways of specifying context:
1. `cpp>{,,[module] } expression`
   - The braces must contain two commas and the module (executable or DLL) name or full path.
   - For example, to set a breakpoint at the SomeFunction function of EXAMPLE.dll:
     - `cpp>{,,EXAMPLE.dll}SomeFunction`
     - `cpp>module!expression`

1. `cpp>EXAMPLE.dll!SomeFunction`
   - module is the name of a module. You can use a full path to disambiguate between modules with the same name.
   - If the module path includes a comma, an embedded space, or a brace, you must use quotation marks around the path so that the context parser can properly recognize the string. Single quotation marks are considered part of a Windows file name, so you must use double quotation marks. For example,
     - `cpp>{,,"a long, long, library name.dll"} g_Var`
     - expression is any valid C++ express

From <https://docs.microsoft.com/en-us/visualstudio/debugger/context-operator-cpp>

# Misc

When trying to find all the libraries the project is loading & the order, add this flag to linker additional options:
`/verbose:lib`

Use dumpbin & dependencywalker to find what libraries/dlls are linked against (MSVCRT/MSVCRTD/LIBCMT/x64 vs x86)

```batch
dumpbin.exe /Directives (use to see the runtime library that is linked
dumpbin.exe /HEADERS  (use to see if x86 vs x64 in the machine entry)
 DUMPBIN /LINKERMEMBER[:{1|2}] <libraryname.lib>      (output all the exported symbols in a lib)
```

## Advanced Debugging Tricks:

- Common Visual Studio Commands:
  - <https://docs.microsoft.com/en-us/visualstudio/ide/reference/visual-studio-commands>
  - Complete commands can be found in Keyboard, EnvironmentOptions dialog box

- Can use VCMD to create macros as commands

- In the immediate window, prefix a command with > to execute.
  Ex: >Debug.AttachDetach

- Execute code in a macro:

  ```csharp
  DTE.Debugger.ExecuteStatement("variable_name=0")
  ```

  *Reference From <http://stackoverflow.com/questions/3868810/visual-studio-breakpoint-macro-to-modify-a-value>*

- Can execute code in Action:print message section of breakpoint settings by wrapping the value in textfield with {}. Ex:
  - `{ variable_name=0}` will set variable_name=0

- You can also concatenate several instructions on the same line. They simply have to be separated by curly braces:

  ```cpp
  { {done = (i == 100);} { object.x -= 1.0f; } { data\[15] = 3; } }
  ```

  *Reference From <https://colinbarrebrisebois.com/2011/05/19/a-taste-of-live-code-editing-with-visual-studios-tracepoints>*

## Tools

- WinDBG
- Perfmon
- Process Explorer
- Windows Performance Toolkit

## Rules of thumb

- If CPU kernel utilization is high, then it's a driver problem
- If System interrupts .1%, driver problem
  - In process monitor, look at System|interrupts process and look at threads/modules to see what's pegging CPU
- Driverquery |find "driverdllname" to find info about a driver (don't use
- strings binary.exe: >bla.txt sysinternals tool to produce all string parameters for a binary
