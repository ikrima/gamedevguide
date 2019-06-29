---
sortIndex: 1
---

# Export Anim

- Houdini:
  - Y-up, Z forward
  - Set keyframe on root skeleton at frame 0
  - Export ROP: Force Blend Shape Export + Force Skin Deform Export

![](../assets/hou-rop-fbx-xport.png)

- Unreal
  - Import with selecting existing skeleton if already exists
  - Use T0 as ref pose = True
  - Convert Scene = True
  - Force X-Axis = True
- NOTE: Not sure how to export morph targets into UE4
- GOTCHAS:
  - Make sure prerot/postrot is set accordingly between bindpose & imported fbx
  - UE4 exported fbxs dont have prerot & postrot

# Import Anim from UE4

- Export with force X-axis front
- Houdin import FBX convert Y-up=true
- You might need to set the capture frame in the FBX Mesh network to be the first frame of the imported animation to reset the fbx bind skeleton bind pose
