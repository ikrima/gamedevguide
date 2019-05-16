### Useful functions

ULocalPlayer::GetPixelPoint()

ULocalPlayer::GetProjectionData(FViewport\* **Viewport**, EStereoscopicPass **StereoPass**, FSceneViewProjectionData& **ProjectionData**) const;

GetWorldTimerManager().SetTimerForNextTick(this, &AUTGameMode::StartMatch);

UShooterGameViewportClient::ShowDialog()

 

Dodging:

bool UUTCharacterMovement::PerformDodge(FVector &**DodgeDir**, FVector &**DodgeCross**)

bool AUTCharacter::Dodge(FVector **DodgeDir**, FVector **DodgeCross**)

 

 

Fapp::UseVRFocus

 

 

Set Maximum Delta Time between frames; helpful for debugging by t.OverrideFPS or UGameEngine::MaxDeltaTime

-   MaxDeltaTime is unusable in network games (look at UpdateTimeAndHandleMaxTickRate)

FixupDeltaSeconds(**DeltaSeconds**, **RealDeltaSeconds**);

APawn::MoveIgnoreActorAdd()

 

 \* Handles game-specific networking management (cheat detection, bandwidth management, etc.).

AGameNetworkManager

 

 

 

For both Actors & Components

virtual void CheckForErrors();

virtual void CheckForDeprecated();

 

SGenericDialogWidget::OpenDialog()

 



 

AActor::DisplayDebug(

 

Unreal Tournament Good References:

-   UUTAnnouncer class for announcer

-   UUTProfileSettings

 

DisplayInternals()

 

ProfilingDebugging

ABTesting.H

ExternalProfiler

Histogram.h

MallocProfiler

 

for( TArray&lt;ULevel\*&gt;::TConstIterator **it** = GetWorld()-&gt;GetLevels().CreateConstIterator(); **it**; ++**it** )  
{  
        ULevel\* **CurLevel** = \***it**;  
        if( **CurLevel** && **CurLevel**-&gt;bIsVisible )  
        {  
                ALevelScriptActor\* **LSA** = **CurLevel**-&gt;GetLevelScriptActor();



 

### Changing Component Ownership:

1. void RegisterTImelineWithActor(UTimelineComponent\* Timeline, AActor\* Actor)

2. {

3. // Might want to save this if it's not the TransientPackage / World.

4. UObject\* OriginalOwner = Timeline-&gt;GetOuter();

5. FString OriginalName = Timeline-&gt;GetName();

6. // We can leave the name alone.

7. Timeline-&gt;Rename( \*OriginalName, Actor );

8. Actor-&gt;AddInstancedComponent(Timeline);

9. Timeline-&gt;RegisterAllTickFunctions(true);

10. // At this point, you can perform any other setup / re-initialization needed on the

11. // timeline. Also, GetOwner in the Timeline should now return the passed in

12. // Actor.

13. }

14. void UnregisterTimelineComponent(UTimelineComponent\* Timeline)

15. {

16. AActor\* Actor = Timeline-&gt;GetOwner();

17. // This will unregister tick functions.

18. Timeline-&gt;Rename(\*OriginalName, OriginalOuter);

19. }



*From &lt;<https://answers.unrealengine.com/questions/539437/temporarily-adding-ticking-actorcomponents-to-acto.html>&gt;* 