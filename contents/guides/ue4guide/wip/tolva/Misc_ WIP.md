---
sortIndex: 5
---

Development Debugging:

[Useful Console Commands]\(onenote:<https://kitelightning-my.sharepoint.com/personal/ikrima_kiteandlightning_la/Documents/KiteLightning/Bebylon/Unreal.one#Useful> Console Commands§ion-id={37412B85-90BD-4C74-B6F2-230753E331ED}&page-id={25F728ED-B2FE-4B36-8F5E-C7F6F255AF48}&end)

Memory Leaking:

gc.CollectGarbageEveryFrame 1

| [Opaques](https://www.perforce.com/products/hansoft/server-hostname)                                 | Not done     | andrew     | 0.0d     |
| ---------------------------------------------------------------------------------------------------- | ------------ | ---------- | -------- |
| **[Masked Transparents (Cutouts)](http://www.hansoft.com/releasenotes/HansoftServerHostname70.htm)** | **Not done** | **andrew** | **0.0d** |
| **[Blended Transparents](http://www.hansoft.com/releasenotes/HansoftServerHostname70.htm)**          | **Not done** | **andrew** | **0.0d** |
| **[Particles](http://www.hansoft.com/releasenotes/HansoftServerHostname70.htm)**                     | **Not done** | **andrew** | **0.0d** |
| **[Animations](http://www.hansoft.com/releasenotes/HansoftServerHostname70.htm)**                    | **Not done** | **andrew** | **0.0d** |
| **[Tickable objects](http://www.hansoft.com/releasenotes/HansoftServerHostname70.htm)**              | **Not done** | **andrew** | **0.0d** |
| **[Depth pre-pass](http://www.hansoft.com/releasenotes/HansoftServerHostname70.htm)**                | **Not done** | **andrew** | **0.0d** |
| **[CPU visibility queries](http://www.hansoft.com/releasenotes/HansoftServerHostname70.htm)**        | **Not done** | **andrew** | **0.0d** |
| **[GPU visibility queries](http://www.hansoft.com/releasenotes/HansoftServerHostname70.htm)**        | **Not done** | **andrew** | **0.0d** |
| **[Post-process stack](http://www.hansoft.com/releasenotes/HansoftServerHostname70.htm)**            | **Not done** | **andrew** | **0.0d** |
| **[CPU vs GPU load balancing](http://www.hansoft.com/releasenotes/HansoftServerHostname70.htm)**     | **Not done** | **andrew** | **0.0d** |

Physics:

1. Visualize by using

TraceTag or TraceTagAll

2. Go into Debug Mode:

- ToggleDebugCamera

Misc:

- Turn on show all properties while playing & unsafe properties
- Toggle allow execution of script functions in editor
- EditActor: to bring up detail view of actor

RecompileShaders global

RecompileShaders material

RecompileShaders all

Collision Analyzer Tool

Lightbaking

- DumpUnbuiltLightInteractions

Showlog

Log/Log List [string]/Log [cat][level]

ShowDebugToggleSubCategory \*

ShowDebug \*

Actor Select Relevant Lights

**Useful UDK/UE3 Links on Performance/Tooling:**

- Go through UDK console commands and make a list of applicable ones:

- [UDK Console Commands]\(onenote:#UDK Console Commands§ion-id={37412B85-90BD-4C74-B6F2-230753E331ED}&page-id={8E0A0113-FF15-433D-95A7-92451A0EC7E8}&end&base-path=<https://kitelightning-my.sharepoint.com/personal/ikrima_kiteandlightning_la/Documents/KiteLightning/Bebylon/Unreal.one>)

<https://docs.unrealengine.com/udk/Three/GameplayDebugging.html>

<https://docs.unrealengine.com/udk/Three/StatsDescriptions.html>

<https://docs.unrealengine.com/udk/Three/RemoteControl.html>

<https://docs.unrealengine.com/udk/Three/GameplayProgrammingHome.html>

<https://docs.unrealengine.com/udk/Three/PerformanceHome.html>

<https://docs.unrealengine.com/udk/Three/GameplayPerformanceOptimization.html>

<https://docs.unrealengine.com/udk/Three/PerfStats.html>

<https://docs.unrealengine.com/udk/Three/GameplayProfiler.html>

<https://docs.unrealengine.com/udk/Three/RenderingHome.html>

<https://docs.unrealengine.com/udk/Three/WebHome.html>

<https://docs.unrealengine.com/udk/Three/PerformanceDebugging.html>

<http://www.hourences.com/tutorials-ue3-performance-profiling-introduction>

Go to bool StaticExec( UWorld* InWorld, const TCHAR* Cmd, FOutputDevice& Ar ) in Obj.cpp and extract out useful commands and arguments (eg listprops, getall, singleref, refs, etc)

- Dev Tools

- Pause World Ticking
  - Tick One Frame Forward at Fixed Timestep
  - Also enable UCheatManager() built-in functions on Dev Tool
  - Fixed Random Seed & Set Fixed Timestep dev options

[Networking Tips & Tricks]\(onenote:Unreal.one#Tips Tricks§ion-id={37412B85-90BD-4C74-B6F2-230753E331ED}&page-id={79F41BB9-4B34-43DB-85C3-D97DAB1D900A}&end&base-path=<https://kitelightning-my.sharepoint.com/personal/ikrima_kiteandlightning_la/Documents/KiteLightning/Bebylon>)
