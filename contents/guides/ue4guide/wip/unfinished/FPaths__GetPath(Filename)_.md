FPaths::GetPath(Filename);

UFactory::CurrentFilename

FlushRenderingCommands();

FPlatformTime::Seconds();

FPlatformTime::Cycles();

SObjectTools::SanitizeObjectName

MarkPackageDirty();

QUICK_SCOPE_CYCLE_COUNTER

**FRHICommandList**

_From &lt;<https://docs.unrealengine.com/latest/INT/API/Runtime/RHI/FRHICommandList/index.html>&gt;_

FRenderCommandFence

GetNumPendingFences

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/ThreadedRendering/index.html>&gt;_

PrimaryActorTick.bCanEverTick = true;

PrimaryActorTick.bStartWithTickEnabled = false;

_From &lt;<https://www.unrealengine.com/blog/how-to-improve-game-thread-cpu-performance>&gt;_

class FLayoutUV  
-Handles generating lightmap Uvs

FMeshUtilities::CacheOptimizeVertexAndIndexBuffer  
-Optimizes the VertexBuffer/IndexBuffer by re-ordering Indices for post-transform cache and then re-orders the indices to be coherent along with the vertex array so its optimized for the pre-transform cache

void FRenderCommandFence::BeginFence()

FString MeshName = ObjectTools::SanitizeObjectName(InName.ToString());

**Error reporting in asset importer/factory:**

\[FFeedbackContext\*\]        Warn-&gt;BeginSlowTask( NSLOCTEXT("FbxFactory", "BeginImportingFbxMeshTask", "Importing FBX mesh"), true );

Warn-&gt;Log(ELogVerbosity::Error, FbxImporter-&gt;GetErrorMessage() );

**Create a uasset file:**

NewPackageName = FPackageName::GetLongPackagePath(Parent-&gt;GetOutermost()-&gt;GetName()) + TEXT("/") + MeshName;  
                NewPackageName = PackageTools::SanitizePackageName(NewPackageName);  
                Package = CreatePackage(NULL, \*NewPackageName);

StaticMesh = new(Package,FName(\*MeshName),Flags|RF_Public) UStaticMesh(FPostConstructInitializeProperties());

**Creating Mesh Material:**

void UnFbx::FFbxImporter::CreateUnrealMaterial(FbxSurfaceMaterial& FbxMaterial, TArray&lt;UMaterialInterface\*&gt;> OutMaterials, TArray&lt;FString&gt;> UVSets)

Mesh Data:

UStaticMesh - UE4 Uobject that's placed in the world

- Contains SourceModels\[LOD Index\] which holds FStaticMeshSourceModel objects at different LODS

  - FStaticMeshSourceModel - They are struct that contain the mesh data

    - FStaticMeshSourceModel::RawMeshBulkData - Editor only class\] that manages raw mesh data

      - Handles Serialization, Loading, Saving of a FRawMesh

      - FRawMeshBulkData::Load(rawMeshObject) takes data from FRawMeshBulkData editor class and deserializes it into a rawMesh

      - FRawMeshBulkData:Save(rawMeshObject) serializes rawMesh into its FRawMeshBulkData data structure

    - FrawMesh

      - Holds actual mesh data (vert colors, positions, tangents, per face material index)

      - Face - A single polygon in the mesh. Currently all code assumes this is a triangle but conceptually any polygon would do.

      - Corner - Each face has N corners. As all faces are currently triangles, N=3.

      - Wedge - Properties stored for each corner of each face. Index with FaceIndex \* NumCorners + CornerIndex.

      - Vertex - Properties shared by overlapping wedges of adjacent polygons. Typically these properties relate to position. Index with VertexIndices\[WedgeIndex\].

- FStaticMeshRenderData contains all of the actual render data to render a mesh

  - FStaticMeshRenderData::LODResources is an array of the different FStaticMeshLODResources that perform the actual rendering

    - FStaticMeshLODResources

struct FStaticMeshSourceModel

class FRawMeshBulkData

void FRawMeshBulkData::Serialize(FArchive& Ar, UObject\* Owner)

void FRawMeshBulkData::SaveRawMesh(FRawMesh& InMesh)

void FRawMeshBulkData::LoadRawMesh(FRawMesh& OutMesh)

SetupActorComponentTickFunction(&PostPhysicsComponentTick)  
PostPhysicsComponentTick.AddPrerequisite(this,PrimaryComponentTick);  
Can actually set tick functions that with prereqs into the job queue

# UE4 Macros:

ensure()

check()

UE_LOG()

Warn-&gt;BeginSlowTask()

# Misc:

ConstructObject&lt;&gt;() vs. FactoryCreateNew():

- ConstructObject = UE4 way of using new

- FactoryCreateNew() actually creates the object properly. If something has a Factory, you should probably use that to create new (e.g. UMaterialFactoryNew::FactoryCreateNew() to create a new Material

  - Underneath the covers, it uses ConstructObject and then initializes it properly

A component is a type of subobject, as you say. Here is how the names are generally used in the UE4 codebase:

A subobject is any UObject that has an Outer that is not a UPackage. UPackages are the top level of the hierarchy, and refer to a .uasset file on disk, or the transient package. For instance, AActors are subobjects in a ULevel, which is a subobject in a UWorld, which is a subobject in a UPackage. So they can be nested arbitrarily. Most assets like Meshes, textures, etc are not sub objects as they are nested directly inside a UPackage.

A component is anything that is a subclass of UActorComponent, and is a subobject of UActor. We don't have any components that are not ActorComponents.

_From &lt;<https://forums.unrealengine.com/showthread.php?275-Subobjects-vs-Components>&gt;_

# Archive Serialization:

- Bidrectional &lt;&lt; operator is overloaded. Has bi-directional meaning. Depending on the FArchive,&lt;&lt; may either write stuff into the FArchive (e.g. FMemoryWriter) or may read stuff from it (e.g. FBufferReader)

- This way serialization in/out of an archive can use the same code path

# Mesh Building Class:

- MeshUtilities.cpp contains all of the actual code to build mesh, compute normals, get rid of degenerates, create LOD groups, etc

- Called by UStaticMesh::Build() -&gt; FStaticMeshRenderData()::Cache()-&gt;FMeshUtilities::BuildStaticMesh()

TArray&lt;FMatrix&gt;> ReferenceToLocalMatrices = DynamicData-&gt;ReferenceToLocal;  
                        const int32 NumReferenceToLocal = ReferenceToLocalMatrices.Num();  
                        for( int32 BoneIdx=0; BoneIdx &lt; NumBones; BoneIdx++ )  
                        {  
                                FPlatformMisc::Prefetch( ChunkMatrices.GetTypedData() + BoneIdx + PreFetchStride );   
                                FPlatformMisc::Prefetch( ChunkMatrices.GetTypedData() + BoneIdx + PreFetchStride, CACHE_LINE_SIZE );   
                                FPlatformMisc::Prefetch( ReferenceToLocalMatrices.GetTypedData() + BoneIdx + PreFetchStride );  
                                FPlatformMisc::Prefetch( ReferenceToLocalMatrices.GetTypedData() + BoneIdx + PreFetchStride, CACHE_LINE_SIZE );

FBoneSkinning& BoneMat = ChunkMatrices\[BoneIdx\];  
                                const FBoneIndexType RefToLocalIdx = Chunk.BoneMap\[BoneIdx\];  
                                const FMatrix& RefToLocal = ReferenceToLocalMatrices\[RefToLocalIdx\];  
                                RefToLocal.To3x4MatrixTranspose( (float\*)BoneMat.M );  
                        }

AStaticMeshActor &gt; UStaticMeshComponent &gt; UStaticMesh & FStaticMeshSceneProxy

File Management:

<https://wiki.unrealengine.com/File_Management,_Create_Folders,_Delete_Files,_and_More>

Logging:

<https://wiki.unrealengine.com/Logs,_Printing_Messages_To_Yourself_During_Runtime>

Look at UParticleSystemComponent to model Abc Cache

Even when using parent-relative transform values, it is still possible to set translation and rotation using absolute world values via the methods shown below:

<table><thead><tr class="header"><th><strong>Function</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td>SceneComponent::SetWorldLocation()</td><td>Set the relative translation of this Component to put it at the supplied location in world space.</td></tr><tr class="even"><td>SceneComponent::SetWorldRotation()</td><td>Set the relative rotation of this Component to put it at the supplied orientation in world space.</td></tr></tbody></table>

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Actors/Components/index.html>&gt;_

GetDynamicMeshElements

- Replacing DrawDynamicElements

* FPrimitiveSceneProxy::PreRenderView / DrawDynamicElements refactored into GetDynamicMeshElements.

* Both paths still exist in code during this transition. The GetDynamicMeshElements path is currently disabled, enable with 'r.UseGetDynamicMeshElements 1'.

* GetDynamicMeshElements is called once in InitViews, and the resulting meshes are used in various passes.

* GetDynamicMeshElements is const and must not modify the proxy, update work should be pushed to the proxy from the game thread.

* GetDynamicMeshElements can be called on views that are not in the view family, which allows a proper view for shadow depth passes.

**Asynchronous**

The primary method of communication between the two threads is through the ENQUEUE_UNIQUE_RENDER_COMMAND_XXXPARAMETER macro. This macro creates a local class with a virtual Execute function that contains the code you enter into the macro. The game thread inserts the command into the rendering command queue, and the rendering thread calls the Execute function when it gets around to it.

FRenderCommandFence provides a convenient way to track the progress of the rendering thread on the game thread. The game thread calls FRenderCommandFence::BeginFence to begin the fence. The game thread can then call FRenderCommandFence::Wait to block until the rendering thread has processed the fence, or it can just poll the progress of the rendering thread by checking GetNumPendingFences. When GetNumPendingFences returns 0, the rendering thread has processed the fence.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/ThreadedRendering/index.html>&gt;_

ENQUEUE_UNIQUE_RENDER_COMMAND_ONEPARAMETER(TypeName,ParamType1,ParamName1,ParamValue1,Code)

- Each parameter needs 3 things: type, param name to reference inside the "anonymous function", parameter value to initialize

Normalized Data Types expect you to store the actual value (e.g. 0 - 255, or 0 - 32768)

**FName**

When you name a new asset in the **Content Browser**, change a parameter in a Dynamic Material Instance, or access a bone in a Skeletal Mesh, you are using FNames. FNames provide a very lightweight system for using strings, where a given string is stored only once in a data table, even if it is reused. FNames are case-insensitive. They are immutable, and cannot be manipulated. The storage system and static nature of FNames means that it is fast to look up and access FNames with keys. Another feature of the FName subsystem is the use of a hash table to provide fast string to FName conversions.

- [[FName Reference Guide]](https://docs.unrealengine.com/en-us/Programming/UnrealArchitecture/StringHandling/FName)

**FText**

FText represents a "display string". Any text you want to display to the user should be handled with FText. The FText class has built-in support for localization, and can handle text content that is localized and stored in a lookup table, as well as text that is localized at runtime, such as numbers, dates, times, and formatted text. Even text that does not need to be localized can be handled with FText. This includes user-entered content such as a player's name, and any text displayed with Slate. FText does not offer any mutation functions, because making changes to display strings is a very unsafe operation.

- [[FText Reference Guide]](https://docs.unrealengine.com/en-us/Programming/UnrealArchitecture/StringHandling/FText)

**FString**

Unlike FName and FText, FString is the only string class that allows for manipulation. There are many methods available for string manipulation, including case changing, excerpting substrings, and reversing. FStrings can be searched, modified, and compared against other strings. However, these manipulations can make FStrings more expensive than the immutable string classes.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/StringHandling/index.html>&gt;_

There is a lot of rendering code in UE4 so it is hard to get a quick high level view of what is going on. A good place to start reading through the code is FDeferredShadingSceneRenderer::Render, which is where a new frame is rendered on the rendering thread. It is also useful to do a 'profilegpu' command and look through the draw events. You can then do a **Find in Files** in Visual Studio on the draw event name to find the corresponding C++ implementation.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/index.html>&gt;_

**Material classes**

<table><thead><tr class="header"><th><strong>Class</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td><strong>FMaterial</strong></td><td>An interface to a material used for rendering. Provides access to material properties (e.g. blend mode). Contains a shader map used by the renderer to retrieve individual shaders.</td></tr><tr class="even"><td><strong>FMaterialResource</strong></td><td>UMaterial's implementation of the FMaterial interface.</td></tr><tr class="odd"><td><strong>FMaterialRenderProxy</strong></td><td>A material's representation on the rendering thread. Provides access to an FMaterial interface and the current value of each scalar, vector, and texture parameter.</td></tr><tr class="even"><td><strong>UMaterialInterface</strong></td><td>[abstract] Game thread interface for material functionality. Used to retrieve the FMaterialRenderProxy used for rendering and the UMaterial that is used as the source.</td></tr><tr class="odd"><td><strong>UMaterial</strong></td><td>A material asset. Authored as a node graph. Computes material attributes used for shading, sets blend mode, etc.</td></tr><tr class="even"><td><strong>UMaterialInstance</strong></td><td>[abstract] An instance of a UMaterial. Uses the node graph in the UMaterial but provides different parameters (scalars, vectors, textures, static switches). Each instance has a parent UMaterialInterface. Therefore a material instance's parent may be a UMaterial or another UMaterialInstance. This creates a chain that will eventually lead to a UMaterial.</td></tr><tr class="odd"><td><strong>UMaterialInstanceConstant</strong></td><td>A UMaterialInstance that may only be modified in the editor. May provide scalar, vector, texture, and static switch parameters.</td></tr><tr class="even"><td><strong>UMaterialInstanceDynamic</strong></td><td>A UMaterialInstance that may be modified at runtime. May provide scalar, vector, and texture parameters. It cannot provide static switch parameters and it cannot be the parent of another UMaterialInstance.</td></tr></tbody></table>

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/index.html>&gt;_

Primitive components are the basic unit of visibility and relevance determination. For example, occlusion and frustum culling happen on a per-primitive basis. Therefore it is important when designing a system to think about how big to make components. Each component has a bounds that is used for various operations like culling, shadow casting, and light influence determination.

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Rendering/index.html>&gt;_

Parallel Task evaluation:

// start parallel work  
                FGraphEventRef EvaluationTickEvent = TGraphTask&lt;FParallelAnimationEvaluationTask&gt;::CreateTask().ConstructAndDispatchWhenReady(this);

// set up a task to run on the game thread to accept the results  
                FGraphEventArray Prerequistes;  
                Prerequistes.Add(EvaluationTickEvent);  
                FGraphEventRef TickCompletionEvent = TGraphTask&lt;FParallelAnimationCompletionTask&gt;::CreateTask(&Prerequistes).ConstructAndDispatchWhenReady(this);

TickFunction-&gt;GetCompletionHandle()-&gt;DontCompleteUntil(TickCompletionEvent);

[fname reference guide]: https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/StringHandling/FName/index.html
[ftext reference guide]: https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/StringHandling/FText/index.html
