---
sortIndex: 2
---

- <https://blog.markvincze.com/attach-to-process-shortcut-in-visual-studio>

- Example script for UE4:

```csharp
  using EnvDTE;
  using EnvDTE80;
  using System;

public class C : VisualCommanderExt.ICommand
{
  public void Run(EnvDTE80.DTE2 DTE, Microsoft.VisualStudio.Shell.Package package)
  {
    foreach(Process2 proc in DTE.Debugger.LocalProcesses)
    {
      if(proc.Name.ToString().Contains("UE4Editor"))
      {
        proc.Attach2(""); //Can specify specific debug engine like "Native" "Managed"
        return;
      }
    }

    System.Windows.MessageBox.Show("UE4 instance was not found.");
  }
}
```

- To add it to the toolbar:

  ![GeneralDebugging_Addingbutton](..\assets\GeneralDebugging_Addingbutton.png)

  ![GeneralDebugging_Addingbutton2](..\assets\GeneralDebugging_Addingbutton2.png)
