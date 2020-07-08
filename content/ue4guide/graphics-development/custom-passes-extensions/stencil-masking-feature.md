---
sortIndex: 1
sidebar: ue4guide
---

# Approach

1. Render a sphere into stencil channel. Goal: In 2-4 hrs, extend UE4 to write to stencil buffer. Non-goal: any generality support, edge cases with drawing arena vs stadium order, etc.
   1. Set render states to stencil buffer
   1. Render Sphere (hardcoded) into stencil channel
   1. Ensure it doesn't mess with the remaining pipeline
      1. Test in a simple test level
      1. Test in U-Master-GoldFingers
   1. Validate in RenderDoc
   1. Hardcode some test geo to stencil clip against the mask you created. Validate that it works
      1. Try with Opaque
      1. Try with Translucent for shits & giggles

1. Integrate stenciling for all materials on Material Domain BBArena. Goal: Only support happy path (opaque objects + ground floor within arena sphere. Non-goal: fixing any problems with objects in the arena edge, translucency, particles if they don't work
   1. For any material in Arena, stencil mask with the hardcoded rendered sphere mask.
   1. Extend BasePass with custom subpass
   1. Might need to Create DrawingPolicy for Arena (avoid at this stage if you can easily hardcode around it)
   1. Might need to extend PrimitiveViewRelevance for arena (avoid at this stage if you can easily hardcode around it)

1. Frustum Culling
   1. Extend FrustumCull&lt;>() to sphere cull arena primitive components from current arena zone

1. Finishing pass. Goal: Make feature production ready
   1. Work through possible bugs with particles, translucent materials, objects coming in & out of the edge
   1. Test with three different arenas
   1. Test with panning and zooming
   1. Test with half-dome special portal (should be in Alex's dev folder)
   1. Test with laser special that has full-dome portal

# Documentation

<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>
<https://docs.unrealengine.com/latest/INT/Programming/Rendering/ThreadedRendering/index.html>
<https://medium.com/@lordned/unreal-engine-4-rendering-overview-part-1-c47f2da65346>

# Helpful areas for reference

## SceneVisibility.cpp

- FSceneRenderer::PreVisibilityFrameSetup()

- OcclusionCull()

- FSceneRenderer::ComputeViewVisibility()

## Custom Depth/Custom Stencil feature

- bool FCustomDepthPrimSet::DrawPrims(FRHICommandListImmediate& RHICmdList, const FViewInfo& View, FDrawingPolicyRenderState& DrawRenderState, bool bWriteCustomStencilValues)

## Understanding PrimitiveComponents

- CableComponent

- CustomMeshComponent

- GetDynamicMeshElements()/DrawStaticMeshElements()

## ESceneDepthPriorityGroup

- False hope - just used for Editor compositing

## EBasePassDrawListType

- seems we might be able to sort arena & stadium primitives by extending this enum

## FPrimitiveSceneInfo::AddToScene()

- Sets lots of OcclusionFlags (CanBeOccluded, HasPrecomputedVisibility, etc)

- Might be a good place to add ArenaOcclusion flag

- Also look at FPrimitiveSceneInfo::AddStaticMeshes()

- Decals

- UE4 Git repo commits related to BB Custom Materials

  - BBArenaSurface

  - BBFakeSSShadingMode

- <https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>

- void FDeferredShadingSceneRenderer::Render(FRHICommandListImmediate& RHICmdList)

# Stadium Scaling Future Work

- For Stadium primitives: See if we can move them to the static rendering path even though they're dynamic so that we can cache scene traversal as close to RHI level
  - If possible, maybe we can add another rendering path instead of static vs. dynamic
- Fixing indirect lighting cache (rotate SH lights for stadium objects)
