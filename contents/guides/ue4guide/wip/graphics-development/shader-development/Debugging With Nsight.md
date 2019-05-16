### **Nvidia Insight**

Installation:

For the full on debug experience (shader GPU debugging), you'll need a target & host machine because the debugger's going to halt your GPU which means no OS updates.

High-level installation steps:

-   Install the latest nVidia drivers on the target machine

-   Install nVidia Insight on your target & host machine

-   Ensure the requisite firewall exceptions have been set on both machines 

    -   NSight Monitor needs to have an exception on the host & target

    -   Visual Studio needs to have an exception on the host

Download and detailed configuration instructions: <http://developer.nvidia.com/nvidia-nsight-visual-studio-edition> (You'll need to register for a free dev account)

To debug the Unity Project:

-   Open up the Unity solution in visual studio and configure the remote debugging options for nvidia nsight. 

-   Unity can't use msbuild to generate the solution so you have to build your project inside of Unity (so do a standalone Development build with script debugging to a Debug/ folder)

-   Make sure you set this as the working directory for Nvidia's Nsight profiler and make sure to add this directory to the list of directories to synchronize

-   Select the Launch External Program option and set the path to your Unity project

-   **Problem:** For some reason, when the file gets sync'ed over, the app bitches when it gets launched on the target machine, saying it can't find the \[project\]\_Data folder. Still investigating this, but for now, workaround is to just manually copy over the project directory to the target machine.  (Default: C:\\Users\\\[current-user-on-target\]\\AppData\\Roaming\\NVIDIA Corporation\\Nsight\\Monitor\\Mirror\\\[hostname\]\\\[host-outdir\] so for example

![Debugging_wNsight_NVidiaInsight](C:\devguide\conversion\FINISHED\assets\Debugging_wNsight_NVidiaInsight.jpg) 

All the Paths you specify are relative to the target machine's synchronization directory (the default is specified above). However, if you select "Don't synchronize", all of the paths will be relative to the machine



### Profiling Tips

-   HUD can be activated in real-time by pressing **CTRL-Z**

-   Will show you in real-time performance counters & graphs overlayed on your Unity Window

-   **Problem:** In full screen mode, the Unity Oculus app won't release the hardware cursor to allow you to click around the Nvidia Nsight graphs. Just alt-tab in and out of the app and that should fix your problem.

-   **CTRL+D** will give you a depth complexity test. Test to see if you're getting a lot of overdraw =&gt; do better culling, render front to back, z-only pass

-   **CTRL+M** will give you minimum geometry

-   Frame Capture: Allows you to capture an entire frame's rendering

    -   Can scrub through the timeline to see the drawcalls build on

    -   Hold **CTRL+SHIFT** key to get an even more zoomed in view around mouse cursor

    -   Hold **SHIFT** to zoom around a render target.

    -   Right click to re-center everything

-   Shader Debugger: Can set breakpoints in your shader, step-in/over functions, add variables to watch. Full on visual studio editing for your shaders

    -   Can also dynamically modify your shaders and A/B test your shaders

    -   Graphics Focus picker allows you to visually see the pixel/vertices that have changed. Can also pick the pixel you want to break on

    -   Can also pick a pixel to show the entire pixel history to see the different values of the pixel

    -   Breakpoint conditionals evaluated on GPU so it's at full speed

