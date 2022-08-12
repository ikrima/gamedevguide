# Debugging Process Start/External Processes

Use `gflags.exe`

* part of windows sdk `WindowsSDK\Debuggers\x64\gflags.exe`
* helpful for debugging things like UBT which are kicked off as child processes or GUIless stuff like server processes
  ![](../_assets/generaldebug_dbg-external-process.png)
* Reference from [https://udn.unrealengine.com/questions/225812/debugging-ue4editor-cmdexe.html](https://udn.unrealengine.com/questions/225812/debugging-ue4editor-cmdexe.html)
* Also, the check our internal `kldevtils` python cli toolset which contains these types of helpers
