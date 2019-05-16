**Debug Canvas Rendering and drawing:**

UCanvasRenderTarget2

OnCanvasRenderTargetUpdate

 

UCanvas.DrawDebugGraph

.K2\_DrawText

.K2\_DrawTriangle

.K2\_DrawMaterialTriangle

.K2\_DrawBox

 

void AActor::DisplayDebug(UCanvas\* Canvas, const FDebugDisplayInfo& DebugDisplay, float& YL, float& YPos)

{

​	FDisplayDebugManager& DisplayDebugManager = Canvas-&gt;DisplayDebugManager;

​	DisplayDebugManager.SetDrawColor(FColor(255, 0, 0));

​	DrawString

 

 

GEngine:bool IsStereoscopic3D(FViewport\* InViewport = nullptr);

// Render CPU thread and GPU frame times.

​	const bool bStereoRendering = GEngine-&gt;IsStereoscopic3D(InViewport);

​	UFont\* Font = (!FPlatformProperties::SupportsWindowedMode() && GEngine-&gt;GetMediumFont()) ? GEngine-&gt;GetMediumFont() : GEngine-&gt;GetSmallFont();

 

​	// Note InX should already be within the safe zone

​	int32 X3 = InX \* (bStereoRendering ? 0.5f : 1.0f);

==================================

Perf Tab:

Look at stat <https://docs.unrealengine.com/latest/INT/Engine/Performance/StatCommands/>

 

Debug Tab:

Dev Settings

 

Useful Commands

Rendering

\-

 

Gameplay

-Show bounds

-Other useful show flags (ShowFlagsValues.inl)

 

 

Game Controls

-Look at UBBCheat Manager & UCheatManager to expose all those functions

-Transition to next zone

 

Editor Tab:

​	-bShowFrameRateAndMemory

​	-ULevelEditorPlaySettings.EnableSound

 

======================

UCanvasRenderTarget2

OnCanvasRenderTargetUpdate

 

UCanvas.DrawDebugGraph

.K2\_DrawText

.K2\_DrawTriangle

.K2\_DrawMaterialTriangle

.K2\_DrawBox

 

void AActor::DisplayDebug(UCanvas\* Canvas, const FDebugDisplayInfo& DebugDisplay, float& YL, float& YPos)

{

​	FDisplayDebugManager& DisplayDebugManager = Canvas-&gt;DisplayDebugManager;

​	DisplayDebugManager.SetDrawColor(FColor(255, 0, 0));

​	DrawString

 

 

GEngine:bool IsStereoscopic3D(FViewport\* InViewport = nullptr);

// Render CPU thread and GPU frame times.

​	const bool bStereoRendering = GEngine-&gt;IsStereoscopic3D(InViewport);

​	UFont\* Font = (!FPlatformProperties::SupportsWindowedMode() && GEngine-&gt;GetMediumFont()) ? GEngine-&gt;GetMediumFont() : GEngine-&gt;GetSmallFont();

 

​	// Note InX should already be within the safe zone

​	int32 X3 = InX \* (bStereoRendering ? 0.5f : 1.0f);

==================================

ENUM

ENUM\_RANGE\_BY\_FIRST\_AND\_LAST()

ENUM\_RANGE\_BY\_COUNT()

ENUM\_RANGE\_BY\_VALUES()

 

//IMPORTANT! Different than exposing enums to bitflags for the engine

ENUM\_CLASS\_FLAGS(EPropertyLocalizationGathererTextFlags);

 

for (ECountedThing Val : TEnumRange&lt;ECountedThing&gt;())

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

 

for( ALight\* Light : TActorRange&lt;ALight&gt;(GetWorld()) )

 

 

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

\#if WITH\_EDITORONLY\_DATA

​	if (bVisualizeComponent && SpriteComponent == nullptr && GetOwner() && !GetWorld()-&gt;IsGameWorld() )

​	{

​	// Create a new billboard component to serve as a visualization of the actor until there is another primitive component

​	SpriteComponent = NewObject&lt;UBillboardComponent&gt;(GetOwner(), NAME\_None, RF\_Transactional | RF\_Transient | RF\_TextExportTransient);

​	BillboardComponent-&gt;SetFlags(RF\_Transactional);

​	BillboardComponent-&gt;CreationMethod = EComponentCreationMethod::SimpleConstructionScript;

 

SpriteComponent-&gt;Sprite = LoadObject&lt;UTexture2D&gt;(nullptr, TEXT("/Engine/EditorResources/EmptyActor.EmptyActor"));

SpriteComponent-&gt;RelativeScale3D = FVector(0.5f, 0.5f, 0.5f);

SpriteComponent-&gt;Mobility = EComponentMobility::Movable;

SpriteComponent-&gt;AlwaysLoadOnClient = false;

SpriteComponent-&gt;bIsEditorOnly = true;

SpriteComponent-&gt;SpriteInfo.Category = TEXT("Misc");

SpriteComponent-&gt;SpriteInfo.DisplayName = NSLOCTEXT( "SpriteCategory", "Misc", "Misc" );

SpriteComponent-&gt;CreationMethod = CreationMethod;

SpriteComponent-&gt;bIsScreenSizeScaled = true;

SpriteComponent-&gt;bUseInEditorScaling = true;

 

SpriteComponent-&gt;SetupAttachment(this);

SpriteComponent-&gt;RegisterComponent();

​	}

\#endif

 

 

**Anim Sequence:**

void UAnimSequence::GetBonePose(FTransformArrayA2& OutAtoms, const FBoneContainer& RequiredBones, const FAnimExtractContext& ExtractionContext) const

FTransform UAnimSequence::ExtractRootMotion(float StartTime, float DeltaTime, bool bAllowLooping) const

ExtractRootMotionFromRange

ExtractRootTrackTransform(

GetBoneTransform(RootTransform, 0, Pos, bUseRawDataOnly);

 

 

const FReferenceSkeleton& RefSkeleton = MySkeleton-&gt;GetReferenceSkeleton();

​	if( RefSkeleton.GetNum() &gt; 0 )

​	{

​	return RefSkeleton.GetRefBonePose()\[0\];

​	}

 



FAnimationRuntime::AdvanceTime(false, DesiredDeltaMove, CurrentPosition, SequenceLength);
