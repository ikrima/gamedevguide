---
sortIndex: 4
sidebar: houdini
---

# Water Tight Mesh

- GameDev Voxelize Mesh
- VDB SDF Reshape: Close - Causes holes & valleys to be filled
- VDB SDF Reshape: Open - Causes isolated islands to erase
- VDB Segment By Connectivity: Can be used to get rid of islands

# Remeshing/Refining/Subdivide: Here are useful nodes

- Subdivide
- Remesh
- InstantMeshes
- Divide

# Poly Cleanup

[Houdini Game Dev Toolset tutorial by Michael Pavlovich](https://www.youtube.com/playlist?list=PLkzopwqcFevZLnQIIU8GTGwg4o7RaarZU)

1. **GameDev Delete Small Parts:** delete small parts
1. **GameDev Voxelize Mesh**: create water tight mesh and remove internal geo
   - Internally this does VDB SDF Reshape and converts back to poly
1. Two Approaches for Generating GameRes Geo
   1. PolyReduce nodes
      1. **PolyReduce:** reduce polygons
      1. **PolyDoctor:** better version of Divide+Clean nodes
         - Repair Ill-Formed (aka degenerate prims)
         - Repair 5+ edges
         - Repair Non-Convex
         - Repair Non-Manifold points
         - Old nodes
           - Divide**:** Triangulate generated triangles
             - Convex polygons
             - Don't generate slivers
             - Avoid slivers
           - Clean
             - Remove Degenerate Prims
             - Fix Overlaps
             - Remove Unused Points
             - Manifold-Only Topology
   1. **Instant Mesh:** generate clean topology
1. **GameDev AutoUV**: generate UVs
   - **GameDev UV Visualize:** visualize UVs
   - **GameDev Mark Seams + UV Flatten:** can explicitly specify where seams should be
1. **Normal:** generate vertex normals
