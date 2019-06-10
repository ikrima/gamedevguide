---
sortIndex: 7
---

Can also launch with this commandline:

"C:\\Program Files (x86)\\NVIDIA Corporation\\Nsight Visual Studio Edition 5.3\\Monitor\\Common\\Nvda.Launcher.exe" "%1"

Ex:

"C:\\Program Files (x86)\\NVIDIA Corporation\\Nsight Visual Studio Edition 5.3\\Monitor\\Common\\Nvda.Launcher.exe" "C:\\UE4Editor.exe" BBR.uproject -log

How to: Debug an Executable Not Part of a Visual Studio Solution

**Visual Studio 2013**

[Other Versions](https://visualstudio.microsoft.com/vs/preview/?OCID=AID2318528_SEM_QoTudcuQ&MarinID=QoTudcuQ_79096203770970_visual%20studio_be_c__1265538242518805_kwd-79096372770821:loc-190_)

4 out of 5 rated this helpful - [Rate this topic](https://docs.microsoft.com/en-us/visualstudio/debugger/how-to-debug-an-executable-not-part-of-a-visual-studio-solution?view=vs-2015#feedback)

Sometimes, you may want to debug an executable that is not part of a Visual Studio project. It may be an executable you created outside of Visual Studio or an executable you received from someone else.

The usual answer to this problem is to start the executable outside of Visual Studio and attach to it using the Visual Studio debugger. For more information, see [Attach to Running Processes with the Visual Studio Debugger](https://docs.microsoft.com/en-us/visualstudio/debugger/attach-to-running-processes-with-the-visual-studio-debugger?view=vs-2015)

Attaching to an application requires some manual steps, so it takes a few seconds. This slight delay means that attaching will not help if you are trying to debug a problem that occurs during startup. Also, if you are debugging a program that does not wait for user input and finishes quickly, you may not have time to attach to it. If you have Visual C++ installed, you can create an EXE project for such a program.

To create an EXE project for an existing executable

1. On the **File** menu, click **Open** and select **Project**.

1. In the **Open Project** dialog box, click the drop-down list next to the **File name** box, and select **All Project Files**.

1. Locate the executable, and click **OK**.

   This creates a temporary solution that contains the executable.

*Reference From <http://msdn.microsoft.com/en-us/library/0bxe8ytt.aspx>*

## Debugging External Applications

NVIDIA® Nsight™ Development Platform, Visual Studio Edition 4.2 User Guide

Early versions of NVIDIA Nsight were only able to debug projects built in Visual C++. However, with NVIDIA Nsight 4.2, CUDA and graphics debugging are now supported for both C++ and C# projects.

If you would like to use NVIDIA Nsight to debug an application that is built in an environment other than C++ or C#, use the tutorial outlined below.

Using NVIDIA Nsight Debugging with Other Project Types

1. In Visual Studio, create a "dummy" project by going to **File** > **New** > **Project**.

1. On the node for **Visual C++** templates, select **Empty Project**.

   Enter the name for your project and click OK.

![LaunchingNsight_2DebuggingExternal](......\assets\LaunchingNsight_2DebuggingExternal.png)

3. Select the project's **Nsight User Properties** to edit the default settings. (As an alternative, you can also go to the **Project** menu > **Nsight User Properties**.)

![LaunchingNsight_SolutionExplorer](......\assets\LaunchingNsight_SolutionExplorer.png)

4. Select **Launch external program**, and enter the path to the external program for the application that is to be debugged.

![LaunchingNsight_4Launch](......\assets\LaunchingNsight_4Launch.png)

5. Configure any other launch options or file synchronization settings which may be necessary for your particular debugging environment.

(For assistance, refer to [Host Basics](https://docs.nvidia.com/gameworks/content/developertools/desktop/host_basics.htm) and [Synchronization](https://docs.nvidia.com/gameworks/content/developertools/desktop/synchronization.htm).)

6. Click OK to save your settings.

6. You can now begin debugging your application with NVIDIA Nsight.

To do so, go to the **Nsight** menu or right-click on your project, then select the appropriate activity (**Start CUDA Debugging**, **Start Graphics Debugging**, etc.).

*Reference From <http://docs.nvidia.com/gameworks/content/developertools/desktop/debug_external_applications.htm>*
