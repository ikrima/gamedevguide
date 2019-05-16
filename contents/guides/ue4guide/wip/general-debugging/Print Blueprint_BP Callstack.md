<https://www.unrealengine.com/en-US/blog/debugging-ufunction-invoke>

When running an Editor build of your game, you can now use the command,

{,,UE4Editor-Core}::PrintScriptCallstack()

and just

::PrintScriptCallstack()

_From &lt;<https://www.unrealengine.com/en-US/blog/debugging-ufunction-invoke>&gt;_

Print Blueprint CallStack from Visual Studio

- In the immediate window: {,,UE4Editor-Core}::PrintScriptCallstack(false)

- How to make a command alias & button for it

  Visual Commander Macro:

  using EnvDTE;

  using EnvDTE80;

​ public class C : VisualCommanderExt.ICommand

​ {

​ public void Run(EnvDTE80.DTE2 DTE, Microsoft.VisualStudio.Shell.Package package)

​ {

​ if (DTE.Mode == EnvDTE.vsIDEMode.vsIDEModeDebug)

​ {

​ //In monolothic builds, it should be ::PrintScriptCallstack()

​ DTE.ExecuteCommand("? {,,UE4Editor-Core}::PrintScriptCallstack(false)");

​ }

​ }

​ }
