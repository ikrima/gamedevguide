 <https://udn.unrealengine.com/questions/270970/stencil-testing-opaque-pass.html>

<https://udn.unrealengine.com/questions/189594/on-using-intermediate-render-targets.html>

<https://udn.unrealengine.com/questions/266792/using-customdepth-in-material.html>

 

The gist is to search for "CustomDepth" and do almost the exact same thing, except bind the main scene depth buffer and your custom color buffer, instead of a custom depth buffer. We use this as a mask to blend a scene capture with the main scene view in a postprocess material, but it should work just as well to sample it in base pass materials.

 

*From &lt;<https://udn.unrealengine.com/questions/270970/stencil-testing-opaque-pass.html>&gt;*

-   Add a new pass to the deferred shading renderer for setting up this texture. Search for bRenderCustomDepth and CustomDepthSet to use the custom depth rendering pass as an example. You won't need any new drawing policies. While rendering to this target you can bind the scene depth buffer so you can depth test against the main scene.



*From &lt;<https://udn.unrealengine.com/questions/189594/on-using-intermediate-render-targets.html>&gt;*



**Useful classes:**

​	EMaterialDomain

​	bUseWithSkeletalMesh

​	LOOKING\_FOR\_PERF\_ISSUES

​	RHITransitionResources

 

**Forward Shading Forces EarlyZPassMovable & DDM\_AllOccluders**

​	// DBuffer decals force a full prepass  
​	EarlyZPassMode = DDM\_AllOccluders;  
​	bEarlyZPassMovable = true;

 

 

Look at Landscape material for getting custom attributes in a material (LandscapelayerBlend,LandscapeLayerCoords)

 

**Useful functions:**

static void SetDecalDepthState(FDecalDepthState DecalDepthState, FRHICommandListImmediate& RHICmdList, FDrawingPolicyRenderState& DrawRenderState)

SetDepthStencilStateForBasePass()

TStaticDepthStencilState&lt;...&gt;::GetStaticState() for the class defining all the stencil op state

TStaticDepthStencilState&lt;&gt;::GetRHI() for getting the default stencil (iirc, stencil expects to be set back to the default but not sure)

RHICommandSetStencilRef() for setting stencil

FRCPassPostProcessDeferredDecals::Process() - full breakdown of a complete custom pass (setting different states, rendering scoped meshes, etc)

 

FDrawingPolicyRenderState

TStaticDepthStencilState

ApplyDitheredLODTransitionState

SetDepthStencilStateForBasePass

 

MeshDecalPrimSet  
CustomDepthSet

FMaterialRelevance MaterialRelevance;

 FScene::AddDecal(UDecalComponent\* Component)

 

FMaterialAttributeDefinitionMap::InitializeAttributeMap()

EMaterialProperty

FMaterialAttributeDefinitionMap::AddCustomAttribute

 

 

RHICmdList.SetDepthStencilState(TStaticDepthStencilState&lt; false, CF\_Always &gt;::GetRHI());

 

SetUniformBufferParameter

SetShaderValue

SetSRVParameter

FParticleSpriteVertexFactoryShaderParameters::SetMesh

FLocalVertexFactory::ConstructShaderParameters

FMeshVertexFactory

FStaticMeshLODResources::InitResources

FStaticMeshLODResources::InitVertexFactory

 

 

### **Extending Custom Occlusion Culling:**

ICustomVisibilityQuery

ICustomCulling

GCustomCullingImpl

  

 

FCableVertexFactory

<https://wiki.unrealengine.com/Procedural_Mesh_Generation>

 



<table><thead><tr class="header"><th>FScene</th><th>is the renderer equivalent of UWorld(). Objects only exist to renderer when they call their Component::OnRegister()</th></tr></thead><tbody><tr class="odd"><td>FPrimitiveSceneProxy</td><td>Renderer version of UPrimitiveComponent</td></tr><tr class="even"><td>FPrimitiveSceneInfo</td><td>Internal renderer state for single UPrimitiveComponent/FPrimitiveSceneProxy</td></tr><tr class="odd"><td>FPrimitiveViewRelevance</td><td>Stores info on what effects/passes are relevant to the primtive.</td></tr><tr class="even"><td>FSceneView</td><td>Renderer View into an FScene. One scene can be rendered with different views (splitscreen, stereo rendering, editor windows)</td></tr><tr class="odd"><td>FViewInfo</td><td>Internal renderer representation of a view</td></tr><tr class="even"><td>FSceneViewState</td><td>private renderer info about view that's needed across frames. Renderer analog of ULocalPlayer</td></tr><tr class="odd"><td>FSceneRenderer</td><td>Class that manages rendering</td></tr></tbody></table>

 

<table><thead><tr class="header"><th>FMaterial</th><th>Abstract Interface to a material used for rendering. Provides access to material properties, shader map</th></tr></thead><tbody><tr class="odd"><td>FMaterialResource</td><td>Concrete implementation of UMaterial, the asset</td></tr><tr class="even"><td>FMaterialRenderProxy</td><td>Material representation on the rendering thread (equiv to FPrimitiveSceneProxy)</td></tr><tr class="odd"><td>UMaterialInterface</td><td>Game thread interface for material func. Corresponds to FMaterialRenderProxy</td></tr><tr class="even"><td>UMaterial</td><td>Material asset</td></tr><tr class="odd"><td>UMaterialInstance</td><td>Concerete Instance of a UMaterial with concrete parameters for the UMaterial</td></tr></tbody></table>

 

Drawing polciies:

Logic to render meshes with pass specific shaders.  
Takes set of mesh material shaders + vertex factory =&gt; binds vertex factory's buffers to RHI =&gt; binds mesh material shaders to RHI =&gt; sets shader parameters =&gt; issues RHI drawcall

-   FVertexFactory to itnerface to abstract mesh type

-   FMaterial interface to abstrat material details

 

 

FlushRenderingCommands is standard method of blocking the game thread until rendering thread has caught up. Mainly useful for offline/editor operations

 

FRenderResource: base rendering resource interface (e.g. FVertexBuffer, FIndexBuffer, etc)

-   Use helper function BeginInitResource() which calls FRenderResource::InitResource() on the render thread

 

FRenderCommandFence: Used to sync operations from GT & RT

-   UPrimitiveComponent::DetachFence used on deleting

 

\[Great example is USkinnedMeshComponent/USkeletalMesh\]

Static Render Resources:

-   Initialized using BeginInitResource, usually after PostLoad.

-   Component registration happens after which adds primitive/primitivesceneproxy to FScene to start rendering

-   GC calls BeginDestroy() to call BeginReleaseResource(IndexBufferRenderRsrc) & DetachFence.BeginFence()

-   UPrimitiveComponent::IsReadyForFinishDestroy() - returns if true if DetachFence.IsFenceComplete()

-   GC calls FinishDestroy() to actually delete. Usually destructor's handle this

 

Dynamic Render Resources:

-   CreateRenderState\_Concurrent to allocate dynamic render thread object (e.g. FSkeletalMeshObject)

    -   Should derive from FDeferredCleanupInterface

-   SendRenderDynamicData\_Concurrent() allocates/computes data on GT and sends them to render thread through ENQUEUE\_UNIQUE\_RENDER\_COMMAND

    -   Usually the dynamicData pointer is copied to the dynamic render thread object (e.g. FSkeletalMeshObject.DynamicData) bc the object now owns it and is responsible for freeing it

-   DestroyRenderState\_Concurrent() is where GT marks dynamic render resources for deletion. Calls

    -   Render Thread Object (e.g. FSkeletalMeshObject) calls BeginReleaseResource() on all FRenderResources it owns

    -   Calls BeginCleanup() on Render Thread Objects (e.g. FSkeletalMeshObject)

        -   Make sure to delete any remaining allocated dynamic data struct that was used to pass stuff between GT to RT in SendRenderDynamicData\_Concurrent() (e.g. delete (FDynamicSkelMeshObjectDataCPUSkin\*)DynamicData;)

    -   Nullptr out the Render Thread Object. Ex: MeshObject = nullptr

 

 

 

**Approaches to Create separate stencil buffer**

New Pass: Render ArenaMask Sphere into stencil buffer

Create new material domain ? Shading model

Extend view relevance with new arena bit?

 

Separate render pass, after all opaque?

 

Extend FrustumCull&lt;&gt;() to cull objects based on View cone direction

  

Early-Z/Stencil/Hi-Z/Hi-Stencil/Z-Cull Rules:
=============================================

TLDR:

-   If you force the hardware to go to late-z, it wont' reset until the next zbuffer clear/pipeline flush/next frame

<table><thead><tr class="header"><th> </th><th><strong>Early-Z</strong></th><th><strong>Hi-Z</strong></th></tr></thead><tbody><tr class="odd"><td>Shader depth output</td><td>Disabled</td><td>Disabled</td></tr><tr class="even"><td>Alpha test, alpha to coverage or texkill with depth or stencil writes on</td><td>Disabled</td><td>Enabled</td></tr><tr class="odd"><td>Alpha test, alpha to coverage or texkill with depth and stencil writes off</td><td>Enabled</td><td>Enabled</td></tr><tr class="even"><td>Stencil op fail or zfail is not KEEP</td><td>Enabled</td><td>Disabled</td></tr><tr class="odd"><td>Stencil op fail and zfail is KEEP, pass is any op</td><td>Enabled</td><td>Enabled</td></tr><tr class="even"><td>Depth test comparison is EQUAL</td><td>Enabled</td><td>Enabled</td></tr><tr class="odd"><td>Depth test comparison is NOTEQUAL</td><td>Enabled</td><td>Disabled</td></tr><tr class="even"><td>Reversed depth comparison direction</td><td>Enabled</td><td>Disabled</td></tr><tr class="odd"><td>Reversed stencil comparison direction</td><td>Enabled</td><td>Enabled</td></tr></tbody></table>

-   Don't switch depth comparison direction

-   Discard + depth writes OFF =&gt; still keeps EarlyZ on

-   \[earlydepthstencil\] + discard + depth writes =&gt; color will be discarded but depth will get writtten (bc it already got written to in the earlyz test phase before the pixel shader)

 

Resources:

-   <http://files.cnblogs.com/files/OpenGPU/Depth_in-depth.pdf>

-   <https://github.com/buildaworldnet/IrrlichtBAW/wiki/Early-Fragment-Tests,-Hi-Z,-Depth,-Stencil-and-other-benchmarks>

-   <https://fgiesen.wordpress.com/2011/07/08/a-trip-through-the-graphics-pipeline-2011-part-7/>

Force earlydepthstencil (if we're not doing an earlyZ pass)

-   Make sure z/stencil-fail op == KEEP. Otherwise early/hiZ might get disabled

-   Alpha test/texkill/alpha to coverage will disable EarlyZ but sometimes ok with HiZ

![CustomStencilNotes_DepthTest](C:\devguide\conversion\FINISHED\assets\CustomStencilNotes_DepthTest.png)



 

Early/HiZ AMD circa 2007:

Early Z Hierarchical Z Shader depth output Disabled Disabled Alpha test, alpha to coverage or texkill with depth or stencil writes on Disabled Enabled Alpha test, alpha to coverage or texkill with depth and stencil writes off Enabled Enabled Stencil op fail or zfail is not KEEP Enabled Disabled Stencil op fail and zfail is KEEP, pass is any op Enabled Enabled Depth test comparison is EQUAL Enabled X8xx: Disabled X1xxx: Enabled Depth test comparison is NOTEQUAL Enabled Disabled Reversed depth comparison direction Enabled Disabled Reversed stencil comparison direction Enabled Enabled

  

/\*  
\* Stencil layout during basepass / deferred decals:  
\*                BIT ID    | USE  
\*                \[0\]       | sandbox bit (bit to be use by any rendering passes, but must be properly reset to 0 after using)  
\*                \[1\]       | unallocated  
\*                \[2\]       | unallocated  
\*                \[3\]       | Temporal AA mask for translucent object.  
\*                \[4\]       | Lighting channels  
\*                \[5\]       | Lighting channels  
\*                \[6\]       | Lighting channels  
\*                \[7\]       | primitive receive decal bit  
\*  
\* After deferred decals, stencil is cleared to 0 and no longer packed in this way, to ensure use of fast hardware clears and HiStencil.  
\*/

 

<table><thead><tr class="header"><th>TBasePassPSFNoLightMapPolicy</th><th>Base pass shader without light map</th></tr></thead><tbody><tr class="odd"><td>TBasePassPSTDistanceFieldShadowsAndLightMapPolicyHQ</td><td>Base pass shader with static lighting</td></tr><tr class="even"><td>TBasePassPSFNoLightMapPolicy</td><td>Base pass shader with only dynamic lighting</td></tr><tr class="odd"><td>TBasePassPSFSelfShadowedTranslucencyPolicy</td><td>Base pass shader for self shadowed translucency</td></tr><tr class="even"><td>TBasePassVSFNoLightMapPolicy</td><td>Vertex shader</td></tr></tbody></table>

 

 

FSceneRenderTargets() is central class to manage binding render targets for variouis passes (e.g. BeginRenderingSceneColor, BeginRenderingGBuffer)

 

D3D11 Stencil pipeline:

![CustomStencilNotes_StencilPipeline](C:\devguide\conversion\FINISHED\assets\CustomStencilNotes_StencilPipeline.png)
