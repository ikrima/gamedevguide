---
sortIndex: 5
---

Development Debugging:

[Useful Console Commands](fixme_self_referential_link)

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

- [UDK Console Commands](fixme_self_referential_link)

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

[Networking Tips & Tricks](fixme_self_referential_link)
