# Debugging Process Start/External Processes

For debugging external processes, I recommend using 'Global Flags (X64)' tool (.../WindowsSDK/Debuggers/x64/gflags.exe) which is a part of windows sdk or debugging tools.
This is helpful for debugging things like UBT which are kicked off as child processes or GUIless stuff like server processes
![GeneralDebug_DebugExternalProcess.png](../../_assets/dev-notes/GeneralDebug_DebugExternalProcess.png)

*Reference From [https://udn.unrealengine.com/questions/225812/debugging-ue4editor-cmdexe.html](https://udn.unrealengine.com/questions/225812/debugging-ue4editor-cmdexe.html)*

Also, the check our internal `kldevtils` python cli toolset which contains these types of helpers
