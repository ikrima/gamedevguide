---
sortIndex: 3
sidebar: ue4guide
---

# GOAL/Endresult

- Apply Material with MD=Arena to Objects in Scene
- Expected result: they get culled out through a hardcoded stencil sphere

Two cases:

  1. Normal gameboard arena
  1. Half-dome portal gameboard

## StencilMaskVal: 1 =>

arena:   allowed to write: stencil_val == 1 && depth_near
stadium: allowed to write:                  && depth_near

## StencilMaskVal: 2 =>

arena:   allowed to write: stencil_val == 2 && depth_near
stadium: allowed to write: stencil_val != 2 && depth_near

### Steps

Sphere write out stencil_val = 1

**Draw Arena:**
StencilOp = &lt; 3
DepthOp = depth_near

**Draw Stadium:**
StencilOp != 2
DepthOp    = depth_near

# Highlevel implementation tasks

1. Hardcode render two spheres as the stencil geo into stencil buffer (just piggy back on custom depth)
   Case: Normal gameboard
   Case: Portal gameboard
   Case: Special (space tear)
   - Sphere one writes stencil value that masks arena geo
   - Sphere two writes stencil value that masks stadium geo
      - _**Nongoal**_: Exact stencil operations/mask bits unimportant; figure them out later. Just need to make sure it doesn't get stomped
      - _**Goal**_: See how this affects translucent/masked materials whether in the arena or stadium and others that may not be thinking of (like decals/particles/etc)

1. Modify prepass :
   - Prepass arena geo with stencil ops: Depth Test, Depth Write, Stencil=Keep (do not write), Stencil Test
     Stencil Compare = Equal & Stencil Op = Keep, Depth Write, Depth Compare = Greater
   - Prepass everything else as normal

1. Modify the basepass:
   - Render arena geo first
   - Render everything else as normal
   - Possible Issues: Filtering out arena geo from the normal execution flow

# Approaches

1. MaterialDomain + ViewRelevance as the extension point

***GameThread:***

- CreateSceneProxies/Renderstate
  - Sometimes dirty it/recreate it for dynamic stuff

***RenderThread:***
SceneProxies implements:

- (Everyframe for dynamic/mebbe not for static)GetDynamicMeshElements/GetStaticElements
- ComputeViewRelevance =>

  - Mark which passes to mark this component to be included in that pass

  - This also more complicated than just what is being returned here bc we also have to take into account the material (e.g. if the material is translucent=>viewrelevance for translucency)
    NOTE: Look at how custom depth property in the component is percolated all the way to the RT and how it gets added to custom depth primset

  - Extend SetPrimitiveViewRelevance(FPrimitiveViewRelevance& OutViewRelevance) const
    - If MaterialDomain == MD_BBArena, outviewrelevance.arenarelevance = 1

***Render Side:***

- Gather all viewrelevance.arena into a drawlist/primset

  - REFERENCES: custom depth, StaticMeshBatchVisibility, VisibleDynamicPrimitives, TranslucentPrimSet, CustomDepthSet
     DynamicMeshElements
      To add to custom primsets (e.g. customdepthprimset/translucent), it's in this function:
      FRelevancePacket::ComputeRelevance() is where it updatees them (in parallel way)
      FRelevancePacket::RenderThreadFinalize() is where it writes them back out to FSceneView/FScene

  - REFERENCES: PositionOnlyDepthDrawList, DepthDrawList, BasePassUniformLightMapPolicyDrawList
      Here's where we create the drawlists:
          `cpp>void FStaticMesh::AddToDrawLists(FRHICommandListImmediate& RHICmdList, FScene* Scene)`

- Depth: Prepass Render Arena
  - Prepass arena geo with stencil ops: Depth Test, Depth Write, Stencil=Keep (do not write), Stencil Test       - This is done in FDeferredShadingSceneRenderer::RenderPrePassView

- Base Pass:
  - Custom Function to render our arnea-> ?????
  - Make sure it doesn't get rendered in normal pass -> ????

```cpp
UPrimitiveComponent.bRenderinmainpass
ShouldUseAsOccluder()
ShouldRenderInMainPass()
    - Looks like it's used alongside ShouldIncludeDomainInMeshPass

GetMaterialRelevance
ShouldIncludeDomainInMeshPass()

FMeshBatch.UseDynamicData
FMeshBatch.ReverseCulling
FMeshBatch.CastShadow
FMeshBatch.bUseAsOccluder
```

1. Create separate primsets like custom depth and add our arena components to that
   Advnatages: Might be simpler
   Disadvantage: Might be rigid and inflexible with lots of edge cases
       Ex: What happens when we need to draw things that are in both stadium & arena? viewrelevance bitmask sounds better

1. Just take a look at decals/mesh decals

# Helpful bits

```cpp
SetDepthStencilStateForBasePass()
TStaticDepthStencilState<...>::GetStaticState() for the class defining all the stencil op state
TStaticStencilState<>::GetRHI() for getting the default stencil (iirc, stencil expects to be set back to the default but not sure)
RHICommandSetStencilRef() for setting stencil
Custom depth primset
Decals
Decals:PostProcessing

  FTranslucentPrimSet
  FCustomDepthPrimSet
  StencilDithering for LOD transitoins
```

# Visiblity Culling Interesting things

```cpp
virtual bool CanBeOccluded() const override
    -Gets Called in FPrimitiveSceneInfo::AddToScene() & setting FScene.PrimitiveOcclusionFlags

FrustumCull<true, true>(Scene, View);

FViewInfo
    FSceneBitArray PrimitiveVisibilityMap;
    ICustomVisibilityQuery* CustomVisibilityQuery
```

There's a separation between PrimitiveBounds & PrimitiveOcclusionBounds
