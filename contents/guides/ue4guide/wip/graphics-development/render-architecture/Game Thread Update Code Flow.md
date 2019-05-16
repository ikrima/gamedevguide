For UPrimitiveComponent:

PostLoad()

- BeginInitResources(): Create static render resources (e.g. index/vertex buffer)

Component Register

- FScene::AddPrimitive()

  - Calls PrimitiveSceneProxy::CreateSceneProxy()

  - GT Enqueues PrimitiveSceneProxy::SetTransform(): Updates render side xforms, local bounds, & actor position,

    - Calls UpdateUniformBufferMaybeLazy(): Lazily updates uniform buffer

    - Calls virtual OnTransformChanged(): StaticMesh just caches TotalScale3D but isn't used

- RT Enqueue AddPrimitiveSceneInfo_RenderThread(): Only

  - Allocates new entries into FScene arrays (Bounds, VisiblityIds,OcclusionBounds,ComponentIds)

  - Sets up attachment group, Parent LOD, DistanceFieldSceneData

  - PrimitiveSceneInfo::AddToScene()

    - Mark Precomputed Lighting Buffer Dirty

    - PrimtiiveSceneInfo::AddStaticMeshes(): Add this primtive to StaticMeshDrawlist

      - Proxy::DrawStaticElements(): Collects Static Mesh BatchElements from ScenePrimtiveProxy

        - StaticMeshSceneProxy adds 2 batch elements per mesh element. One for optimized shadows and one for normal rendering

      - AddToDrawLists(): Called on all the FStaticMesh elements added from DrawStaticElements(). Goes through and adds each them to respective StaticMeshDrawList

        - Each DrawPolicyFactory::AddStaticMesh() creates a Drawing Policy for the specific mesh and TStaticMeshDrawlist::AddMesh() it to the corresponding list. Drawing Policies define specific parameters on how to draw this mesh in this specific pass, e.g. DepthDrawingPolicy. They're sorted based on state to minimize state changes

        - FBasePassOpaqueDrawingPolicyFactory::AddStaticMesh() is the main responsible BasePass factory. TBasePassDrawingPolicy&lt;LightMapPolicyType> is the main draw policy

    - Update PrimitiveOctree

    - Compute Bounds, Visibility Id index, OcclusionFlags, Occlusion Bounds, ComponentIds

    - Loop through Light Octree and create LightPrimitiveInteractions for each Light affecting this Primitive

      - PrimitiveSceneProxy::GetLightRelevance() based on FlightInteraction for primitive (retrieved through PrimitiveSceneProxy::GetInteraction())

Component Transform Update

- MarkRenderTransformDirty(): Calls MarkForNeededEndOfFrameUpdate() so component can send transform updates at end of frame

  - UWorld::MarkActorComponentForNeededEndOfFrameUpdate() stores this component in its list to do deferred marshalling of sending updates to render thread

- UActorComponent::DoDeferredRenderUpdates_Concurrent(): Is parallel called to actually send updates to render thread

  - SendRenderTransform_Concurrent() calls FScene::UpdatePrimitiveTransform()

    - For some objects (PrimitiveSceneProxy::ShouldRecreateProxyOnUpdateTransform()), this recreates the render state so it's expensive

    - GT Enqueues UpdatePrimitiveTransform_RenderThread()

      - PrimitiveSceneInfo::RemoveFromScene(): Remove primitive from scene at old location, octree, LightInteractions, & PrecomputedLightingBuffer, and

      - PrimitiveSceneProxy::SetTransform(): Updates render side xforms, local bounds, & actor position,

        - Calls UpdateUniformBufferMaybeLazy(): Lazily updates uniform buffer

        - Calls virtual OnTransformChanged(): StaticMesh just caches TotalScale3D but isn't used

      - PrimitiveSceneInfo::AddToScene(): Cross reference list above


- Same things happens when render state is marked dirty (gets recreated with remove/add) or render dynamic data gets marked as dirty (SendRenderDynamicData_Concurrent()

For other render components not deriving from UPrimitiveComponent (e.g. Lights/Decals),

Component::CreateRenderState_Concurrent(): - Create dynamic render resources

- FScene::AddLight/AddDecal()

  - Calls respective CreateSceneProxy()
