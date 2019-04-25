Editor Gizmos:

ABaseTransformGizmo

APivotTransformGizmo

 

UGizmoHandleMeshComponent

Result.bEditorPrimitiveRelevance = true;

FGizmoHandle

UGizmoHandleGroup

UAxisGizmoHandleGroup

UStretchGizmoHandleGroup

UStretchGizmoHandleGroup

 

**PreviewMeshes:**

ACameraRig\_Rail

-   USplineComponent

-   USplineMeshComponent

-   USplineMeshComponent\* CreateSplinePreviewSegment();

// overrides CameraComponent's camera mesh

static ConstructorHelpers::FObjectFinder&lt;UStaticMesh&gt; EditorCameraMesh(TEXT("/Engine/EditorMeshes/Camera/SM\_CineCam.SM\_CineCam"));

CameraMesh = EditorCameraMesh.Object;

 

static ConstructorHelpers::FObjectFinder&lt;UStaticMesh&gt; PlaneMesh(TEXT("/Engine/ArtTools/RenderToTexture/Meshes/S\_1\_Unit\_Plane.S\_1\_Unit\_Plane"));

DebugFocusPlaneMesh = PlaneMesh.Object;

 

static ConstructorHelpers::FObjectFinder&lt;UMaterial&gt; PlaneMat(TEXT("/Engine/EngineDebugMaterials/M\_SimpleTranslucent.M\_SimpleTranslucent"));

DebugFocusPlaneMaterial = PlaneMat.Object;

 

// Setup uniform scaling

UStaticMesh\* UniformScaleMesh = nullptr;

{

> static ConstructorHelpers::FObjectFinder&lt;UStaticMesh&gt; ObjectFinder( TEXT( "/Engine/VREditor/TransformGizmo/UniformScaleHandle" ) );
>
> UniformScaleMesh = ObjectFinder.Object;
>
> check( UniformScaleMesh != nullptr );

}

 

class UGizmoHandleMeshComponent\* UGizmoHandleGroup::CreateMeshHandle( class UStaticMesh\* HandleMesh, const FString& ComponentName )

{

> const bool bAllowGizmoLighting = false;        // @todo vreditor: Not sure if we want this for gizmos or not yet. Needs feedback. Also they're translucent right now.

 

> UGizmoHandleMeshComponent\* HandleComponent = CreateDefaultSubobject&lt;UGizmoHandleMeshComponent&gt;( \*ComponentName );
>
> check( HandleComponent != nullptr );

 

> HandleComponent-&gt;SetStaticMesh( HandleMesh );
>
> HandleComponent-&gt;SetMobility( EComponentMobility::Movable );
>
> HandleComponent-&gt;SetupAttachment( this );

 

> HandleComponent-&gt;SetCollisionEnabled( ECollisionEnabled::QueryOnly );
>
> HandleComponent-&gt;SetCollisionResponseToAllChannels( ECR\_Ignore );
>
> HandleComponent-&gt;SetCollisionResponseToChannel( COLLISION\_GIZMO, ECollisionResponse::ECR\_Block );
>
> HandleComponent-&gt;SetCollisionObjectType( COLLISION\_GIZMO );

 

> HandleComponent-&gt;bGenerateOverlapEvents = false;
>
> HandleComponent-&gt;SetCanEverAffectNavigation( false );
>
> HandleComponent-&gt;bCastDynamicShadow = bAllowGizmoLighting;
>
> HandleComponent-&gt;bCastStaticShadow = false;
>
> HandleComponent-&gt;bAffectDistanceFieldLighting = bAllowGizmoLighting;
>
> HandleComponent-&gt;bAffectDynamicIndirectLighting = bAllowGizmoLighting;
>
> //HandleComponent-&gt;bUseEditorCompositing = true;

 

> return HandleComponent;

}
