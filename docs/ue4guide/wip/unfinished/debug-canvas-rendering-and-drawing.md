---
sidebar: ue4guide
---
**Debug Canvas Rendering and drawing:**

UCanvasRenderTarget2

OnCanvasRenderTargetUpdate

UCanvas.DrawDebugGraph

.K2_DrawText

.K2_DrawTriangle

.K2_DrawMaterialTriangle

.K2_DrawBox

void AActor::DisplayDebug(UCanvas\* Canvas, const FDebugDisplayInfo& DebugDisplay, float& YL, float& YPos)

{

​ FDisplayDebugManager& DisplayDebugManager = Canvas->DisplayDebugManager;

​ DisplayDebugManager.SetDrawColor(FColor(255, 0, 0));

​ DrawString

GEngine:bool IsStereoscopic3D(FViewport\* InViewport = nullptr);

// Render CPU thread and GPU frame times.

​ const bool bStereoRendering = GEngine->IsStereoscopic3D(InViewport);

​ UFont\* Font = (!FPlatformProperties::SupportsWindowedMode() && GEngine->GetMediumFont()) ? GEngine->GetMediumFont() : GEngine->GetSmallFont();

​ // Note InX should already be within the safe zone

​ int32 X3 = InX \* (bStereoRendering ? 0.5f : 1.0f);

==================================

Perf Tab:

Look at stat <https://docs.unrealengine.com/latest/INT/Engine/Performance/StatCommands>

Debug Tab:

Dev Settings

Useful Commands

Rendering

\-

Gameplay

\-Show bounds

\-Other useful show flags (ShowFlagsValues.inl)

Game Controls

\-Look at UBBCheat Manager & UCheatManager to expose all those functions

\-Transition to next zone

Editor Tab:

​ -bShowFrameRateAndMemory

​ -ULevelEditorPlaySettings.EnableSound

======================

UCanvasRenderTarget2

OnCanvasRenderTargetUpdate

UCanvas.DrawDebugGraph

.K2_DrawText

.K2_DrawTriangle

.K2_DrawMaterialTriangle

.K2_DrawBox

void AActor::DisplayDebug(UCanvas\* Canvas, const FDebugDisplayInfo& DebugDisplay, float& YL, float& YPos)

{

​ FDisplayDebugManager& DisplayDebugManager = Canvas->DisplayDebugManager;

​ DisplayDebugManager.SetDrawColor(FColor(255, 0, 0));

​ DrawString

GEngine:bool IsStereoscopic3D(FViewport\* InViewport = nullptr);

// Render CPU thread and GPU frame times.

​ const bool bStereoRendering = GEngine->IsStereoscopic3D(InViewport);

​ UFont\* Font = (!FPlatformProperties::SupportsWindowedMode() && GEngine->GetMediumFont()) ? GEngine->GetMediumFont() : GEngine->GetSmallFont();

​ // Note InX should already be within the safe zone

​ int32 X3 = InX \* (bStereoRendering ? 0.5f : 1.0f);

==================================

ENUM

ENUM_RANGE_BY_FIRST_AND_LAST()

ENUM_RANGE_BY_COUNT()

ENUM_RANGE_BY_VALUES()

//IMPORTANT! Different than exposing enums to bitflags for the engine

ENUM_CLASS_FLAGS(EPropertyLocalizationGathererTextFlags);

for (ECountedThing Val : TEnumRange&lt;ECountedThing>())

\* {

\* ...

\* }

UENUM(BlueprintType, meta=(Bitflags))

enum class EBBShowDebugClasses : uint8 {

Avatar,

Legend,

LegendView,

StateMachine,

};

UENUM(BlueprintType, meta=(Bitflags))

UPROPERTY(EditAnywhere, config, Category=Debug, meta=(Bitmask, BitmaskEnum="EBBShowDebugClasses"))

int32 P1ShowDebugClasses;

if (P1ShowDebugClasses & (1 &lt;&lt; (int32)EBBShowDebugClasses::Avatar))

===================

TActorRange

for( ALight\* Light : TActorRange&lt;ALight>(GetWorld()) )

=============

bHiddenEdLevel = true;

bHiddenEdLayer = true;

bHiddenEd = true;

bEditable = false;

====================

FDebugRenderSceneProxy

FORCEINLINE void FlushPersistentDebugLines(const UWo

FORCEINLINE void DrawDebugLine(const UWorld\* InWorld

FORCEINLINE void DrawDebugPoint(const UWorld\* InWorl

FORCEINLINE void DrawDebugDirectionalArrow(const UWo

FORCEINLINE void DrawDebugBox(const UWorld\* InWorld,

FORCEINLINE void DrawDebugBox(const UWorld\* InWorld,

FORCEINLINE void DrawDebugCoordinateSystem(const UWo

FORCEINLINE void DrawDebugCrosshairs(const UWorld\* I

FORCEINLINE void DrawDebugCircle(const UWorld\* InWor

FORCEINLINE void DrawDebugCircle(const UWorld\* InWor

FORCEINLINE void DrawDebug2DDonut(const UWorld\* InWo

FORCEINLINE void DrawDebugSphere(const UWorld\* InWor

FORCEINLINE void DrawDebugCylinder(const UWorld\* InW

FORCEINLINE void DrawDebugCone(const UWorld\* InWorld

FORCEINLINE void DrawDebugAltCone(const UWorld\* InWo

FORCEINLINE void DrawDebugString(const UWorld\* InWor

FORCEINLINE void DrawDebugFrustum(const UWorld\* InWo

FORCEINLINE void DrawDebugCapsule(const UWorld\* InWo

FORCEINLINE void DrawDebugCamera(const UWorld\* InWor

FORCEINLINE void FlushDebugStrings(const UWorld\* InW

FORCEINLINE void DrawDebugSolidBox(const UWorld\* InW

FORCEINLINE void DrawDebugSolidBox(const UWorld\* InW

FORCEINLINE void DrawDebugSolidBox(const UWorld\* InW

FORCEINLINE void DrawDebugMesh(const UWorld\* InWorld

FORCEINLINE void DrawDebugSolidPlane(const UWorld\* I

FORCEINLINE void DrawDebugSolidPlane(const UWorld\* I

FORCEINLINE void DrawDebugFloatHistory(UWorld const

FORCEINLINE void DrawDebugFloatHistory(UWorld const

FORCEINLINE void DrawDebugCanvas2DLine(UCanvas\* Canv

FORCEINLINE void DrawDebugCanvas2DLine(UCanvas\* Canv

FORCEINLINE void DrawDebugCanvas2DCircle(UCanvas\* Ca

FORCEINLINE void DrawDebugCanvasLine(UCanvas\* Canvas

FORCEINLINE void DrawDebugCanvasCircle(UCanvas\* Canv

FORCEINLINE void DrawDebugCanvasWireSphere(UCanvas\*

FORCEINLINE void DrawDebugCanvasWireCone(UCanvas\* Ca

**---------------------------------------------------------**

\#if WITH_EDITORONLY_DATA

​ if (bVisualizeComponent && SpriteComponent == nullptr && GetOwner() && !GetWorld()->IsGameWorld() )

​ {

​ // Create a new billboard component to serve as a visualization of the actor until there is another primitive component

​ SpriteComponent = NewObject&lt;UBillboardComponent>(GetOwner(), NAME_None, RF_Transactional | RF_Transient | RF_TextExportTransient);

​ BillboardComponent->SetFlags(RF_Transactional);

​ BillboardComponent->CreationMethod = EComponentCreationMethod::SimpleConstructionScript;

SpriteComponent->Sprite = LoadObject&lt;UTexture2D>(nullptr, TEXT("/Engine/EditorResources/EmptyActor.EmptyActor"));

SpriteComponent->RelativeScale3D = FVector(0.5f, 0.5f, 0.5f);

SpriteComponent->Mobility = EComponentMobility::Movable;

SpriteComponent->AlwaysLoadOnClient = false;

SpriteComponent->bIsEditorOnly = true;

SpriteComponent->SpriteInfo.Category = TEXT("Misc");

SpriteComponent->SpriteInfo.DisplayName = NSLOCTEXT( "SpriteCategory", "Misc", "Misc" );

SpriteComponent->CreationMethod = CreationMethod;

SpriteComponent->bIsScreenSizeScaled = true;

SpriteComponent->bUseInEditorScaling = true;

SpriteComponent->SetupAttachment(this);

SpriteComponent->RegisterComponent();

​ }

\#endif

**Anim Sequence:**

void UAnimSequence::GetBonePose(FTransformArrayA2& OutAtoms, const FBoneContainer& RequiredBones, const FAnimExtractContext& ExtractionContext) const

FTransform UAnimSequence::ExtractRootMotion(float StartTime, float DeltaTime, bool bAllowLooping) const

ExtractRootMotionFromRange

ExtractRootTrackTransform(

GetBoneTransform(RootTransform, 0, Pos, bUseRawDataOnly);

const FReferenceSkeleton& RefSkeleton = MySkeleton->GetReferenceSkeleton();

​ if( RefSkeleton.GetNum() > 0 )

​ {

​ return RefSkeleton.GetRefBonePose()\[0];

​ }

FAnimationRuntime::AdvanceTime(false, DesiredDeltaMove, CurrentPosition, SequenceLength);
