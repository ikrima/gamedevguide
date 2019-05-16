```
sortIndex: 1
```

- [Adding a button to attach the debugger directly to the UE4 instance][https://kitelightning-my.sharepoint.com/personal/ikrima_kiteandlightning_la/documents/kitelightning/bebylon/unreal.one]

- [Print Blueprint/BP Callstack][https://kitelightning-my.sharepoint.com/personal/ikrima_kiteandlightning_la/documents/kitelightning/bebylon/unreal.one]

* **Crash Course Visual Assist Shortcuts:**

  ALT+G - Context menu to go to places where a function/variable/class is referenced

  ALT+SHIFT+G - Context menu to see the declaration/implementation of a function, see instances of a type, see base symbols (classes/function/variables it might be inherting from)

  ALT+O - Toggle Header/Code file

  ALT+SHIFT+S - Search for symbols (Really useful!)

  ALT+SHIFT+F -

  ALT+SHIFT+Q

  ALT+SHIFT+R - Rename symbol

  CTRL+SHIFT+V

* USF/USH/HLSL intellisense

  https://marketplace.visualstudio.com/items?itemName=TimGJones.HLSLToolsforVisualStudio>

  Enable USF/USH in options menu:

![](/../../assets/VSTipsUE4_Overview.jpg)

- Setting up Visual Studio with UE4:

  https://docs.unrealengine.com/latest/INT/Programming/Development/VisualStudioSetup/

* Enable Visual Assist support for UE4 C++ support

  https://docs.wholetomato.com/default.asp?W763

- Add va_stdafx.h file in directory of one of your sln or vcxproj files:

  https://support.wholetomato.com/default.asp?W783

* VassistX/Intellisense/Visual Assist X Performance Optimization:

  - Disable intellisense browse database <https://support.wholetomato.com/default.asp?W133>

  - Disable enumerate references <https://support.wholetomato.com/default.asp?W664>

  - <https://support.wholetomato.com/default.asp?W663>

  - <https://docs.unrealengine.com/latest/INT/Programming/Development/VisualStudioSetup/>

- Add exceptions to Windows Defender to your project directories, for devenv, unrealheader tool, msbuild, cl.exe, incredibuild, link.exe

* VS2017 Disable lightweight solutions

- Make Visual Studio 2017 faster: https://medium.com/burak-tasci/tweaking-the-environment-to-speed-up-visual-studio-79cd1920fed9
