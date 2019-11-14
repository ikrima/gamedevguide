---
sortIndex: 1
sidebar: houdini
---

# Commonly Used Nodes

- Convert Splines to Geo: Polyline or wire node
- Convert Polygon to Volume
  - Use GameDev Voxel Mesh Node: Creates watertight mesh
  - Use VDB From Polygons Node: Needs watertight mesh
- Convert Volume to Polygon:
  - Convert VDB: Convert to=polygons
- Convert Volume to surface/isosurface/sdf:
  - Convert VDB: VDB Class: Fog -> SDF
  - VDB Topology to SDF: will create shrink wrapped sdf around active vdb nodes. By definition, will create water tight meshes

# Useful Nodes

| Node         | Description                                                                   |
| ------------ | ----------------------------------------------------------------------------- |
| Rotoshape    | Allow to rotoscope image files                                                |
| Polyframe    | Generate frames along curves, Mikkt Tangents, etc.                            |
| Connectivity | Generates mesh connectivity information so you can grab /destroy mesh islands |
