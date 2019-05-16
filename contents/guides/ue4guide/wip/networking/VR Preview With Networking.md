https://udn.unrealengine.com/questions/374348/vr-preview-with-dedicated-server.html>

Recommended approach is to run with editor

1.  Server: UE4Editor.exe MPRepro mptest -server -log

2.  VR Client(s): UE4Editor.exe MPRepro 127.0.0.1 -game -vr

3.  Non-VR Client: UE4Editor.exe MPRepro 127.0.0.1 -game -nohmd

Can also specify VR hmd:

1.  VR Client 1: UE4Editor.exe MPRepro 127.0.0.1 -game -vr -hmd=steamvr

2.  VR Client 2: UE4Editor.exe MPRepro 127.0.0.1 -game -vr -hmd=oculusrift

_From &lt;<https://udn.unrealengine.com/questions/374348/vr-preview-with-dedicated-server.html>&gt;_

Dedicated server can work with this changelist:

<https://github.com/EpicGames/UnrealEngine/pull/2514>
