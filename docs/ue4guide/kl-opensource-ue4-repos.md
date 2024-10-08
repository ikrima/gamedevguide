# Open Source UE4 Repo

Mostly outdated repos but keeping here for reference. Everything here is permissively licensed so feel free to use in your own games.

## Superluminal Profiler

[Superluminal](https://www.superluminal.eu/) is an insanely low-overhead psamplin & instrumenting profiler with thread block visualization

[Repo: https://github.com/kitelightning/SuperluminalPlugin](https://github.com/kitelightning/SuperluminalPlugin)

## Microprofile

**NEW:** 4.19.2 Integration with in-game live update drawing [Video demo: https://twitter.com/KNLstudio/status/999422263190474752](https://twitter.com/KNLstudio/status/999422263190474752)

Integrating jonas' amazing [microprofile](https://github.com/jonasmr/microprofile). It's a fully featured profiler with live capture support, GPU timers, flame graphs, and remote capture. [Short demo video: https://twitter.com/KNLstudio/status/911672310238556160](https://twitter.com/KNLstudio/status/911672310238556160)

[Repo: https://github.com/ikrima/UnrealEngine/tree/feature-microprofiler](https://github.com/ikrima/UnrealEngine/tree/feature-microprofiler)

## Unreal Engine Python

Fully featured Python support in UE4: <https://twitter.com/KNLstudio/status/932657812466843648>

- Full access to UE4's reflection layer (UObjects, UFunctions, & Blueprints)
- Extensive support for native Slate widgets & UMG in Python
- Support for Editor Extensions (Custom Viewports, ToolbarButtons, Custom Context Menus)
- Automation: Creating custom asset import pipelines like ingesting FBX, creating animation composites,
- Sequencer scripting support

[Our fork is at https://github.com/kitelightning/UnrealEnginePython/](https://github.com/kitelightning/UnrealEnginePython/)

## LivePP UE4 Plugin

Live++ is an insanely fast hot-reloading library. Here's an example in our project of doing a hotreload in &lt; 2s: <https://twitter.com/KNLstudio/status/984093749461401602>. The plugin is does the integration work for you and you simply just need to drop it in your project.

Live++ is made by [Molecular Matter](https://molecular-matters.com/products_livepp.html)

[Repo: https://github.com/kitelightning/LivePP](https://github.com/kitelightning/LivePP)

## IGMemtrace

**Coming Soon:** [Integrating Insomniac Games MemTrace Tool into UE4](https://github.com/deplinenoise/ig-memtrace)
The tool is a faster & more improved variant of UE4's MallocProfiler. For example, it doesn't take 20 mins to open a couple minute trace.

Features

- Lightweight C++ runtime component with network recording
- CRT heap hooking on Windows (Durango hooking available on request to licensed devs)
- Full support for custom heaps and allocators
- Supports displaying and analyzing fragmentation for custom heaps
- Can display a delta between two arbitrary points in time.
- Can aggregate memory data along several axes, including custom scopes
- Supports asset and component memory scoping out of the box, but can be
  extended in source to group on arbitrary scopes
- Supports forward and backward scrubbing in trace files during analysis
