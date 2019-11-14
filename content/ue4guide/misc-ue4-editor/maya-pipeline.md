---
sortindex: 3
sidebar: ue4guide
---

## GENERAL NOTES:

### LOD

- LOD objects in Maya must be a single piece of geometry or UE4 will fail on Import

- UE4 cannot properly create a lightmap UV set for LOD objects so this must be done in Maya (updated in 4.5 so it should work now)

### TEXTURES

- Textures must be photoshop files in Maya in order to link up in UE4

- Diffuse map should have roughness map in its alpha channel

### IMPORTING FBX INTO UE4

- \*Re-Importing is very weak.

  - Re-Importing Textures after adding an Alpha channel does nothing

  - Re-Importing Geometry after changing Uvs does work as expected

  - When you reimport an animation, you can mess with the structure of the object (thus changing the skeleton) but you need to reimport the animation first, then the mesh.

  - If you receive an error that the skeleton is not the same, you need to reimport again, animation first, then mesh. But at least you do not need to start from scratch!

  - If reimporting doesn't do anything, try exporting the FBX again. That seems to get it unstuck.
