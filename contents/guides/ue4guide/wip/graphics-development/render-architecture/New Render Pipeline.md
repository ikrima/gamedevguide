---
sortIndex: 2
---

Motivation: Need to execute lot of draws

- Modular construction

- Dynamic lighting/shadowing need extra mesh passes

- Some techniques (DXR/GPU culling) needs to eval entire scene



Approach:

- Draw call merging based on RHI
- No more per draw per frame shader params



Mesh Drawing/Render Refactor:

- Very quick description would be: no more draw policies and static draw lists. Everything is now done through mesh processors, mesh draw commands (draw state) and EMeshPass lists.

- Mesh draw commands are build and cached when you attach your prim to scene.

  Mesh processors convert mesh batches to mesh draw commands.

  EMeshPass is basically a list of visible mesh draw commands for a given pass, which is sorted, merged and drawn.

  Now, as for render graph it's currently not used too much in 4.22 :)



​	MeshBatch is now converted into mesh draw command, which contains all the draw state (binding etc).

​	FMeshBatch is like an interface for rendering.



Misc:

- <https://github.com/EpicGames/UnrealEngine/commit/b5d7db368977e263092be9b97f78944739f80476>

