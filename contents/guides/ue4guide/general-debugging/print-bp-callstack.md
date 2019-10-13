---
sortIndex: 3
---

When running an Editor build of your game, you can now use the command:

```cpp
{,,UE4Editor-Core}::PrintScriptCallstack()

::PrintScriptCallstack()
```

*Reference From <https://www.unrealengine.com/en-US/blog/debugging-ufunction-invoke>*

Print Blueprint CallStack from Visual Studio:

- In the immediate window: `cpp>{,,UE4Editor-Core}::PrintScriptCallstack(false)`

- How to make a command alias & button for it with Visual Commander Macro

  - Create a VCMD Command called 'PrintScriptCallstack' and use this code

  ```csharp
  using EnvDTE;
  using EnvDTE80;

  public class C : VisualCommanderExt.ICommand
  {
      public void Run(EnvDTE80.DTE2 DTE, Microsoft.VisualStudio.Shell.Package package)
      {
        if (DTE.Mode == EnvDTE.vsIDEMode.vsIDEModeDebug)
        {
          //In monolothic builds, it should be ::PrintScriptCallstack()
          DTE.ExecuteCommand("? {,,UE4Editor-Core}::PrintScriptCallstack(false)");
        }
      }
  }
  ```

  - Then do this in Visual Studio to setup a command shortcut alias:

    `cpp>alias pbs VCmd.CCommandPrintBPStack`
