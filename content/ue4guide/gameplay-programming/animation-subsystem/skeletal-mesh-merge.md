---
sortIndex: 6
sidebar: ue4guide
---

<https://docs.unrealengine.com/en-us/Engine/Animation/Working-with-Modular-Characters>

<https://forums.unrealengine.com/unreal-engine/feedback-for-epic/5101-content-and-documentation-for-customizable-characters-using-fskeletalmeshmerge?5665-Content-and-Documentation-for-Customizable-characters-using-FSkeletalMeshMerge=>

#### Morph Mesh Merge:

Morphtarget is very simple.

UMorphTarget -> FMorphTargetLODModel (per LOD) -> FMorphTargetDelta

This delta stores vertex index, and delta of position and normal.

Mesh merge code is

```cpp
bool FSkeletalMeshMerge::DoMerge(TArray\* RefPoseOverrides / *= nullptr* /)

 /** Destination merged mesh */

 USkeletalMesh* MergeMesh;

 /** Array of source skeletal meshes */

 TArray<USkeletalMesh*> SrcMeshList;
```

You have SrcMeshList, and at the end,

void FSkeletalMeshMerge::GenerateLODModel( int32 LODIdx )

Will generate the new LODModel.

USkeletalMesh has TArray MorphTargets. You'll have to transfer SrcMeshList to MergedMesh with new vertex Id.

I assume you can save the vertex Id link somewhere in GenerateLODModel, and look for them later.

Later on once you have UMorphtarget for new mesh, make sure to call

void RegisterMorphTarget(UMorphTarget\* MorphTarget);

To register.

We create Morphtarget with internal object of USkeletalMesh, meaning you'll have to create them with the current skeletalmesh as outer.

MorphTarget = NewObject(BaseSkelMesh, FName(\*ShapeName));

*Reference From <https://udn.unrealengine.com/questions/397831/adding-morph-targets-to-skeletal-mesh-merge.html>*

bool FLODUtilities::RegenerateLOD(USkeletalMesh\* SkeletalMesh, int32 NewLODCount /*= 0*/, bool bRegenerateEvenIfImported /*= false*/)

Usually this is utility function for doing so.

*Reference From <https://udn.unrealengine.com/questions/456237/crash-skeletal-mesh-merge-output-has-no-lodrenderd.html>*
