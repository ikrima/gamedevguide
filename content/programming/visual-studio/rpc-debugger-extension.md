---
sortIndex: 5
sidebar: programming
---

# Visual Studio Debugger RPC Extension

Of course after writing all this, it soon became obvious that there were better ways. Here's the C# equivalent:

```csharp
using EnvDTE;
namespace AttachDebugger
{
  class Program
  {
    static void Main(string[] args)
    {
      try
      {
        DTE dte = (DTE)System.Runtime.InteropServices.Marshal.GetActiveObject("VisualStudio.DTE.10.0");
        dte.ExecuteCommand("Macros.StarVSMacros.Debug.AttachToGame");
      }
      catch (System.Exception e)
      {
        System.Windows.Forms.MessageBox.Show("EXCEPTION - Debugger not available: " + e.Message);
      }
    }
  }
}
```

This is the version I ended up using. All it needs is a reference to EnvDTE added to your C# project to compile.
Some references:
- [Visual Studio extensibility](http://www.mztools.com/resources_vsnet_addins.aspx)
- [How to: Add References to the EnvDTE and EnvDTE80 Namespaces](http://msdn.microsoft.com/en-us/library/yf86a8ts(v=vs.80).aspx)
- [How to: Get References to the DTE and DTE2 Objects](http://msdn.microsoft.com/en-us/library/68shb4dw(v=vs.80).aspx)
- [Visual Studio Automation Reference](http://msdn.microsoft.com/en-US/library/ms228691(v=vs.80).aspx)
- [VBScript Primer](http://technet.microsoft.com/en-us/library/ee198896.aspx)
- [VBScript Error Handling](http://technet.microsoft.com/en-us/library/ee692852.aspx)

From <https://github.com/dwilliamson/b/blob/623a4882561c0893e01488730896c6660794e257/Posts/2012-02-07-11-37-23.txt>
