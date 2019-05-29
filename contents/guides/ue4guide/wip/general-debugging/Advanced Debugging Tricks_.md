---
sortIndex: 5
---

## Advanced Debugging Tricks:

Common Visual Studio Commands: <https://docs.microsoft.com/en-us/visualstudio/ide/reference/visual-studio-commands>

Complete commands can be found in Keyboard, EnvironmentOptions dialog box

Can use VCMD to create macros as commands

In the immediate window, prefix a command with > to execute.

Ex: >Debug.AttachDetach

Execute code in a macro:

`DTE.Debugger.ExecuteStatement("variable_name=0")`

*Reference From <http://stackoverflow.com/questions/3868810/visual-studio-breakpoint-macro-to-modify-a-value>*

Can execute code in Action:print message section of breakpoint settings by wrapping the value in textfield with {}. Ex: { variable_name=0} will set variable_name=0

You can also concatenate several instructions on the same line. They simply have to be separated by curly braces:
*i.e. { {done = (i == 100);} { object.x -= 1.0f; } { data\[15] = 3; } }*

*Reference From <https://colinbarrebrisebois.com/2011/05/19/a-taste-of-live-code-editing-with-visual-studios-tracepoints/>*

Tools

WinDBG

Perfmon

Process Explorer

Windows Performance Toolkit

#### Rules of thumb:

- If CPU kernel utilization is high, then it's a driver problem

- If System interrupts .1%, driver problem

  - In process monitor, look at System|interrupts process and look at threads/modules to see what's pegging CPU

- Driverquery |find "driverdllname" to find info about a driver (don't use

- strings binary.exe: >bla.txt sysinternals tool to produce all string parameters for a binary
