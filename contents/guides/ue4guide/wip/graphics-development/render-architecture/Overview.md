**This is a good bite-sized detailed overview:**

<https://www.blaenkdenum.com/notes/unreal-engine/#rendering>

**Global Shaders **- Shaders that are not created using the material editor, typically compute shaders, post-processing shaders, etc. This is one of the meta types (i.e., Global, Material, Mesh); the remaining meta types will be covered in the future.

**FShaderType** - A ‘template’ or ‘class’ specified by shader code, which maps to a physical C++ class specified in the code.

**FShaderResource** - The compiled shader microcode and its runtime RHI resource.

**FShader** - A compiled shader instance of an FShaderType, built from the information of an FShaderResource.

**TShaderMap** - A collection of shaders of different FShaderTypes, but with the same meta type (Global).

_From &lt;<https://www.unrealengine.com/en-US/blog/how-to-add-global-shaders-to-ue4>&gt;_

**Primary scene classes**

There is a [Rendering Thread] in UE4 which operates in parallel with the game thread. Most classes that bridge the gap between the game thread and rendering thread are split into two parts based on which thread has ownership of that state.

The primary classes are:

<table><thead><tr class="header"><th><strong>Class</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td><strong>UWorld</strong></td><td>A world contains a collection of Actors and Components that can interact with each other. Levels can be streamed in and out of the world, and multiple worlds can be active in the program.</td></tr><tr class="even"><td><strong>ULevel</strong></td><td>Collection of Actors and Components that are loaded / unloaded together and saved in a single map file.</td></tr><tr class="odd"><td><strong>USceneComponent</strong></td><td>Base class of any object that needs to be added to an FScene, like lights, meshes, fog, etc.</td></tr><tr class="even"><td><strong>UPrimitiveComponent</strong></td><td>Base class of anything that can be rendered or interact with physics. Also acts as the granularity of visibility culling and rendering property specification (casts shadows, etc). Just like all UObjects, the game thread owns all variables and state and the rendering thread should not access it directly.</td></tr><tr class="odd"><td><strong>ULightComponent</strong></td><td>Represents a light source. The Renderer is responsible for computing and adding its contribution to the scene.</td></tr><tr class="even"><td><strong>FScene</strong></td><td>Renderer version of the UWorld. Objects only exist to the renderer once they are added to the FScene, which is called registering a component. The rendering thread owns all states in the FScene -the game thread cannot modify it directly.</td></tr><tr class="odd"><td><strong>FPrimitiveSceneProxy</strong></td><td>Renderer version of UPrimitiveComponent, mirrors UPrimitiveComponent state for the rendering thread. Exists in the engine module and intended to be subclassed to support different types of primitives (skeletal, rigid, BSP, etc). Implements some very important functions like GetViewRelevance, DrawDynamicElements, etc.</td></tr><tr class="even"><td><strong>FPrimitiveSceneInfo</strong></td><td>Internal renderer state (specific to the FRendererModule implementation) that corresponds to a UPrimitiveComponent and FPrimitiveSceneProxy. Exists in the renderer module, so the engine cannot see it.</td></tr><tr class="odd"><td><strong>FSceneView</strong></td><td>Engine representation of a single view into an FScene. A scene can be rendered with different views in different calls to FSceneRenderer::Render (multiple editor viewports) or with multiple views in the same call to FSceneRenderer::Render (splitscreen in game). A new View is constructed for each frame.</td></tr><tr class="even"><td><strong>FViewInfo</strong></td><td>Internal renderer representation of a view, exists in the renderer module.</td></tr><tr class="odd"><td><strong>FSceneViewState</strong></td><td>The ViewState stores private renderer information about a view which is needed across frames. In game, there is one view state per ULocalPlayer.</td></tr><tr class="even"><td><strong>FSceneRenderer</strong></td><td>A class created each frame to encapsulate inter-frame temporaries.</td></tr></tbody></table>

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

<table><thead><tr class="header"><th><strong>Engine Module</strong></th><th><strong>Renderer Module</strong></th></tr></thead><tbody><tr class="odd"><td>UWorld</td><td>FScene</td></tr><tr class="even"><td>UPrimitiveComponent / FPrimitiveSceneProxy</td><td>FPrimitiveSceneInfo</td></tr><tr class="odd"><td>FSceneView</td><td>FViewInfo</td></tr><tr class="even"><td>ULocalPlayer</td><td>FSceneViewState</td></tr><tr class="odd"><td>ULightComponent / FLightSceneProxy</td><td>FLightSceneInfo</td></tr></tbody></table>

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

**Material classes**

<table><thead><tr class="header"><th><strong>Class</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td><strong>FMaterial</strong></td><td>An interface to a material used for rendering. Provides access to material properties (e.g. blend mode). Contains a shader map used by the renderer to retrieve individual shaders.</td></tr><tr class="even"><td><strong>FMaterialResource</strong></td><td>UMaterial's implementation of the FMaterial interface.</td></tr><tr class="odd"><td><strong>FMaterialRenderProxy</strong></td><td>A material's representation on the rendering thread. Provides access to an FMaterial interface and the current value of each scalar, vector, and texture parameter.</td></tr><tr class="even"><td><strong>UMaterialInterface</strong></td><td>[abstract] Game thread interface for material functionality. Used to retrieve the FMaterialRenderProxy used for rendering and the UMaterial that is used as the source.</td></tr><tr class="odd"><td><strong>UMaterial</strong></td><td>A material asset. Authored as a node graph. Computes material attributes used for shading, sets blend mode, etc.</td></tr><tr class="even"><td><strong>UMaterialInstance</strong></td><td>[abstract] An instance of a UMaterial. Uses the node graph in the UMaterial but provides different parameters (scalars, vectors, textures, static switches). Each instance has a parent UMaterialInterface. Therefore a material instance's parent may be a UMaterial or another UMaterialInstance. This creates a chain that will eventually lead to a UMaterial.</td></tr><tr class="odd"><td><strong>UMaterialInstanceConstant</strong></td><td>A UMaterialInstance that may only be modified in the editor. May provide scalar, vector, texture, and static switch parameters.</td></tr><tr class="even"><td><strong>UMaterialInstanceDynamic</strong></td><td>A UMaterialInstance that may be modified at runtime. May provide scalar, vector, and texture parameters. It cannot provide static switch parameters and it cannot be the parent of another UMaterialInstance.</td></tr></tbody></table>

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

**Primitive components and proxies**

Primitive components are the basic unit of visibility and relevance determination. For example, occlusion and frustum culling happen on a per-primitive basis. Therefore it is important when designing a system to think about how big to make components. Each component has a bounds that is used for various operations like culling, shadow casting, and light influence determination.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

**FPrimitiveSceneProxy and FPrimitiveSceneInfo**

FPrimitiveSceneProxy is the rendering thread version of UPrimitiveComponent that is intended to be subclassed depending on the component type. It lives in the Engine module and has functions called during rendering passes. FPrimitiveSceneInfo is the primitive component state that is private to the renderer module.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

**Important FPrimitiveSceneProxy methods**

<table><thead><tr class="header"><th><strong>Function</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td>GetViewRelevance</td><td>Called from InitViews at the beginning of the frame, and returns a populated FPrimitiveViewRelevance.</td></tr><tr class="even"><td>DrawDynamicElements</td><td>Called to draw the proxy in any passes which the proxy is relevant to. Only called if the proxy indicated it has dynamic relevance.</td></tr><tr class="odd"><td>DrawStaticElements</td><td>Called to submit StaticMesh elements for the proxy when the primitive is being attached on the game thread. Only called if the proxy indicated it has static relevance.</td></tr></tbody></table>

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

**Relevance**

- FPrimitiveViewRelevance is the information on what effects (and therefore passes) are relevant to the primitive. A primitive may have multiple elements with different relevance, so FPrimitiveViewRelevance is effectively a logical OR of all the element's relevancies.

- This means that a primitive can have both opaque and translucent relevance, or dynamic and static relevance; they are not mutually exclusive.

- FPrimitiveViewRelevance also indicates whether a primitive needs to use the dynamic and/or static rendering path with bStaticRelevance and bDynamicRelevance.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

**Drawing Policies**

- Drawing policies contain the logic to render meshes with pass specific shaders.

- They use the FVertexFactory interface to abstract the mesh type, and the FMaterial interface to abstract the material details.

- At the lowest level, a drawing policy

  1.  Takes a set of mesh material shaders and a vertex factory

  2.  Binds the vertex factory's buffers to the Rendering Hardware Interface (RHI)

  3.  Binds the mesh material shaders to the RHI

  4.  Sets the appropriate shader parameters

  5.  Issues the RHI draw call.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

**Drawing Policy methods**

<table><thead><tr class="header"><th><strong>Function</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td>Constructor</td><td>Finds the appropriate shader from the given vertex factory and material shader map, stores these references.</td></tr><tr class="even"><td>CreateBoundShaderState</td><td>Creates an RHI bound shader state for the drawing policy.</td></tr><tr class="odd"><td>Matches/Compare</td><td>Provides methods to sort the drawing policy with others in the static draw lists. Matches must compare on all the factors that DrawShared depends on.</td></tr><tr class="even"><td>DrawShared</td><td>Sets RHI state that is constant between drawing policies that return true from Matches. For example, most drawing policies sort on material and vertex factory, so shader parameters depending only on the material can be set, and the vertex buffers specific to the vertex factory can be bound. State should always be set here if possible instead of SetMeshRenderState, since DrawShared is called less times in the static rendering path.</td></tr><tr class="odd"><td>SetMeshRenderState</td><td>Sets RHI state that is specific to this mesh, or anything not set in DrawShared. This is called many more times than DrawShared so performance is especially critical here.</td></tr><tr class="even"><td>DrawMesh</td><td>Actually issues the RHI draw call.</td></tr></tbody></table>

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

**Rendering paths**

UE4 has a dynamic path which provides more control but is slower to traverse, and a static rendering path which caches scene traversal as close to the RHI level as possible. The difference is mostly high level, since they both use drawing policies at the lowest level. Each rendering pass (drawing policy) needs to be sure to handle both rendering paths if needed.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

**Dynamic rendering path**

The dynamic rendering path uses TDynamicPrimitiveDrawer and calls DrawDynamicElements on each primitive scene proxy to render. The set of primitives that need to use the dynamic path to be rendered is tracked by FViewInfo::VisibleDynamicPrimitives. Each rendering pass needs to iterate over this array, and call DrawDynamicElements on each primitive's proxy. DrawDynamicElements of the proxy then needs to assemble as many FMeshElements as it needs and submit them with DrawRichMesh or TDynamicPrimitiveDrawer::DrawMesh. This ends up creating a new temporary drawing policy, calling CreateBoundShaderState, DrawShared, SetMeshRenderState, and finally DrawMesh.

The dynamic rendering path provides a lot of flexibility because each proxy has a callback in DrawDynamicElements where it can execute logic specific to that component type. It also has minimal insertion cost but high traversal cost, because there is no state sorting, and nothing is cached.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

**Static rendering path**

The static rendering path is implemented through static draw lists. Meshes are inserted into the draw lists when they are attached to the scene. During this insertion, DrawStaticElements on the proxy is called to collect the FStaticMeshElements. A drawing policy instance is then created and stored, along with the result of CreateBoundShaderState. The new drawing policy is sorted based on its Compare and Matches functions and inserted into the appropriate place in the draw list (see TStaticMeshDrawList::AddMesh). In InitViews, a bitarray containing visibility data for the static draw list is initialized and passed into TStaticMeshDrawList::DrawVisible where the draw list is actually drawn. DrawShared is only called once for all the drawing policies that match each other, while SetMeshRenderState and DrawMesh are called for each FStaticMeshElement (see TStaticMeshDrawList::DrawElement).

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

The static rendering path moves a lot of work to attach time, which significantly speeds up scene traversal at rendering time. Static draw list rendering is about 3x faster on the rendering thread for Static Meshes, which allows a lot more Static Meshes in the scene. Because static draw lists cache data at attach time, they can only cache view independent state. Primitives that are rarely reattached but often rendered are good candidates for the static draw lists.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

The static rendering path can expose bugs because of the way it only calls DrawShared once per state bucket. These bugs can be difficult to detect, since they depend on the rendering order and the attach order of meshes in the scene. Special view modes such as lighting only, unlit, etc will force all primitives to use the dynamic path, so if a bug goes away when forcing the dynamic rendering path, there is a good chance it is due to an incorrect implementation of a drawing policy's DrawShared and/or the Matches function.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

### **High level Rendering order**

Here is a description of the control flow when rendering a frame starting from FDeferredShadingSceneRenderer::Render:

<table><thead><tr class="header"><th><strong>Operation</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td>GSceneRenderTargets.Allocate</td><td>Reallocates the global scene render targets to be large enough for the current view, if needed.</td></tr><tr class="even"><td>InitViews</td><td>Initializes primitive visibility for the views through various culling methods, sets up dynamic shadows that are visible this frame, intersects shadow frustums with the world if necessary (for whole scene shadows or preshadows).</td></tr><tr class="odd"><td>PrePass / Depth only pass</td><td>RenderPrePass / FDepthDrawingPolicy. Renders occluders, outputting only depth to the depth buffer. This pass can operate in several modes: disabled, occlusion only, or complete depths, depending on what is needed by active features. The usual purpose of this pass is to initialize Hierarchical Z to reduce the shading cost of the Base pass, which has expensive pixel shaders.</td></tr><tr class="even"><td>Base pass</td><td>RenderBasePass / TBasePassDrawingPolicy. Renders opaque and masked materials, outputting material attributes to the GBuffer. Lightmap contribution and sky lighting is also computed here and put in scene color.</td></tr><tr class="odd"><td>Issue Occlusion Queries / BeginOcclusionTests</td><td>Kicks off latent occlusion queries that will be used in the next frame's InitViews. These are done by rendering bounding boxes around the objects being queried, and sometimes grouping bounding boxes together to reduce draw calls.</td></tr><tr class="even"><td>Lighting</td><td>Shadowmaps are rendered for each light and light contribution is accumulated to scene color, using a mix of standard deferred and tiled deferred shading. Light is also accumulated in the translucency lighting volumes.</td></tr><tr class="odd"><td>Fog</td><td>Fog and atmosphere are computed per-pixel for opaque surfaces in a deferred pass.</td></tr><tr class="even"><td>Translucency</td><td>Translucency is accumulated into an offscreen render target where it has fogging applied per-vertex so it can integrate into the scene. Lit translucency computes final lighting in a single pass to blend correctly.</td></tr><tr class="odd"><td>Post Processing</td><td>Various post process effects are applied using the GBuffers. Translucency is composited into the scene.</td></tr></tbody></table>

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

### **Render Hardware Interface (RHI)**

The RHI is a thin layer above the platform specific graphics API. The RHI abstraction level in UE4 is as low level as possible, with the intention that most features can be written in platform independent code and 'just work' on all platforms that support the required feature level.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

**Rendering state defaults**

Since there are so many rendering states, it is not practical to set them all every time we want to draw something. Instead, UE4 has an implicit set of states which are assumed to be set to the defaults (and therefore must be restored to those defaults after they are changed), and a much smaller set of states which have to be set explicitly. The set of states that do not have implicit defaults are:

- RHISetRenderTargets

- RHISetBoundShaderState

- RHISetDepthState

- RHISetBlendState

- RHISetRasterizerState

- Any dependencies of the shaders set by RHISetBoundShaderState

All other states are assumed to be at their defaults (as defined by the relevant TStaticState, for example the default stencil state is set by RHISetStencilState(TStaticStencilState&lt;&gt;::GetRHI()).

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

#### **Rendering state grouping**

Render states are grouped based on what part of the pipeline they affect. For example, RHISetDepthState sets all state relevant to depth buffering.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/Overview/index.html>&gt;_

FMaterial serves 3 intertwined purposes:

Represents a material to the material compilation process, and provides hooks for extensibility (CompileProperty, etc)

Represents a material to the renderer, with functions to access material properties

Stores a cached shader map, and other transient output from a compile, which is necessary with async shader compiling

(when a material finishes async compilation, the shader map and compile errors need to be stored somewhere)

[rendering thread]: https://docs.unrealengine.com/latest/INT/Programming/Rendering/ThreadedRendering/index.html
