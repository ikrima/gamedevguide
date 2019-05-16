**Efficient implementation of custom grading/adding custom post process pass**

- Look at deferred decals/deferred decal mesh (PostProcessDeferredDecals.cpp & PostProcessMeshDecals.cpp)

  - Look at RenderMeshDecals()

  - Look at FDecalRendering::BuildVisibleDecalList

* Also look at possibly following UDecalComponent()

  - Derive from USceneComponent instead of UPrimitiveComponent and manually add the color grade sphere to a list on FScene in CrateRenderState_Concurrent()

- FDeferredShadingSceneRenderer::Render()

  - GCompositionLighting.ProcessAfterBasePass(RHICmdList, Views\[ViewIndex\])

  - FCompositionLighting::ProcessAfterBasePass()

    - Sets up composition graph for deferred decals and ambient occlusion

    - Deferred decals are done with normal rendering

    - Ambient occlusion can be done with Compute shader. Look at AddPostProcessingAmbientOcclusion() for compute shader version of a postprocess pass

    - Actual rendering/processing happens in FRCPassPostProcessDeferredDecals::Process() or FRCPassPostProcessAmbientOcclusion::Process()
