---
sortIndex: 1
sidebar: ue4guide
---

### Actor Tick Lifecycle Flow

The functions of interest to initialization order for an Actor is roughly as follows:

- PostLoad/PostActorCreated - Do any setup of the actor required for construction. PostLoad for serialized actors, PostActorCreated for spawned.

- AActor::OnConstruction - The construction of the actor, this is where Blueprint actors have their components created and blueprint variables are initialized

- AActor::PreInitializeComponents - Called before InitializeComponent is called on the actor's components

- UActorComponent::InitializeComponent - Each component in the actor's components array gets an initialize call (if bWantsInitializeComponent is true for that component)

- AActor::PostInitializeComponents - Called after the actor's components have been initialized

- AActor::BeginPlay - Called when the level is started

Ticks are executed asynchronously in tick groups

Tick groups define general dependency between sets of actor ticks

Within a tick group, you can define a graph dependency by:

AddTickPrerequisiteActor or AddTickPrerequisiteComponent

Tick Groups:

- TG_PrePhysics - ticked before physics simulation starts
- TG_StartPhysics - special tick group that starts physics simulation
- TG_DuringPhysics - ticks that can be run in parallel with our physics simulation work
- TG_EndPhysics - special tick group that ends physics simulation
- TG_PreCloth - any item that needs physics to be complete before being executed
- TG_StartCloth - any item that needs to be updated after rigid body simulation is done, but before cloth is simulation is done
- TG_EndCloth - any item that can be run during cloth simulation
- TG_PostPhysics - any item that needs rigid body and cloth simulation to be complete before being executed
- TG_PostUpdateWork - any item that needs the update work to be done before being ticked
- TG_NewlySpawned - Special tick group that is not actually a tick group. After every tick group this is repeatedly re-run until there are no more newly spawned items to run

*Reference From <https://answers.unrealengine.com/questions/231386/tickgroup-how-to-understand-that.html>*

#### Actor Tick():

- Object ticking is done by registering a function delegate (FTickFunction) to the engine which is responsible for executing it. Ex: For Actors, FActorTickFunction::ExecuteTick() calls TickActor()

- For component ticking it's UActorComponent::ExecuteTick()

  - TickComponent()

    - UActorComponent::RecieveTick(): Blueprint Tick event

    - Then native logic generally happens after

- Actor:TickActor() determines whether to tick the actor or not & then ticks it

  - This is overriden in PlayerController to specify more exacting logic on order of what components tick when (e.g. input before main actor::tick & whether you're on the server or not)

  - Calls Actor::Tick()

- Actor::Tick() is native overridable function that contains tick() update logic

  - At beginning, calls RecieveTick() which is the BP event hook to execute tick logic

  - Afterwards, calls ProcessLatentActions() to process BP latent actions like delay events

#### Notes:

- ActorComponent's are not necessarily ticked in any order in relation to their owner Actor. Everything is just added onto the task graph. You have to use AddActorPrerequisite or AddActorComponentPrerequisite to define dependencies

- By default, CharacterMovementComponent/MovementCOmponents force their owning actors to tick after them

- SceneComponent waits for ParentAttached component to tick before it ticks itself

- Pawns ticks after owned Controller. Controller::SetPawn() adds a dependency to its Pawn on itself

- IntializeComponent and BeginPlay are only called in game worlds, not the editor world, so that may be why you aren't seeing them called. Like bWantsBeginPlay you also need bWantsInitializeComponent. Both BeginPlay and InitializeComponent will get called as part of calling RegisterComponent if the owning Actor has been initialized/begun play respectively.

*Reference From <https://udn.unrealengine.com/questions/285100/component-creation-overview.html>*

```cpp
// General flow here is like so
        // - Actor sets up the basics.
        // - Actor gets PreInitializeComponents()
        // - Actor constructs itself, after which its components should be fully assembled
        // - Actor components get OnComponentCreated

// - Actor components get OnRegister

// - Actor components get InitializeComponent

// - Actor gets PostInitializeComponents() once everything is set up

// - Actor components get RegisterComponentTickFunctions
        // This should be the same sequence for deferred or nondeferred spawning.

// It's not safe to call UWorld accessor functions till the world info has been spawned.
```

PostInitProperties()

- Gets called after the UPROPERTY member variables have been initialized for a class from the instance data/CDO

- Good place to put computed values (e.g. Designer sets Damage & DamageTime => Computed DamagePerSecond)

Actor::SpawnActor

- Actor::PostSpawnInitialize

  - ActorComponents::OnComponentCreated
