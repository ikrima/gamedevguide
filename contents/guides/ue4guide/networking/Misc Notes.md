---
sortIndex: 13
---

# Misc Brain Dump

Manage ParticleSpawning:

```cpp
class AParticleEventManager : public AActor
FString ParticleEventManagerClassPath;

struct CORE_API FNetworkVersion

INetworkPredictionInterface\* **NetworkPredictionInterface** = Cast<INetworkPredictionInterface>(**PawnMovement**);
```

**bNetLoadOnClient** : If true the Actor will load from a level file on a network client. This should be set to true for Actors you place in a map that you want to exist on a client (typically most Actors want this).

*Reference From <https://wiki.unrealengine.com/Replication>*

**IsNetStartupActor()**: Returns true if this is a replicated actor that was placed in the map

# Useful Functions

## Networking Functions

NetUpdate() & NetUpdateFrequency()


**Actor Functions**

  ```cpp
  // Always called immediately before properties are received from the remote.
  virtual void PreNetReceive() override;

  // Always called immediately after properties are received from the remote.
  virtual void PostNetReceive() override;

  // Always called immediately after spawning and reading in replicated properties
  virtual void PostNetInit();

  /** Called right after calling all OnRep notifies (called even when there are no notifies) */
  virtual void PostRepNotifies() {}

  /** Called right before being marked for destruction due to network replication */
  virtual void PreDestroyFromReplication();
  ```

## Helper Functions

FHttpModule/IHttpRequest/IHttpResponse: Wrapper to easily make http requests

  ```cpp
  // Add a new actor for replication programmatically
  SetReplicates(bool bInReplicates)
  {
      if (Role == ROLE_Authority)
      {
          if (bReplicates == false && bInReplicates == true)
          {
              if (UWorld* MyWorld = GetWorld())       // GetWorld will return nullptr on CDO, FYI
              {
                  MyWorld->AddNetworkActor(this);
              }
          }

          RemoteRole = (bInReplicates ? ROLE_SimulatedProxy : ROLE_None);
          bReplicates = bInReplicates;
      }
      else
      {
          UE_LOG(LogActor, Warning, TEXT("SetReplicates called on actor '%s' that is not valid for having its role modified."), *GetName());
      }
  }
  ```


## JSON

JSON documentation: http://www.wraiyth.com/?p=198

```cpp
/** Class that handles converting Json objects to and from UStructs */
class JSONUTILITIES_API FJsonObjectConverter

/**
 * Base class for a JSON serializable object. Derive from this to make your object serializable
 */
struct FJsonSerializable

// FJsonSerializable
BEGIN_JSON_SERIALIZER
  JSON_SERIALIZE( "AppName",		AppName );
  JSON_SERIALIZE( "SessionName",	SessionName );
  JSON_SERIALIZE( "FriendlyName",	FriendlyName );
  JSON_SERIALIZE( "Timestamp",		Timestamp );
  JSON_SERIALIZE( "SizeInBytes",	SizeInBytes );
  JSON_SERIALIZE( "DemoTimeInMs",	DemoTimeInMs );
  JSON_SERIALIZE( "NumViewers",	NumViewers );
  JSON_SERIALIZE( "bIsLive",		bIsLive );
  JSON_SERIALIZE( "Changelist",	Changelist );
  JSON_SERIALIZE( "shouldKeep",	bShouldKeep );
END_JSON_SERIALIZER
```
