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

ACameraRig_Rail

- USplineComponent

- USplineMeshComponent

- USplineMeshComponent\* CreateSplinePreviewSegment();

// overrides CameraComponent's camera mesh

static ConstructorHelpers::FObjectFinder&lt;UStaticMesh&gt; EditorCameraMesh(TEXT("/Engine/EditorMeshes/Camera/SM_CineCam.SM_CineCam"));

CameraMesh = EditorCameraMesh.Object;

static ConstructorHelpers::FObjectFinder&lt;UStaticMesh&gt; PlaneMesh(TEXT("/Engine/ArtTools/RenderToTexture/Meshes/S_1_Unit_Plane.S_1_Unit_Plane"));

DebugFocusPlaneMesh = PlaneMesh.Object;

static ConstructorHelpers::FObjectFinder&lt;UMaterial&gt; PlaneMat(TEXT("/Engine/EngineDebugMaterials/M_SimpleTranslucent.M_SimpleTranslucent"));

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
> HandleComponent-&gt;SetCollisionResponseToAllChannels( ECR_Ignore );
>
> HandleComponent-&gt;SetCollisionResponseToChannel( COLLISION_GIZMO, ECollisionResponse::ECR_Block );
>
> HandleComponent-&gt;SetCollisionObjectType( COLLISION_GIZMO );

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
