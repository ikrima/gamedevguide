---
sortIndex: 2
sidebar: ue4guide
---

# Code Flow

UNetDriver::ServerReplicateActors. This is where the server will gather all of the actors that it has determined to be relevant for each client, and send any properties that have changed since the last time each connected client was updated.

*Reference From <https://docs.unrealengine.com/en-us/Gameplay/Networking/Actors/ReplicationFlow>*

Important functions for how actors are updated:

- AActor::NetUpdateFrequency - Used to determine how often an actor replicates

- AActor::PreReplication - Called before any replication occurs

- AActor::bOnlyRelevantToOwner - True if this actor only replicates to owner

- AActor::IsRelevancyOwnerFor - Called to determine relevancy when bOnlyRelevantToOwner is true

- AActor::IsNetRelevantFor - Called to determine relevancy when bOnlyRelevantToOwner is false

The high level flow looks like this:

- Loop over each actor that is actively replicating (AActor::SetReplicates( true ))

  - Determine if this actor is initially dormant (DORM_Initial), and if so, skip immediately.

  - Determine if the actor needs to update by checking the NetUpdateFrequency value, if not skip

  - If AActor::bOnlyRelevantToOwner is true, check the owning connection of this actor for relevancy by calling AActor::IsRelevancyOwnerFor on the viewer of the owning connection. If relevant, add to owned relevant list on the connection.

    - In this case, this actor will only send to a single connection.

  - For any actor that passes these initial checks, AActor::PreReplication is called.

    - PreReplication is a place where you can decide if you want properties to replicate for connections. Use the DOREPLIFETIME_ACTIVE_OVERRIDE for this.

  - If we pass the above, add to the considered list

- For each connection:

  - For each considered actor from above

    - Determine if dormant

    - If there is no channel yet

      - Determine if client has loaded the level the actor is in

        - If not loaded, skip

      - Determine if the actor is relevant by calling AActor::IsNetRelevantFor for the connection

        - If not relevant, skip

  - Add any actors on the connections owned relevant list from above

  - At this point, we have a list of actors that are relevant for this connection

  - Sort actors by priority

  - For each sorted actor:

    - If the connection hasn't loaded the level this actor is in, close the channel (if any), and continue

    - Every 1 second, determine if actor is relevant to connection by calling AActor::IsNetRelevantFor

    - If not relevant for 5 seconds, close channel

    - If relevant and no channel is open, open one now

    - If at any point this connection is saturated

      - For remaining actors

        - If relevant for less than 1 second, force an update next tick

        - If relevant for more than 1 second, call AActor::IsNetRelevantFor to determine if we should update next tick

    - For any actor that passes all of the above, the actor is replicated to the connection by calling UChannel::ReplicateActor

*Reference From <https://docs.unrealengine.com/en-us/Gameplay/Networking/Actors/ReplicationFlow>*

# Detailed Actor Replication Flow

The bulk of actor replication happens inside UNetDriver::ServerReplicateActor

*Reference From <https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Actors/ReplicationFlow/index.html>*

USTRUCT updates aren't atomic:

We are running into some infrequent crashes resulting from out-of-order property replication as a result of dropped packets. The situation is basically exactly what is described here:

<https://udn.unrealengine.com/questions/240480/are-structs-replicated-atomically.html>

- Frame 1 sets A.a = 0, A.b = 0

- Frame 2 sets A.a = 1, A.b = 1

- Frame 3 sets A.a = 1, A.b = 2

If the packet containing Frame 2's property updates gets dropped and Frame 3's doesn't, the client will momentarily see A.a = 0, A.b = 2, even though that state never existed on the server, and may be an entirely impossible and unhandled state. Upon receiving the network packet for Frame 3, the client will send a NAK to the server which will result in the missing data eventually making it to the client, but in the meantime the client is in an awkward state.

*Reference From <https://udn.unrealengine.com/questions/287584/property-replication-promises.html>*


## Replicating an Actor to a Connection

UChannel::ReplicateActor is the workhorse for replicating an actor and all of its components to a connection. The flow looks something like this:

- Determine if this is the first update since this actor channel was opened

  - If so, serialize specific information that is needed (initial location, rotation, etc)

- Determine if this connection owns this actor

  - If not owned, and this actor's role is ROLE_AutonomousProxy, then downgrade to ROLE_SimulatedProxy

- Replicate this actors changed properties

- Replicate each component's changed properties

- For any deleted components, send special delete command

*Reference From <https://docs.unrealengine.com/en-us/Gameplay/Networking/Actors/ReplicationFlow>*

# Spawn/Initial Replication Logic

Server tells client to spawn actor

On the client:

- SpawnActor() locally on the client through its (network) ActorChannel
- This just uses the Spawn<UClass>() template mechanism.
- Then any UPROPERTY() (possibly only if they're marked for replication?) that come in the first replication bunch. Note: this can be any changes in the UPROPERTY that happened before engine got a chance to replicate, not just properties that have been set before a deferred spawn.
- PostNetInit() gets called, ensuring all the replicated initial properties of the actor have been initialized
  - Also calls BeginPlay(). BeginPlay() is blocked for "networked spawned" Actors on clients. It still gets called in Spawn&lt;> on the server during
    - **IMPORTANT:** Which really means BeginPlay() should only use UPROPERTIES() that are meant to be set and default configuration time
- Can also create replication conditions on properties to only replicate on initial with COND_InitialOnly

Reference:

- When a replicated client is spawned on the server, an Actor channel is opened to the client, which spawns the Actor locally (the channel is used to keep the Actor up to date) when the Actor channel is closed, the client will delete the Actor.
  *Reference From <https://udn.unrealengine.com/questions/306400/spawn-an-actor-on-the-server-and-use-it-as-paramet.html>*

- Does this mean that it is safe to assume that PostNetInit() and BeginPlay() will not get called on the Client actor until it has received the entirety of it's initial network properties? This should be true for PostNetInit, not for BeginPlay though.
  *Reference From <https://udn.unrealengine.com/questions/226302/join-in-progress-initial-replication-completion.html>*

- We actually do know when a replication comes from the initial bunch that opens the channel. Since the initial bunch is reliable, any property that was changed from the default is guaranteed to come with that bunch, so we should be safe there. Maybe this is something we can explore more internally to expose.
  *Reference From <https://udn.unrealengine.com/questions/226302/join-in-progress-initial-replication-completion.html>*

  ```cpp
  /**
   *Standard method of serializing a new actor.
   *For static actors, this will just be a single call to SerializeObject, since they can be referenced by their path name.
   *For dynamic actors, first the actor's reference is serialized but will not resolve on clients since they haven't spawned the actor yet.
   *The actor archetype is then serialized along with the starting location, rotation, and velocity.
   *After reading this information, the client spawns this actor in the NetDriver's World and assigns it the NetGUID it read at the top of the function.
   *
  *returns true if a new actor was spawned. false means an existing actor was found for the netguid.
  */
  bool UPackageMapClient::SerializeNewActor(FArchive& Ar, class UActorChannel *Channel, class AActor*& Actor)
  ```

## How to dynamically add component in begin play C++ with replication

For posterity, the following code will successfully create and replicate a component dynamically in C++:

```cpp
MyDynamicRepComponent = ConstructObject&lt;UMyComponent>(MyComponentClass, Outer);
MyDynamicRepComponent->SetIsReplicated(true);
MyDynamicRepComponent->RegisterComponent();
```

This must be executed only on the server (components will be spawned automatically on clients), and at an appropriate time when all the net plumbing is initialized (my test was in AMyController::BeginPlay). I did not need the function SetNetAddressable() anywhere, and doing so in fact causes the "Stably named sub-object not found" error to occur as in the OP. Outer is a pointer to the object this component is being created for/in, and MyComponentClass is a TSubclassOf. As you can see from the usage of ConstructObject, you do *not* need to provide your own (i.e. stable by convention) name for this new component.

*Reference From <https://udn.unrealengine.com/questions/236164/dynamically-add-component-in-begin-play.html>*

## Replication Keys

```cpp
bool UActorChannel::ReplicateSubobject(UObject *Obj, FOutBunch &Bunch, const FReplicationFlags &RepFlags)
{
  // Hack for now: subobjects are SupportsObject==false until they are replicated via ::ReplicateSUbobject, and then we make them supported
  // here, by forcing the packagemap to give them a NetGUID.
  //
  // Once we can lazily handle unmapped references on the client side, this can be simplified.
  if ( !Connection->Driver->GuidCache->SupportsObject( Obj ) )
  {
    FNetworkGUID NetGUID = Connection->Driver->GuidCache->AssignNewNetGUID_Server( Obj );	//Make sure he gets a NetGUID so that he is now 'supported'
  }

  bool NewSubobject = false;

  TWeakObjectPtr<UObject> WeakObj(Obj);

  if (!ObjectHasReplicator(WeakObj))
  {
    // This is the first time replicating this subobject
    // This bunch should be reliable and we should always return true
    // even if the object properties did not diff from the CDO
    // (this will ensure the content header chunk is sent which is all we care about
    // to spawn this on the client).
    Bunch.bReliable = true;
    NewSubobject = true;
  }
  bool WroteSomething = FindOrCreateReplicator(WeakObj).Get().ReplicateProperties(Bunch, RepFlags);
  if (NewSubobject && !WroteSomething)
  {
    // Write empty payload to force object creation
    FNetBitWriter EmptyPayload;
    WriteContentBlockPayload( Obj, Bunch, false, EmptyPayload );
    WroteSomething= true;
  }

  return WroteSomething;
}
```
