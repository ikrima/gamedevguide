**Drawing Policies**

Drawing policies contain the logic to render meshes with pass specific shaders. They use the FVertexFactory interface to abstract the mesh type, and the FMaterial interface to abstract the material details. At the lowest level, a drawing policy takes a set of mesh material shaders and a vertex factory, binds the vertex factory's buffers to the RHI, binds the mesh material shaders to the RHI, sets the appropriate shader parameters, and issues the RHI draw call.

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/index.html>>*

**rawing Policy methods**

<table><thead><tr class="header"><th><strong>Function</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td>Constructor</td><td>Finds the appropriate shader from the given vertex factory and material shader map, stores these references.</td></tr><tr class="even"><td>CreateBoundShaderState</td><td>Creates an RHI bound shader state for the drawing policy.</td></tr><tr class="odd"><td>Matches/Compare</td><td>Provides methods to sort the drawing policy with others in the static draw lists. Matches must compare on all the factors that DrawShared depends on.</td></tr><tr class="even"><td>DrawShared</td><td>Sets RHI state that is constant between drawing policies that return true from Matches. For example, most drawing policies sort on material and vertex factory, so shader parameters depending only on the material can be set, and the vertex buffers specific to the vertex factory can be bound. State should always be set here if possible instead of SetMeshRenderState, since DrawShared is called less times in the static rendering path.</td></tr><tr class="odd"><td>SetMeshRenderState</td><td>Sets RHI state that is specific to this mesh, or anything not set in DrawShared. This is called many more times than DrawShared so performance is especially critical here.</td></tr><tr class="even"><td>DrawMesh</td><td>Actually issues the RHI draw call.</td></tr></tbody></table>

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/index.html>>*

### **Rendering paths**

UE4 has a dynamic path which provides more control but is slower to traverse, and a static rendering path which caches scene traversal as close to the RHI level as possible. The difference is mostly high level, since they both use drawing policies at the lowest level. Each rendering pass (drawing policy) needs to be sure to handle both rendering paths if needed.

### ***Dynamic rendering path***

The dynamic rendering path uses TDynamicPrimitiveDrawer and calls DrawDynamicElements on each primitive scene proxy to render. The set of primitives that need to use the dynamic path to be rendered is tracked by FViewInfo::VisibleDynamicPrimitives. Each rendering pass needs to iterate over this array, and call DrawDynamicElements on each primitive's proxy. DrawDynamicElements of the proxy then needs to assemble as many FMeshElements as it needs and submit them with DrawRichMesh or TDynamicPrimitiveDrawer::DrawMesh. This ends up creating a new temporary drawing policy, calling CreateBoundShaderState, DrawShared, SetMeshRenderState, and finally DrawMesh.

The dynamic rendering path provides a lot of flexibility because each proxy has a callback in DrawDynamicElements where it can execute logic specific to that component type. It also has minimal insertion cost but high traversal cost, because there is no state sorting, and nothing is cached.

### ***Static rendering path***

The static rendering path is implemented through static draw lists. Meshes are inserted into the draw lists when they are attached to the scene. During this insertion, DrawStaticElements on the proxy is called to collect the FStaticMeshElements. A drawing policy instance is then created and stored, along with the result of CreateBoundShaderState. The new drawing policy is sorted based on its Compare and Matches functions and inserted into the appropriate place in the draw list (see TStaticMeshDrawList::AddMesh). In InitViews, a bitarray containing visibility data for the static draw list is initialized and passed into TStaticMeshDrawList::DrawVisible where the draw list is actually drawn. DrawShared is only called once for all the drawing policies that match each other, while SetMeshRenderState and DrawMesh are called for each FStaticMeshElement (see TStaticMeshDrawList::DrawElement).

The static rendering path moves a lot of work to attach time, which significantly speeds up scene traversal at rendering time. Static draw list rendering is about 3x faster on the rendering thread for Static Meshes, which allows a lot more Static Meshes in the scene. Because static draw lists cache data at attach time, they can only cache view independent state. Primitives that are rarely reattached but often rendered are good candidates for the static draw lists.

The static rendering path can expose bugs because of the way it only calls DrawShared once per state bucket. These bugs can be difficult to detect, since they depend on the rendering order and the attach order of meshes in the scene. Special viewmodes such as lighting only, unlit, etc will force all primitives to use the dynamic path, so if a bug goes away when forcing the dynamic rendering path, there is a good chance it is due to an incorrect implementation of a drawing policy's DrawShared and/or the Matches function.

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/index.html>>*

**Look at Fluid Surface Plugin that has a custom shader/draw path** <https://github.com/Ehamloptiran/UnrealEngine/releases>

**Global shaders**

Global shaders are shaders which operate on fixed geometry (like a full screen quad) and do not need to interface with materials. Examples would be shadow filtering, or post processing. Only one shader of any given global shader type exists in memory.

**Material and Mesh types**

Materials are defined by a set of states that control how the material is rendered (blend mode, two sided, etc) and a set of material inputs that control how the material interacts with the various rendering passes (BaseColor, Roughness, Normal, etc).

**Vertex Factories**

Materials have to support being applied to different mesh types, and this is accomplished with vertex factories. A **FVertexFactoryType**represents a unique mesh type, and a FVertexFactory instance stores the per-instance data to support that unique mesh type. For example, FGPUSkinVertexFactory stores the bone matrices needed for skinning, as well as references to the various vertex buffers that the GPU skin vertex factory shader code needs as input. The vertex factory shader code is an implicit interface which is used by the various pass shaders to abstract mesh type differences. Vertex factories consist of mainly vertex shader code, but some pixel shader code as well. Some important components of the vertex factory shader code are:

<table><thead><tr class="header"><th><strong>Function</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td>FVertexFactoryInput</td><td>Defines what the vertex factory needs as input to the vertex shader. These must match the vertex declaration in the C++ side FVertexFactory. For example, LocalVertexFactory's FVertexFactoryInput has float4 Position : POSITION;, which corresponds to the position stream declaration in FStaticMeshLODResources::SetupVertexFactory.</td></tr><tr class="even"><td>FVertexFactoryIntermediates</td><td>Used to store cached intermediate data that will be used in multiple vertex factory functions. A common example is the TangentToLocal matrix, which had to be computed from unpacked vertex inputs.</td></tr><tr class="odd"><td>FVertexFactoryInterpolantsVSToPS</td><td>Vertex factory data to be passed from the vertex shader to the pixel shader.</td></tr><tr class="even"><td>VertexFactoryGetWorldPosition</td><td>This is called from the vertex shader to get the world space vertex position. For Static Meshes this merely transforms the local space positions from the vertex buffer into world space using the LocalToWorld matrix. For GPU skinned meshes, the position is skinned first and then transformed to world space.</td></tr><tr class="odd"><td>VertexFactoryGetInterpolantsVSToPS</td><td>Transforms the FVertexFactoryInput to FVertexFactoryInterpolants, which will be interpolated by the graphics hardware before getting passed into the pixel shader.</td></tr><tr class="even"><td>GetMaterialPixelParameters</td><td>This is called in the pixel shader and converts vertex factory specific interpolants (FVertexFactoryInterpolants) to the FMaterialPixelParameters structure which is used by the pass pixel shaders.</td></tr></tbody></table>

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/ShaderDevelopment/index.html>>*

#### **Material Shaders**

Shaders using **FMaterialShaderType** are pass specific shaders which need access to some of the material's attributes, and therefore must be compiled for each material, but do not need to access any mesh attributes. The light function pass shaders are an example of FMaterialShaderTypes.

Shaders using **FMeshMaterialShaderType** are pass specific shaders which depend on the material's attributes AND the mesh type, and therefore must be compiled for each material/vertex factory combination. For example TBasePassVS / TBasePassPS need to evaluate all of the material inputs in a forward rendering pass.

A material's set of required shaders is contained in a FMaterialShaderMap. It looks like this:

FMaterialShaderMap  
FLightFunctionPixelShader - FMaterialShaderType  
FLocalVertexFactory - FVertexFactoryType  
TDepthOnlyPS - FMeshMaterialShaderType  
TDepthOnlyVS - FMeshMaterialShaderType  
TBasePassPS - FMeshMaterialShaderType  
TBasePassVS - FMeshMaterialShaderType  
Etc  
FGPUSkinVertexFactory - FVertexFactoryType  
Etc

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/ShaderDevelopment/index.html>>*

#### **Creating a material shader**

A material shader type is created with the DECLARE_SHADER_TYPE macro:

**class** FLightFunctionPixelShader : **public** FShader { DECLARE_SHADER_TYPE(FLightFunctionPixelShader,Material);

This declares the necessary metadata and functions for a material shader type. The material shader type is instantiated with IMPLEMENT_MATERIAL_SHADER_TYPE:

IMPLEMENT_MATERIAL_SHADER_TYPE(,FLightFunctionPixelShader,TEXT("LightFunctionPixelShader")

This generates the material shader type's global metadata, which allows us to do things like iterate through all shaders using a given shader type at runtime.

A typical material pixel shader type will first create a FMaterialPixelParameters struct by calling the GetMaterialPixelParameters vertex factoryfunction. GetMaterialPixelParameters transforms the vertex factory specific inputs into properties like WorldPosition, TangentNormal, etc that any pass might want to access. Then a material shader will call CalcMaterialParameters, which writes out the rest of the members of FMaterialPixelParameters, after which FMaterialPixelParameters is fully initialized. The material shader will then access some of the material's inputs through functions in MaterialTemplate.usf (GetMaterialEmissive for the material's emissive input for example), do some shading and output a final color for that pass.

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/ShaderDevelopment/index.html>>*

#### **Special Engine Materials**

UMaterial has a setting called bUsedAsSpecialEngineMaterial that allows the material to be used with any vertex factory type. This means all vertex factories are compiled with the material, which will be a very large set. bUsedAsSpecialEngineMaterial is useful for:

- Materials used with rendering viewmodes like lighting only.

- Materials used as fallbacks when there is a compilation error (DefaultDecalMaterial, DefaultMaterial, etc).

- Materials whose shaders are used when rendering other materials in order to cut down on the number of shaders that have to be cached. For example, an opaque material's depth-only shaders will produce the same depth output as the DefaultMaterial, so the DefaultMaterial's shaders are used instead and the opaque material skips caching the depth-only shader.

**Shader compilation**

UE4 compiles shaders asynchronously using a streaming system. Compile requests are enqueued when materials load that do not have a cached shader map, and compile results are applied as they become available, without blocking the engine. This is optimal in terms of load time and compile throughput, but it does mean that there are quite a few layers between the actual platform shader compile and the material that requested it.

The actual compiling work is done in helper processes called the Shader Compile Workers, because the platform shader compile functions (D3DCompile) often contain critical sections within them that prevent multi-core scaling within a single process.

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/ShaderDevelopment/index.html>>*

**Debugging shader compilers**

There are some settings to control how compilation is done which can simplify debugging of the shader compilers. These can be found in the*\[DevOptions.Shaders]* section of *BaseEngine.ini*.

<table><thead><tr class="header"><th><strong>Setting</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td>bAllowCompilingThroughWorkers</td><td>Whether to launch the SCW to call the compiler DLL's or whether UE4 should call the compiler DLL's directly. If disabled, compiling will be single-core.</td></tr><tr class="even"><td>bAllowAsynchronousShaderCompiling</td><td>Whether compiling should be done on another thread within UE4.</td></tr></tbody></table>

If you want to step into the shader compiler DLL's directly from UE4 (CompileD3D11Shader for example), you should set both of these to *false*. Compilation will take a long time though, so make sure all other shaders have been cached.

**Retrying on compile errors**

With r.ShaderDevelopmentMode enabled, you will get the opportunity to retry on shader compile error. This is especially important for global shaders since it is a fatal error if they do not compile sucessfully.

In debug, with the debugger attached, you will hit a breakpoint and get the compile error in the Visual Studio output window. **You can then double-click the error log to be taken directly to the offending line.**

![DrawingPolicies_Shaders](C:\devguide\conversion\FINISHED\assets\DrawingPolicies_Shaders.jpg)

Otherwise you will get a Yes/No dialog

![DrawingPolicies_ErrorMessage](C:\devguide\conversion\FINISHED\assets\DrawingPolicies_ErrorMessage.jpg)

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/ShaderDevelopment/index.html>>*

**Dumping debug info**

You can also use *r.DumpShaderDebugInfo=1* to get files saved out to disk for all the shaders that get compiled. It can be useful to set this inConsoleVariables.ini just like r.ShaderDevelopmentMode. Files are saved to *GameName/Saved/ShaderDebugInfo*, including

- Source files and includes

- A preprocessed version of the shader

- A batch file to compile the preprocessed version with equivalent commandline options to the compiler that were used

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/ShaderDevelopment/index.html>>*
