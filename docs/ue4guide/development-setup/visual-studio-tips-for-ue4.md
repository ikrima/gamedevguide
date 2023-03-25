---
sortIndex: 1
sidebar: ue4guide
---

# General Tips

- [Adding a button to attach the debugger directly to the UE4 instance](../general-debugging/add-vs-autoattach-to-ue4-button)

- [Print Blueprint/BP Callstack](../general-debugging/print-bp-callstack)

- Crash Course Visual Assist Shortcuts
  - ALT+G - Context menu to go to places where a function/variable/class is referenced
  - ALT+SHIFT+G - Context menu to see the declaration/implementation of a function, see instances of a type, see base symbols (classes/function/variables it might be inheriting from)
  - ALT+O - Toggle Header/Code file
  - ALT+SHIFT+S - Search for symbols (Really useful!)
  - ALT+SHIFT+F -
  - ALT+SHIFT+Q
  - ALT+SHIFT+R - Rename symbol
  - CTRL+SHIFT+V

## Configuration

- USF/USH/HLSL intellisense
  - <https://marketplace.visualstudio.com/items?itemName=TimGJones.HLSLToolsforVisualStudio>
  - Enable USF/USH in options menu:
  - Screenshot: ![VSTipsUE4_Overview](../_assets/VSTipsUE4_Overview.jpg)

- Setting up Visual Studio with UE4: <https://docs.unrealengine.com/latest/INT/Programming/Development/VisualStudioSetup>

- Add exceptions to Windows Defender to your project directories, for devenv, unrealheader tool, msbuild, cl.exe, incredibuild, link.exe
  - Our devops scripts (setupmachine.py) automatically does this.
  - Here's a [powershell script](../development-setup/windows-defender-exclusions-script) that does the same thing

- VS2017 Disable lightweight solutions

- Make Visual Studio 2017 faster: <https://medium.com/burak-tasci/tweaking-the-environment-to-speed-up-visual-studio-79cd1920fed9>
  - [Adding a button to attach the debugger directly to the UE4 instance](../general-debugging/add-vs-autoattach-to-ue4-button)
  - [Print Blueprint/BP Callstack](../general-debugging/print-bp-callstack)

## Visual Assist

### Optimal Config

- Enable Visual Assist support for UE4 C++ support <https://docs.wholetomato.com/default.asp?W763>
- This is no longer needed ~~Add va_stdafx.h file in directory of one of your sln or vcxproj files: <https://support.wholetomato.com/default.asp?W783>~~
- VassistX/Intellisense/Visual Assist X Performance Optimization:
  - Disable intellisense browse database <https://support.wholetomato.com/default.asp?W133>
  - Disable enumerate references <https://support.wholetomato.com/default.asp?W664>
  - <https://support.wholetomato.com/default.asp?W663>
  - <https://docs.unrealengine.com/latest/INT/Programming/Development/VisualStudioSetup>
  - Run concurrent parser threads of Visual Assist with [below-normal priority by setting](https://support.wholetomato.com/default.asp?W774) `HKCU\Software\Whole Tomato\ConcurrentThreadPriority`:
    - `THREAD_PRIORITY_NORMAL = 0`
    - `THREAD_PRIORITY_BELOW_NORMAL = ffffffff`
    - `THREAD_PRIORITY_LOWEST = fffffffe`

### Debugging & Logging VAssistX

**General link for resolving performance issues:** <https://support.wholetomato.com/default.asp?W663>

**Logging:** Although debug logs contain information primarily related to functions and performance of Visual Assist, they will contain names of local solutions, projects, directories, and files, and may also contain symbol names.

If you can open the options dialog of Visual Assist, enable logging:

![](../_assets/VSTipsUE4_VAssistXDebug_options.png)

(_Logging begins the moment you enable the checkbox. If you close and re-open the options dialog, the checkbox may not be enabled even though logging is in effect._)

Note the location of va.log.

![](../_assets/VSTipsUE4_VisualAssist.png)

If you cannot open the options dialog of Visual Assist or are so directed by customer support, use regedit to enable logging before Visual Studio starts:

1. Navigate to `HKCU\\Software\\Whole Tomato`
2. Set the value of Logging to 1

[(Reference)](https://support.wholetomato.com/default.asp?W305)
