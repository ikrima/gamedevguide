---
sortIndex: 8
sidebar: ue4guide
---

<https://udn.unrealengine.com/questions/374348/vr-preview-with-dedicated-server.html>>

Recommended approach is to run with editor
1. Server:        `UE4Editor.exe MPRepro mptest -server -log`
1. VR Client(s):  `UE4Editor.exe MPRepro 127.0.0.1 -game -vr`
1. Non-VR Client: `UE4Editor.exe MPRepro 127.0.0.1 -game -nohmd`

Can also specify VR hmd:
1. VR Client 1: `UE4Editor.exe MPRepro 127.0.0.1 -game -vr -hmd=steamvr`
1. VR Client 2: `UE4Editor.exe MPRepro 127.0.0.1 -game -vr -hmd=oculusrift`

*Reference From <https://udn.unrealengine.com/questions/374348/vr-preview-with-dedicated-server.html>*

Dedicated server can work with this changelist:
<https://github.com/EpicGames/UnrealEngine/pull/2514>
