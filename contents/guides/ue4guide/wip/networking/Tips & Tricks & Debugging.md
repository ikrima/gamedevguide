## Debugging

Console commands Simulate network packet loss/lag/congestion/latency:

Net PktLoss=1

net pktlossburst=x

Net PktOrder=0

Net PktDup=0

Net PktLag=75

Net PktLagVariance=0

DumpOnlineSessionState

Debug Character Movement/Client Side prediction:

- Draw green/red collision bounds at server correction/client incorrect positions of replicated objects p.netshowcorrections 1

- Control lifetime of visualizations

  p.NetCorrectionLifetime 5

- Verbose logging

  log lognetplayermovement verbose

LogNet: Verbose info on channels/connections

LogNetPlayerMovement: Detailed info about movement from clients & corrections

LogNetTraffic: Verbose information about data sent on a connection

Stat Net: lists ping, channel count, in/out bytes, etc

Stat Game: List of network processing information

## Logging:

Net log debugging

LogCoreNet Log

LogGameNetworkManager Log

LogNet Log

LogNetDormancy Log

LogNetSerialization Log

LogNetPackageMap Log

LogNetFastTArray Log

LogNetPartialBunch Log

LogNetTraffic Log

LogNetVersion Log

LogNetPlayerMovement Log

LogCharacterNetSmoothing Log

LogRep Log

LogRepTraffic Log

## Stats

DECLARE_CYCLE_STAT_EXTERN(TEXT("Net Tick Time"),STAT_NetWorldTickTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Nav Tick Time"),STAT_NavWorldTickTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Reset Async Trace Time"),STAT_ResetAsyncTraceTickTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("GT Tickable Time"),STAT_TickableTickTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Runtime Movie Tick Time"),STAT_RuntimeMovieSceneTickTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Finish Async Trace Time"),STAT_FinishAsyncTraceTickTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Net Broadcast Tick Time"),STAT_NetBroadcastTickTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("ServerReplicateActors Time"),STAT_NetServerRepActorsTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Consider Actors Time"),STAT_NetConsiderActorsTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Update Unmapped Objects Time"),STAT_NetUpdateUnmappedObjectsTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Inital Dormant Time"),STAT_NetInitialDormantCheckTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Prioritize Actors Time"),STAT_NetPrioritizeActorsTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Replicate Actor Time"),STAT_NetReplicateActorTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Dynamic Property Rep Time"),STAT_NetReplicateDynamicPropTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Dynamic Property Compare Time"),STAT_NetReplicateDynamicPropCompareTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Dynamic Property Send Time"),STAT_NetReplicateDynamicPropSendTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Dynamic Property Send BackCompat Time"),STAT_NetReplicateDynamicPropSendBackCompatTime,STATGROUP_Game, );

DECLARE_DWORD_COUNTER_STAT_EXTERN(TEXT("Skipped Dynamic Props"),STAT_NetSkippedDynamicProps,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("NetSerializeItemDelta Time"),STAT_NetSerializeItemDeltaTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("NetUpdateGuidToReplicatorMap Time"), STAT_NetUpdateGuidToReplicatorMap,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Static Property Rep Time"),STAT_NetReplicateStaticPropTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Rebuild Conditionals"),STAT_NetRebuildConditionalTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Net Post BC Tick Time"),STAT_NetBroadcastPostTickTime,STATGROUP_Game, );

DECLARE_CYCLE_STAT_EXTERN(TEXT("Net PackageMap SerializeObject"),STAT_PackageMap_SerializeObjectTime,STATGROUP_Game, );

## Debug networking on local machine with VR (launch order important!)

Server: UE4Editor.exe MPRepro mptest -server -log

Non-VR Client: UE4Editor.exe MPRepro 127.0.0.1 -game -nohmd

VR Client: UE4Editor.exe MPRepro 127.0.0.1 -game -vr

<https://udn.unrealengine.com/questions/307536/debugging-multiplayer-vr.html>>

## Getting around breakpoint timeouts

You should be able to launch with -notimeouts as a cmdline option

*Reference From <https://udn.unrealengine.com/questions/283473/multiplayer-breakpoints.html>*

Networking:

- PlayerIndex is 0 for multiplayer games. It's only different for local multiplayer

If your project is a code project with a \*.Build.cs file, you'll need a dependency on the "OnlineSubsystemNull" module.

For both code and blueprint projects, you also need to set the DefaultPlatformService in your DefaultEngine.ini file, like this:

[OnlineSubsystem]

DefaultPlatformService=Null

## How To Check If Player Is Local vs Server

Use these functions:

- IsLocalController() or GetRemoteRole()

## How to check for the server build: client vs server vs listen server: editor vs game vs pie vs editorpreview vs gamepreview

Use

```cpp
AActor::IsNetMode

UEngine::GetNetMode
```

Which calls these functions

```cpp
FPlatformProperties::IsServerOnly()
FPlatformProperties::IsGameOnly()
IsRunningDedicatedServer()
IsRunningGame()

IsRunningClientOnly()
```

\#UE_SERVER for compile time check of server build

```cpp
/** Returns whether script is executing within the editor. */

UWorld

bool IsPlayInEditor() const;

/** Returns whether script is executing within a preview window */
        bool IsPlayInPreview() const;

/** Returns whether script is executing within a mobile preview window */
        bool IsPlayInMobilePreview() const;

/** Returns whether script is executing within a vulkan preview window */
        bool IsPlayInVulkanPreview() const;

/** Returns true if this world is any kind of game world (including PIE worlds) */
        bool IsGameWorld() const;

/** Returns true if this world is a preview game world (blueprint editor) */
        bool IsPreviewWorld() const;

GetWorld()->WorldType

namespace EWorldType
{
        enum Type
        {
                /** An untyped world, in most cases this will be the vestigial worlds of streamed in sub-levels */
                None,

/** The game world */
                Game,

/** A world being edited in the editor */
                Editor,

/** A Play In Editor world */
                PIE,

/** A preview world for an editor tool */
                EditorPreview,

/** A preview world for a game */
                GamePreview,

/** An editor world that was loaded but not currently being edited in the level editor */
                Inactive
        };

/**
 * The network mode the game is currently running.
 * @see <https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Replication>
 */

enum ENetMode
{
        /** Standalone: a game without networking, with one or more local players. Still considered a server because it has all server functionality. */
        NM_Standalone,

/** Dedicated server: server with no local players. */
        NM_DedicatedServer,

/** Listen server: a server that also has a local player who is hosting the game, available to other players on the network. */
        NM_ListenServer,

/**
         * Network client: client connected to a remote server.
         * Note that every mode less than this value is a kind of server, so checking NetMode &lt; NM_Client is always some variety of server.
         */
        NM_Client,

NM_MAX,
};
```

### Client Authoritative

There is a config option for "ClientAuthorativePosition" \[sic, I know it's misspelled] on the GameNetworkManager that changes the rules: the server will accept client movement as authoritative and not force a correction if it's within a squared distance (MAXPOSITIONERRORSQUARED) from where the server last saw it. So in this case, the server would warp the character to where the client tried to move, and the client's position is the authority. The server can still replicate movement to the client normally, this just handles rogue client movements.

You set this in your game ini settings:

1. [/Script/Engine.GameNetworkManager]

1. MAXPOSITIONERRORSQUARED=625

1. ClientAuthorativePosition=true

*Reference From <https://answers.unrealengine.com/questions/26116/able-to-replicate-movement-when-using-addmovement.html>*
