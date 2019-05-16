#### **Approach:**

1. Render a sphere into stencil channel. Goal: In 2-4 hrs, extend UE4 to write to stencil buffer. Non-goal: any generality support, edge cases with drawing arena vs stadium order, etc.

   a. Set render states to stencil buffer

   b. Render Sphere (hardcoded) into stencil channel

   c. Ensure it doesn't mess with the remaining pipeline

   i. Test in a simple test level

   ii. Test in U-Master-GoldFingers


    d. Validate in RenderDoc

    e. Hardcode some test geo to stencil clip against the mask you created. Validate that it works

    ​	i. Try with Opaque

    ​	ii. Try with Translucent for shits & giggles

2. Integrate stenciling for all materials on Material Domain BBArena. Goal: Only support happy path (opaque objects + ground floor within arena sphere. Non-goal: fixing any problems with objects in the arena edge, translucency, particles if they don't work

   a. For any material in Arena, stencil mask with the hardcoded rendered sphere mask.

   b. Extend BasePass with custom subpass

   c. Might need to Create DrawingPolicy for Arena (avoid at this stage if you can easily hardcode around it)

   d. Might need to extend PrimitiveViewRelevance for arena (avoid at this stage if you can easily hardcode around it)

3) Frustum Culling:

   a. Extend FrustumCull&lt;>() to sphere cull arena primitive components from current arena zone

4. Finishing pass. Goal: Make feature production ready

   a. Work through possible bugs with particles, translucent materials, objects coming in & out of the edge

   b. Test with three different arenas

   c. Test with panning and zooming

   d. Test with half-dome special portal (should be in Alex's dev folder)

   e. Test with laser special that has full-dome portal

**Documentation:**

[*https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html*]

<https://docs.unrealengine.com/latest/INT/Programming/Rendering/ThreadedRendering/index.html>

<https://medium.com/@lordned/unreal-engine-4-rendering-overview-part-1-c47f2da65346>

**Helpful areas for reference:**

- SceneVisibility.cpp

  - FSceneRenderer::PreVisibilityFrameSetup()

  - OcclusionCull()

  - FSceneRenderer::ComputeViewVisibility()

- **Custom Depth/Custom Stencil feature:**

  - bool FCustomDepthPrimSet::DrawPrims(FRHICommandListImmediate& RHICmdList, const FViewInfo& View, FDrawingPolicyRenderState& DrawRenderState, bool bWriteCustomStencilValues)

- Understanding PrimitivecOmponents:

  - CableComponent

  - CustomMeshComponent

  - GetDynamicMeshElements()/DrawStaticMeshElements()

- **ESceneDepthPriorityGroup**

  - False hope - just used for Editor compositing

- **EBasePassDrawListType**

  - seems we might be able to sort arena & stadium primitives by extending this enum

- **FPrimitiveSceneInfo::AddToScene()**

  - Sets lots of OcclusionFlags (CanBeOccluded, HasPrecomputedVisibility, etc)

  - Might be a good place to add ArenaOcclusion flag

  - Also look at FPrimitiveSceneInfo::AddStaticMeshes()

- Decals

- UE4 Git repo commits related to BB Custom Materials

  - BBArenaSurface

  - BBFakeSSShadingMode

- <https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>

- void FDeferredShadingSceneRenderer::Render(FRHICommandListImmediate& RHICmdList)

**Stadium Scaling Future Work:**

1. For Stadium primitives: See if we can move them to the static rendering path even though they're dynamic so that we can cache scene traversal as close to RHI level

   ​ a. If possible, maybe we can add another rendering path instead of static vs. dynamic

1. Fixing indirect lighting cache (rotate SH lights for stadium objects)

[*https://docs.unrealengine.com/latest/int/programming/rendering/overview/index.html*]: https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html
