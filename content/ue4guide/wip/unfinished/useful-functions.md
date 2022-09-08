---
sidebar: ue4guide
---
### Useful functions

ULocalPlayer::GetPixelPoint()

ULocalPlayer::GetProjectionData(FViewport\* **Viewport**, EStereoscopicPass **StereoPass**, FSceneViewProjectionData& **ProjectionData**) const;

GetWorldTimerManager().SetTimerForNextTick(this, &AUTGameMode::StartMatch);

UShooterGameViewportClient::ShowDialog()

Dodging:

bool UUTCharacterMovement::PerformDodge(FVector &**DodgeDir**, FVector &**DodgeCross**)

bool AUTCharacter::Dodge(FVector **DodgeDir**, FVector **DodgeCross**)

Fapp::UseVRFocus

Set Maximum Delta Time between frames; helpful for debugging by t.OverrideFPS or UGameEngine::MaxDeltaTime

- MaxDeltaTime is unusable in network games (look at UpdateTimeAndHandleMaxTickRate)

FixupDeltaSeconds(**DeltaSeconds**, **RealDeltaSeconds**);

APawn::MoveIgnoreActorAdd()

\* Handles game-specific networking management (cheat detection, bandwidth management, etc.).

AGameNetworkManager

For both Actors & Components

virtual void CheckForErrors();

virtual void CheckForDeprecated();

SGenericDialogWidget::OpenDialog()

AActor::DisplayDebug(

Unreal Tournament Good References:

- UUTAnnouncer class for announcer

- UUTProfileSettings

DisplayInternals()

ProfilingDebugging

ABTesting.H

ExternalProfiler

Histogram.h

MallocProfiler

for( TArray&lt;ULevel\*>::TConstIterator **it** = GetWorld()->GetLevels().CreateConstIterator(); **it**; ++**it** )
{
        ULevel\* **CurLevel** = \***it**;
        if( **CurLevel** && **CurLevel**->bIsVisible )
        {
                ALevelScriptActor\* **LSA** = **CurLevel**->GetLevelScriptActor();

### Changing Component Ownership:

1. void RegisterTImelineWithActor(UTimelineComponent\* Timeline, AActor\* Actor)

1. {

1. // Might want to save this if it's not the TransientPackage / World.

1. UObject\* OriginalOwner = Timeline->GetOuter();

1. FString OriginalName = Timeline->GetName();

1. // We can leave the name alone.

1. Timeline->Rename( \*OriginalName, Actor );

1. Actor->AddInstancedComponent(Timeline);

1. Timeline->RegisterAllTickFunctions(true);

1. // At this point, you can perform any other setup / re-initialization needed on the

1. // timeline. Also, GetOwner in the Timeline should now return the passed in

1. // Actor.

1. }

1. void UnregisterTimelineComponent(UTimelineComponent\* Timeline)

1. {

1. AActor\* Actor = Timeline->GetOwner();

1. // This will unregister tick functions.

1. Timeline->Rename(\*OriginalName, OriginalOuter);

1. }

*From <https://answers.unrealengine.com/questions/539437/temporarily-adding-ticking-actorcomponents-to-acto.html>*
