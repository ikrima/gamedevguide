---
sortIndex: 2
sidebar: ue4guide
---

[Building Paragon in UE4  GDC 2016 Event Coverage Unreal Engine](https://www.youtube.com/watch?v=BXcw2IrIinc)

Fast player effect targetting:

- Draw Actor Bounding box with material for player effect masked with Custom Stencil Buffer

- Easy to have lots of variation not in one being uber shader

- ![ParagonOptimization_Bots](../../assets/ParagonOptimization_Bots.png)

Reduce number of components on characters

- Transform update is expensive

- Particles: Added auto attach/detach for particle systems when activating/deactivating so transform updates don't happen on particle system components all the time

  - Spawns effects on-demand from game code on client only, no server management

Reduce tick rate of certain objects or manually use timer manager (e.g. if object ticks once every 10 seconds, no need for the tick check to happen every frame)

- Tick some objects manually to reduce task graph overhead and can improve cache coherence
