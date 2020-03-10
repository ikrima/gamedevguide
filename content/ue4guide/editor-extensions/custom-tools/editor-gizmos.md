---
sortIndex: 3
sidebar: ue4guide
---

**Editor Gizmos:**

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

static ConstructorHelpers::FObjectFinder&lt;UStaticMesh> EditorCameraMesh(TEXT("/Engine/EditorMeshes/Camera/SM_CineCam.SM_CineCam"));

CameraMesh = EditorCameraMesh.Object;

static ConstructorHelpers::FObjectFinder&lt;UStaticMesh> PlaneMesh(TEXT("/Engine/ArtTools/RenderToTexture/Meshes/S_1_Unit_Plane.S_1_Unit_Plane"));

DebugFocusPlaneMesh = PlaneMesh.Object;

static ConstructorHelpers::FObjectFinder&lt;UMaterial> PlaneMat(TEXT("/Engine/EngineDebugMaterials/M_SimpleTranslucent.M_SimpleTranslucent"));

DebugFocusPlaneMaterial = PlaneMat.Object;

// Setup uniform scaling

UStaticMesh\* UniformScaleMesh = nullptr;

{

 static ConstructorHelpers::FObjectFinder&lt;UStaticMesh> ObjectFinder( TEXT( "/Engine/VREditor/TransformGizmo/UniformScaleHandle" ) );

 UniformScaleMesh = ObjectFinder.Object;

 check( UniformScaleMesh != nullptr );

}

class UGizmoHandleMeshComponent\* UGizmoHandleGroup::CreateMeshHandle( class UStaticMesh\* HandleMesh, const FString& ComponentName )

{

 const bool bAllowGizmoLighting = false;        // @todo vreditor: Not sure if we want this for gizmos or not yet. Needs feedback. Also they're translucent right now.

 UGizmoHandleMeshComponent\* HandleComponent = CreateDefaultSubobject&lt;UGizmoHandleMeshComponent>( \*ComponentName );

 check( HandleComponent != nullptr );

 HandleComponent->SetStaticMesh( HandleMesh );

 HandleComponent->SetMobility( EComponentMobility::Movable );

 HandleComponent->SetupAttachment( this );

 HandleComponent->SetCollisionEnabled( ECollisionEnabled::QueryOnly );

 HandleComponent->SetCollisionResponseToAllChannels( ECR_Ignore );

 HandleComponent->SetCollisionResponseToChannel( COLLISION_GIZMO, ECollisionResponse::ECR_Block );

 HandleComponent->SetCollisionObjectType( COLLISION_GIZMO );

 HandleComponent->bGenerateOverlapEvents = false;

 HandleComponent->SetCanEverAffectNavigation( false );

 HandleComponent->bCastDynamicShadow = bAllowGizmoLighting;

 HandleComponent->bCastStaticShadow = false;

 HandleComponent->bAffectDistanceFieldLighting = bAllowGizmoLighting;

 HandleComponent->bAffectDynamicIndirectLighting = bAllowGizmoLighting;

 //HandleComponent->bUseEditorCompositing = true;

 return HandleComponent;

}
