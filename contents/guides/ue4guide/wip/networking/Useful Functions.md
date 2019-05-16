 FHttpModule/IHttpRequest/IHttpResponse: Wrapper to easily make http requests

 

// Add a new actor for replication programmatically

SetReplicates(bool bInReplicates)

{

if (Role == ROLE\_Authority)

{

if (bReplicates == false && bInReplicates == true)

{

if (UWorld\* MyWorld = GetWorld()) // GetWorld will return nullptr on CDO, FYI

{

MyWorld-&gt;AddNetworkActor(this);

}

}

 

RemoteRole = (bInReplicates ? ROLE\_SimulatedProxy : ROLE\_None);

bReplicates = bInReplicates;

}

else

{

UE\_LOG(LogActor, Warning, TEXT("SetReplicates called on actor '%s' that is not valid for having its role modified."), \*GetName());

}

}

 

 

JSON

/\*\* Class that handles converting Json objects to and from UStructs \*/  
class JSONUTILITIES\_API FJsonObjectConverter

 

/\*\*  
 \* Base class for a JSON serializable object. Derive from this to make your object serializable  
 \*/  
struct FJsonSerializable

 

// FJsonSerializable  
        BEGIN\_JSON\_SERIALIZER  
                JSON\_SERIALIZE( "AppName",                **AppName** );  
                JSON\_SERIALIZE( "SessionName",        **SessionName** );  
                JSON\_SERIALIZE( "FriendlyName",        **FriendlyName** );  
                JSON\_SERIALIZE( "Timestamp",                **Timestamp** );  
                JSON\_SERIALIZE( "SizeInBytes",        **SizeInBytes** );  
                JSON\_SERIALIZE( "DemoTimeInMs",        **DemoTimeInMs** );  
                JSON\_SERIALIZE( "NumViewers",        **NumViewers** );  
                JSON\_SERIALIZE( "bIsLive",                **bIsLive** );  
                JSON\_SERIALIZE( "Changelist",        **Changelist** );  
                JSON\_SERIALIZE( "shouldKeep",        **bShouldKeep** );  
        END\_JSON\_SERIALIZER

JSON documentation: <http://www.wraiyth.com/?p=198>

 

 

 

 

NetUpdate() & NetUpdateFrequency()

 

Called from UWorld:Tick() in LevelTick.cpp:

-   Top of tick -&gt; BroadcastTickDispatch()/TickNetClient() is where client receives all network requests



-   Bottom of tick-&gt; UNetDriver::TickFlush() where all the Replication magic happens from client to everywhere else
