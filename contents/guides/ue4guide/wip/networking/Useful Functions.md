---
sortIndex: 14
---

```cpp
FHttpModule/IHttpRequest/IHttpResponse: Wrapper to easily make http requests

// Add a new actor for replication programmatically

SetReplicates(bool bInReplicates)

{

if (Role == ROLE_Authority)

{

if (bReplicates == false && bInReplicates == true)

{

if (UWorld* MyWorld = GetWorld()) // GetWorld will return nullptr on CDO, FYI

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


**JSON**

```json
/** Class that handles converting Json objects to and from UStructs */  
class JSONUTILITIES_API FJsonObjectConverter

/**  
 * Base class for a JSON serializable object. Derive from this to make your object serializable  
 */  
struct FJsonSerializable

// FJsonSerializable  
        BEGIN_JSON_SERIALIZER  
                JSON_SERIALIZE( "AppName",                **AppName** );  
                JSON_SERIALIZE( "SessionName",        **SessionName** );  
                JSON_SERIALIZE( "FriendlyName",        **FriendlyName** );  
                JSON_SERIALIZE( "Timestamp",                **Timestamp** );  
                JSON_SERIALIZE( "SizeInBytes",        **SizeInBytes** );  
                JSON_SERIALIZE( "DemoTimeInMs",        **DemoTimeInMs** );  
                JSON_SERIALIZE( "NumViewers",        **NumViewers** );  
                JSON_SERIALIZE( "bIsLive",                **bIsLive** );  
                JSON_SERIALIZE( "Changelist",        **Changelist** );  
                JSON_SERIALIZE( "shouldKeep",        **bShouldKeep** );  
        END_JSON_SERIALIZER
```
JSON documentation: <http://www.wraiyth.com/?p=198>



NetUpdate() & NetUpdateFrequency()

Called from UWorld:Tick() in LevelTick.cpp:

- Top of tick -> BroadcastTickDispatch()/TickNetClient() is where client receives all network requests

- Bottom of tick-> UNetDriver::TickFlush() where all the Replication magic happens from client to everywhere else
