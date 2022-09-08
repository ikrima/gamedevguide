---
sortIndex: 8
sidebar: ue4guide
---

# UObject:

```cpp
/** IsNameStableForNetworking means an object can be referred to its path name (relative to outer) over the network */
virtual bool IsNameStableForNetworking() const;

/** IsFullNameStableForNetworking means an object can be referred to its full path name over the network */
virtual bool IsFullNameStableForNetworking() const;

/** IsSupportedForNetworking means an object can be referenced over the network */
virtual bool IsSupportedForNetworking() const;

/** Returns a list of sub-objects that have stable names for networking */
virtual void GetSubobjectsWithStableNamesForNetworking(TArray<UObject\*> &ObjList) {}

/** Called right before receiving a bunch */
virtual void PreNetReceive();

/** Called right after receiving a bunch */
virtual void PostNetReceive();

/** Called right after calling all OnRep notifies (called even when there are no notifies) */
virtual void PostRepNotifies() {}

/** Called right before being marked for destruction due to network replication */
virtual void PreDestroyFromReplication();
```

# Actor Helpers/HighLevel

```cpp
/** Returns a constant reference to the replicated components set */
const TArray<UActorComponent*>& GetReplicatedComponents() const

/** Get read-only access to current AttachmentReplication. */
const struct FRepAttachment& GetAttachmentReplication() const { return AttachmentReplication; }

/** Called on client when updated bReplicateMovement value is received for this actor. */
UFUNCTION()
virtual void OnRep_ReplicateMovement();

/** ReplicatedMovement struct replication event */
UFUNCTION()
virtual void OnRep_ReplicatedMovement();

/** Called on client when updated AttachmentReplication value is received for this actor. */
UFUNCTION()
virtual void OnRep_AttachmentReplication();

/** Update location and rotation from ReplicatedMovement. Not called for simulated physics! */
virtual void PostNetReceiveLocationAndRotation();

/** Update velocity - typically from ReplicatedMovement, not called for simulated physics! */
virtual void PostNetReceiveVelocity(const FVector& NewVelocity);

/** Update and smooth simulated physic state, replaces PostNetReceiveLocation() and PostNetReceiveVelocity() */
virtual void PostNetReceivePhysicState();

FindNetworkObjectInfo()
FlushNetDormancy()
ForceNetRelevant()
ForceNetUpdate()
NetUpdate()
NetUpdateFrequency()

IsNameStableForNetworking() const override
IsNetRelevantFor(const AActor* RealViewer, const AActor* ViewTarget, const FVector& SrcLocation) const
IsNetStartupActor() const
```

# Actor specific

```cpp
/**
* Called on the actor right before replication occurs.
* Only called on Server, and for autonomous proxies if recording a Client Replay.
*/
virtual void PreReplication(IRepChangedPropertyTracker & ChangedPropertyTracker);

/**
* Called on the actor right before replication occurs.
* Called for everyone when recording a Client Replay, including Simulated Proxies.
*/
virtual void PreReplicationForReplay(IRepChangedPropertyTracker & ChangedPropertyTracker);

/** Always called immediately after spawning and reading in replicated properties */
virtual void PostNetInit();

/** Method that allows an actor to replicate subobjects on its actor channel */
virtual bool ReplicateSubobjects(class UActorChannel *Channel, class FOutBunch *Bunch, FReplicationFlags *RepFlags);

/** Called on the actor when a new subobject is dynamically created via replication */
virtual void OnSubobjectCreatedFromReplication(UObject *NewSubobject);

/** Called on the actor when a subobject is dynamically destroyed via replication */
virtual void OnSubobjectDestroyFromReplication(UObject *Subobject);

/**
* @param ViewPos       Position of the viewer
* @param ViewDir       Vector direction of viewer
* @param Viewer        "net object" owned by the client for whom net priority is being determined (typically player controller)
* @param ViewTarget    The actor that is currently being viewed/controlled by Viewer, usually a pawn
* @param InChannel     Channel on which this actor is being replicated.
* @param Time          Time since actor was last replicated
* @param bLowBandwidth True if low bandwidth of viewer
* @return              Priority of this actor for replication
*/
virtual float GetNetPriority(const FVector& ViewPos, const FVector& ViewDir, class AActor* Viewer, AActor* ViewTarget, UActorChannel* InChannel, float Time, bool bLowBandwidth);

/** Returns true if the actor should be dormant for a specific net connection. Only checked for DORM_DormantPartial */
virtual bool GetNetDormancy(const FVector& ViewPos, const FVector& ViewDir, class AActor* Viewer, AActor* ViewTarget, UActorChannel* InChannel, float Time, bool bLowBandwidth);

/**
* Allows for a specific response from the actor when the actor channel is opened (client side)
* @param InBunch Bunch received at time of open
* @param Connection the connection associated with this actor
*/
virtual void OnActorChannelOpen(class FInBunch& InBunch, class UNetConnection* Connection) {};

/**
* Used by the net connection to determine if a net owning actor should switch to using the shortened timeout value
*
* @return true to switch from InitialConnectTimeout to ConnectionTimeout values on the net driver
*/
virtual bool UseShortConnectTimeout() const { return false; }

/**
* SerializeNewActor has just been called on the actor before network replication (server side)
* @param OutBunch Bunch containing serialized contents of actor prior to replication
*/
virtual void OnSerializeNewActor(class FOutBunch& OutBunch) {};

/**
* Handles cleaning up the associated Actor when killing the connection
* @param Connection the connection associated with this actor
*/
virtual void OnNetCleanup(class UNetConnection* Connection) {};

/**
* Called by DestroyActor(), gives actors a chance to op out of actor destruction
* Used by network code to have the net connection timeout/cleanup first
*
* @return true if DestroyActor() should not continue with actor destruction, false otherwise
*/
virtual bool DestroyNetworkActorHandled();

Actor Connection Functions:
/** @return the actor responsible for replication, if any.  Typically the player controller */
virtual const AActor* GetNetOwner() const;

/** @return the owning UPlayer (if any) of this actor. This will be a local player, a net connection, or NULL. */
virtual class UPlayer* GetNetOwningPlayer();

/**
 * Get the owning connection used for communicating between client/server 
 * @return NetConnection to the client or server for this actor
 */
virtual class UNetConnection* GetNetConnection() const;

virtual bool IsNetRelevantFor(const AActor* RealViewer, const AActor* ViewTarget, const FVector& SrcLocation) const override;
```

# Debugging Functions

```cpp
/** Called by the networking system to call PreReplication on this actor and its components using the given NetDriver to find or create RepChangedPropertyTrackers. */
void CallPreReplication(UNetDriver* NetDriver);

/** Gives the actor a chance to pause replication to a player represented by the passed in actor - only called on server */
virtual bool IsReplicationPausedForConnection(const FNetViewer& ConnectionOwnerNetViewer);
/** Called on the client when the replication paused value is changed */
virtual void OnReplicationPausedChanged(bool bIsReplicationPaused);

/** Sync IsSimulatingPhysics() with ReplicatedMovement.bRepPhysics */
void SyncReplicatedPhysicsSimulation();

/** Called when the replicated state of a component changes to update the Actor's cached ReplicatedComponents array */
void UpdateReplicatedComponent(UActorComponent* Component);

/** Completely synchronizes the replicated components array so that it contains exactly the number of replicated components currently owned */
void UpdateAllReplicatedComponents();
```
