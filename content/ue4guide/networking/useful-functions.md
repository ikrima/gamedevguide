---
sortIndex: 14
sidebar: ue4guide
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

JSON documentation: <http://www.wraiyth.com/?p=198>

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
