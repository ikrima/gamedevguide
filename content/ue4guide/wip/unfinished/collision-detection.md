---
sidebar: ue4guide
---
Collision Detection

UBodySetup

- Contains all the physics data on a single asset (e.g. static mesh)

- Done so that all BodyInstance references can share the physics data/config and not dupe tris everywhere

- Contains FKAggregateGeom that has simplified collision representation of asset

- Typically assets implement GetBodySetup function that's used in physics state creation

Collision:

- Blocking will naturally occur between two objects set to block

- Hit events wont trigger unless Simulation Generates Hit Events is set

  - Simulation Generates Hit events doesn't need to be set on both

- Overlap + Generate Overlap events must both be set for overlap events

- Interaction between two objects is min of the flags of both actors. Ex:

  - Block + block = block

  - \[Block + sim generates hit events] + block = Hit Event on 1st actor + block

  - \[overlap+ disabled generate overlapevents] + block = nothing

  - \[overlap + generate overlap events] + block = overlap event on 1st actor

- After first blocking collision, collision system stops looking for collisions

![CollisionDetection_FilterTable-900x490-756106034](../../_assets/CollisionDetection_FilterTable-900x490-756106034.jpg)

- **Not recommended for object to have generate hit events and overlap events**

UE Physics has an async scene + sync scene based on PhysX

- Async means physics computation results can be reported at later frames

- Sync means it runs before all UE4 sim code

- No interdependency calculation between the two

Thread & Sample showing how to update collision at runtime:

- <https://wiki.unrealengine.com/Procedural_Mesh_Generation>

- <https://forums.unrealengine.com/showthread.php?2078-How-to-create-collision-information-for-procedural-geometry>

Turn On Drawing For Traces/Geometry Sweeps

- **World**->DebugDrawTraceTag

- DrawGeomSweeps

- DrawGeomOverlaps

There's a Collision Analyzer Tool for debugging Developer Tools->Collision Analyzer
