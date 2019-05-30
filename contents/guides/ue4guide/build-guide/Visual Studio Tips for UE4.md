---
sortIndex: 8
---

# General Stuff

- [Adding a button to attach the debugger directly to the UE4 instance](/ue4guide/vs-autoattach-to-ue4-button)

- [Print Blueprint/BP Callstack](/print-blueprint-callstack)

- Crash Course Visual Assist Shortcuts:

  - ALT+G - Context menu to go to places where a function/variable/class is referenced
  - ALT+SHIFT+G - Context menu to see the declaration/implementation of a function, see instances of a type, see base symbols (classes/function/variables it might be inherting from)
  - ALT+O - Toggle Header/Code file
  - ALT+SHIFT+S - Search for symbols (Really useful!)
  - ALT+SHIFT+F -
  - ALT+SHIFT+Q
  - ALT+SHIFT+R - Rename symbol
  - CTRL+SHIFT+V

- USF/USH/HLSL intellisense
  - <https://marketplace.visualstudio.com/items?itemName=TimGJones.HLSLToolsforVisualStudio>
  - Enable USF/USH in options menu:
  - Screenshot: [](/assets/media/image1.jpg)

- Setting up Visual Studio with UE4: <https://docs.unrealengine.com/latest/INT/Programming/Development/VisualStudioSetup>

- Enable Visual Assist support for UE4 C++ support <https://docs.wholetomato.com/default.asp?W763>

- Add va_stdafx.h file in directory of one of your sln or vcxproj files: <https://support.wholetomato.com/default.asp?W783>

- VassistX/Intellisense/Visual Assist X Performance Optimization:
  - Disable intellisense browse database <https://support.wholetomato.com/default.asp?W133>
  - Disable enumerate references <https://support.wholetomato.com/default.asp?W664>
  - <https://support.wholetomato.com/default.asp?W663>
  - <https://docs.unrealengine.com/latest/INT/Programming/Development/VisualStudioSetup>

- Add exceptions to Windows Defender to your project directories, for devenv, unrealheader tool, msbuild, cl.exe, incredibuild, link.exe

- VS2017 Disable lightweight solutions

- Make Visual Studio 2017 faster: <https://medium.com/burak-tasci/tweaking-the-environment-to-speed-up-visual-studio-79cd1920fed9>
  - [Adding a button to attach the debugger directly to the UE4 instance](/ue4guide/vs-autoattach-to-ue4-button)
  - [Print Blueprint/BP Callstack](/print-blueprint-callstack)

# Visual Asist Debugging

## **Enable Logging**

Visual Assist can produce debug logs to assist with technical problems. Follow these steps only upon direction of Whole Tomato Software. Do not send a log with an initial request for technical assistance, or when unsolicited.

Although debug logs contain information primarily related to functions and performance of Visual Assist, they will contain names of local solutions, projects, directories, and files, and may also contain symbol names.

If you can open the options dialog of Visual Assist, enable logging:

[](/assets/media/image1.png)

(Logging begins the moment you enable the checkbox. If you close and re-open the options dialog, the checkbox may not be enabled even though logging is in effect.)

Note the location of va.log.

[](assets/media/image2.png)

If you cannot open the options dialog of Visual Assist or are so directed by customer support, use regedit to enable logging before Visual Studio starts:

1. Navigate to HKCU\\Software\\Whole Tomato
1. set the value of Logging to 1

*From <https://support.wholetomato.com/default.asp?W305>*
