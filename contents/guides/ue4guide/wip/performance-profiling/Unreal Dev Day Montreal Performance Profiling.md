[[UE4 Performance and Profiling | Unreal Dev Day Montreal 2017 | Unreal Engine]](https://www.youtube.com/watch?v=hcxetY8g_fs)

![Video web content titled: UE4 Performance and Profiling | Unreal Dev Day Montreal 2017 | Unreal Engine](file:///C:/Users/KITELI~1/AppData/Local/Temp/msohtmlclip1/02/clip_image001.png)

Dev build -&gt; Noise in draw thread; Test is cleanest

Profiling from editor:

-&gt;Play in Standalone

-&gt;Make sure Editor not updating in real time & not updating in background

-&gt;Make sure frame rate smoothing is off & vsync is off

-&gt;Minimize editor

-&gt;Don't profile from PIE

net.DumpRelevantActors

to run on server: cheat net.\* command

stat net (4.19)
