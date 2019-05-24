---
sortIndex: 2
---

Pass -lanplay command arg to use lan bandwidth settings

### Low Level Constants:
```cpp
enum { MAX_PACKET_SIZE = 1024 }; // MTU for the connection  
enum { LAN_BEACON_MAX_PACKET_SIZE = 1024 }; // MTU for the connection

enum { RELIABLE_BUFFER = 256 }; // Power of 2 >= 1.  
enum { MAX_PACKETID = 16384 };  // Power of 2 >= 1, covering guaranteed loss/misorder time.  
enum { MAX_CHSEQUENCE = 1024 }; // Power of 2 >RELIABLE_BUFFER, covering loss/misorder time.  
enum { MAX_BUNCH_HEADER_BITS = 64 };  
enum { MAX_PACKET_HEADER_BITS = 15 }; // = FMath::CeilLogTwo(MAX_PACKETID) + 1 (IsAck)  
enum { MAX_PACKET_TRAILER_BITS = 1 };
```

### Runtime lag bandwidth data:

UPlayer/UNetConnection:

- CurrentNetSpeed: Actual net speed that gets updated

- MaxPacket: Maximum packet size.

- LastReceiveTime; // Last time a packet was received, for timeout checking.

- LastReceiveRealtime; // Last time a packet was received, using real time seconds (FPlatformTime::Seconds)

- LastGoodPacketRealtime; // Last real time a packet was considered valid

- LastSendTime; // Last time a packet was sent, for keepalives.

- LastTickTime; // Last time of polling.

- QueuedBits; // Bits assumed to be queued up.

- TickCount; // Count of ticks.

- LastRecvAckTime; // The last time an ack was received \*/


**Misc Details:**

- **NetClientTicksPerSecond:** is actually how many client connections the server will tick on each of its frames. Similar for the NetUpdateFrequency values, those control how often the server will consider the actor's properties for replication.

- **bClampListenServerTickRate:** Clamp maxtickrate if listenserver by using NetServerMaxTickRate


### Ini Config:
```cpp
[/Script/Engine.Player] 
; Bandwidth Settings For Client 
ConfiguredInternetSpeed=10000 
ConfiguredLanSpeed=20000

[/Script/OnlineSubsystemUtils.IpNetDriver] 
; Not used 
;MaxDownloadSize 
; Clamp maxtickrate if listenserver by using NetServerMaxTickRate; Not needed bc we have our own custom GetMaxTickRate()  
;bClampListenServerTickRate=False 
; Only used for dedis and listenserver if bClampListenServerTickRate  
NetServerMaxTickRate=60 
; Client rates for internet vs lan play;  
MaxInternetClientRate=10000 
MaxClientRate=15000 
; Amount of time a server will wait before traveling to next map, gives clients time to receive final RPCs on existing level @see NextSwitchCountdown  
ServerTravelPause=4.0 
SpawnPrioritySeconds=1.0 
RelevantTimeout=5.0 
KeepAliveTime=0.2 
; Amount of time to wait for a new net connection to be established before destroying the connection  
InitialConnectTimeout=30.0 
; Amount of time to wait before considering an established connection timed out.   
; Typically shorter than the time to wait on a new connection because this connection 
; should already have been setup and any interruption should be trapped quicker. 
ConnectionTimeout=15.0 
; A multiplier that is applied to the above values when we are running with unoptimized builds (debug) 
; or data (uncooked). This allows us to retain normal timeout behavior while debugging without resorting 
; to the nuclear 'notimeouts' option or bumping the values above. If ==0 multiplier = 1 
TimeoutMultiplierForUnoptimizedBuilds=1 
; If true, ignore timeouts completely.  Should be used only in development 
;bNoTimeouts=True 
NetConnectionClassName="/Script/OnlineSubsystemUtils.IpConnection" 
; Number of ports which will be tried if current one is not available for binding (i.e. if told to bind to port N, will try from N to N+MaxPortCountToTry inclusive) 
MaxPortCountToTry=512 
; Number of bytes that will be passed to FSocket::SetBufferSize\* when initializing. 
;ServerDesiredSocketReceiveBufferBytes 
;ServerDesiredSocketSendBufferBytes 
;ClientDesiredSocketReceiveBufferBytes 
;ClientDesiredSocketSendBufferBytes

[/Script/Engine.GameNetworkManager] 
; Looks like a lot of this isnt actually used wrt to setting bandwidth limits 
; CharacterMovementComponent seems to be the only main thing using this class 
; ----------------------------  
; Listen server dynamic netspeed adjustment - not used anywhere by default 
; values stored in AdjustedNetSpeed & LastNetSpeedUpdateTime 
; Total available bandwidth for listen server, split dynamically across net connections 
TotalNetBandwidth=32000 
; Min/Max bandwidth dynamically set per connection 
MaxDynamicBandwidth=7000 
MinDynamicBandwidth=4000 
; ---------------------------- 
; Player replication 
MoveRepSize=42.0f 
MAXPOSITIONERRORSQUARED=3.0f 
MAXNEARZEROVELOCITYSQUARED=9.0f 
CLIENTADJUSTUPDATECOST=180.0f 
MAXCLIENTUPDATEINTERVAL=0.25f 
MaxMoveDeltaTime=0.125f 
ClientNetSendMoveDeltaTime=0.0166 
ClientNetSendMoveDeltaTimeThrottled=0.0222 
ClientNetSendMoveThrottleAtNetSpeed=10000 
ClientNetSendMoveThrottleOverPlayerCount=10 
ClientAuthorativePosition=false 
ClientErrorUpdateRateLimit=0.0f 
; ---------------------------- 
; Movement Time Discrepancy settings for Characters (speed hack detection and prevention) 
bMovementTimeDiscrepancyDetection=false 
bMovementTimeDiscrepancyResolution=false 
MovementTimeDiscrepancyMaxTimeMargin=0.25f 
MovementTimeDiscrepancyMinTimeMargin=-0.25f 
MovementTimeDiscrepancyResolutionRate=1.0f 
MovementTimeDiscrepancyDriftAllowance=0.0f 
bMovementTimeDiscrepancyForceCorrectionsDuringResolution=false 
bUseDistanceBasedRelevancy=true 
; Standby cheat detection 
; Used to determine if checking for standby cheats should occur 
; bIsStandbyCheckingEnabled:1; 
; Used to determine whether we've already caught a cheat or not 
; bHasStandbyCheatTriggered:1; 
; The amount of time without packets before triggering the cheat code 
; StandbyRxCheatTime; 
; The amount of time without packets before triggering the cheat code 
; StandbyTxCheatTime; 
; The point we determine the server is either delaying packets or has bad upstream 
; BadPingThreshold; 
; The percentage of clients missing RX data before triggering the standby code 
; PercentMissingForRxStandby; 
; The percentage of clients missing TX data before triggering the standby code 
; PercentMissingForTxStandby; 
; The percentage of clients with bad ping before triggering the standby code 
; PercentForBadPing; 
; The amount of time to wait before checking a connection for standby issues 
; JoinInProgressStandbyWaitTime;
```