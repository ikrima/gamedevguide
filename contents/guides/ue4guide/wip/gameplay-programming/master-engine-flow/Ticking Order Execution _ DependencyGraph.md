Actor Components do not necessarily tick before/after owning Actor

 

Components that are attached tick after their parents

 

Actors/components tick after the matinee actor/levelsequencer that controls it (you can configure level sequencer to not do this)

  

Some common dependencies in order of priority: sub-bullet points mean they get run after their header

 

PossessingController.ActorTick

-   PossessedPawn.ActorTick

-   PossessedPawn.MovementComponent (look below for this ones other dependencies)

 

{PossessingController.ActorTick, MovementBasePrimitiveComponent.Primary, Owner of MovementBasePrimitiveComponent, & all of its the ticking child components}

-   MovementComponent.Primary

    -   PostPhysicsTickFunction

    -   OwnerActor.PrimaryActorTick

    -   ACharacter::Mesh.Primary

    -   MovementComponent.UpdatedComponent (e.g. Capsule component of ACharacter)

 

World-&gt;EndPhysicsTickFunction

-   SkeletalMeshComponent.EndPhysicsTickFunction

 

MasterPoseComponentTick.Primary

-   SkinnedMeshComponent.PrimaryComponent

 

{PrimitiveComponent.Primary && World-&gt;EndPhysicsTickFunction}

-   PostPhysicsComponentTick

  

Engine Flow

FWorldDelegates::OnWorldTickStart.Broadcast(TickType, DeltaSeconds);

//Happens before net code/update all incoming packets

 

FEngineLoop::TotalTickTime

 

World::Tick()

\[TG\_PrePhysics, TG\_PostPhysics\]

ProcessLatentActions

FTickableObjects::Tick

\[TG\_PostUpdateWork, TG\_LastDemotable\]

FXSystem

 

FTickableObjects::Tick() ones that don't belong to world
