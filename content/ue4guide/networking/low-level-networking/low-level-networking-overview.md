---
sortIndex: 1
sidebar: ue4guide
---

# High Level Overview

<iframe src="//www.slideshare.net/slideshow/embed_code/key/rOZ78ABPJCoiRs" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>

[UE4 Networking](https://www.slideshare.net/JoeGraf1/ue4-networking)

Actor Relevancy: Trade CPU for network bandwidth

Reliable function replication:

- Function is guaranteed to be called
- Resent when an error is present
- Delayed when bandwidth is saturated

Unreliable function replication:

- Gets skipped if bandwidth is saturated
- Does not re-attempt if error occurs

UNetDriver: contains list of connections to Tick

- Server: N connections
- Client: 1 connection
- UNetConnection: Contains list of channels to replicate
  - UChannel: Logical construct to route data to proper object
    - Accessed by ChannelID, some have predefined ChannelIDs
    - UControlChannel: For handshake exchange/non-gameplay/processing object loading requests
    - UVoiceChannel: For Voice
    - UActorChannel: For replicating actors
      - Each replicated actor has a channel
      - Actors replicated by dynamically assigned channel ID

# Networking Classes

## Custom UNetDriver

Can create custom netdrivers

- Specified through ini

  ```ini
  [/Script/Engine.Engine]
  !NetDriverDefinitions=ClearArray
  +NetDriverDefinitions=(DefName="GameNetDriver",DriverClassName="/Script/BBR.BBNetDriver",DriverClassNameFallback="/Script/OnlineSubsystemUtils.IpNetDriver")
  +NetDriverDefinitions=(DefName="DemoNetDriver",DriverClassName="/Script/Engine.DemoNetDriver",DriverClassNameFallback="/Script/Engine.DemoNetDriver")
  ```

- PacketHandler created in

  ```cpp
  UNetDriver::InitConnectionlessHandler()
  ConnectionlessHandler->AddHandler(TEXT("Engine.EngineHandlerComponentFactory(StatelessConnectHandlerComponent)"), true);
  ```

- Good starter examples: `cpp>USteamNetDriver/UOculusNetDriver`

- `UDemoNetDriver` is a more fleshed out/advanced example

## Custom UNetConnection

Can create custom UNetConnection

- Specified through ini

  ```ini
  [/Script/OnlineSubsystemUtils.IpNetDriver]
  NetConnectionClassName="/Script/OnlineSubsystemUtils.IpConnection"
  ```

- PacketHandler created in

  ```cpp
  UNetConnection::InitHandler()
  Handler->AddHandler(TEXT("Engine.EngineHandlerComponentFactory(StatelessConnectHandlerComponent)"), true);
  ```

- These are great examples: `cpp>USteamNetConnection,UOculusNetConnection,UDemoNetConnection`

## Custom UNetChannel

Can create custom channels

- Specified through ini; can be customized per NetDriver

  ```ini
  [/Script/Engine.NetDriver]
  +ChannelDefinitions=(ChannelName=Control, ClassName=/Script/Engine.ControlChannel, StaticChannelIndex=0, bTickOnCreate=true, bServerOpen=false, bClientOpen=true, bInitialServer=false, bInitialClient=true)
  ```

- `SendBunch()` is the workhorse that preps stuff for sending

- `UVoiceChannel` is a great simple starting point

- `UActorChannel` is more fleshed out
  - ActorChannel manages the creation and lifetime of a replicated actor
  - FObjectReplicator: Does Actual replication of properties and RPCs (see DataReplication.h)

# Code Flow

## BroadcastTickDispatch()

- LevelTick.cpp:UWorld:Tick()::BroadcastTickDispatch()
  - Called at Top of tick -> BroadcastTickDispatch()
  - Entry point where client receives all network requests

### NetDriver::TickDispatch()

The main entry point for processing low level networking packets.
**WARNING:** *By default, this is packet processing from sockets is synchronous and happens on the game thread!*

NetDriver::TickDispatch
- Processes incoming packets from its SocketSubsystem
- Does some DDos logic
- Some useful bits here for debugging
  - GIpNetDriverMaxDesiredTimeSliceBeforeAlarmSecs: Trigger warning if packet processing is longer than this timeslice
  - OnNetworkProcessingCausingSlowFrame: Delegate if network processing blocks the frame for too long
- Handles initial connection handshake through PacketHandler
  - PacketHandler is extended using HandlerComponents
  - They process the raw packets
  - Example Handler Components: StatelessHandler, AESEncryptionHandler, OodleHandler for packet compression
- Setup UNetConnection (these are the UE4 abstraction of connections to different machines)
  - Server:
    - ServerConnection: `nullptr` This is assumption is baked in a lot of places that relies on IsServer() to mean `ServerConnection == null`
    - ClientConnections: One for each client
  - Client:
    - ServerConnection: connection to server
    - ClientConnections: `nullptr`
- Read Packet data
  - By default, socket recieve happens on this thread
  - IpNetDriver: Can be configured so that it spawns a separate recieve thread to queue packets from the socket.
  - If bUsingReceiveThread is enabled:
    - RecieveThread buffers packets into a queue
    - TickDispatch() dequeues `FReceivedPacket` structs and copies the packet into a thread local memory buffer
  - If it's not enabled:
    - Reads the socket packets directly
      `bOk = Socket->RecvFrom(Data, sizeof(Data), BytesRead, *FromAddr);`
- (UNetConnection)Connection->ReceivedRawPacket(Data, BytesRead);
  - Handler->Incoming(): Sends packet data to PacketHandler
    - Processes incoming packets at the PacketHandler level, before any UNetConnection processing takes place on the packet.
    - Use this for more complex changes to packets, such as compression/encryption
    - But be aware that compatibility problems with other HandlerComponent's are more likely.
  - Some very light security checking
    - Sets EngineNetworkProtocolVersion & GameNetworkProtocolVersion in packet stream

### UNetConnection::ReceivedPacket()

- UNetConnection::ReceivedPacket(): Workhorse of packet processing (still lowlevel)
  - ValidateSendBuffer()
  - Handles Ack/Nacks
  - Reads headers, the bunch' channel sequence number, etc
  - Constructs the FInBunch

    ```cpp
    FInBunch Bunch( this );
    int32 IncomingStartPos      = Reader.GetPosBits();
    uint8 bControl              = Reader.ReadBit();
    Bunch.PacketId              = InPacketId;
    Bunch.bOpen                 = bControl ? Reader.ReadBit() : 0;
    Bunch.bClose                = bControl ? Reader.ReadBit() : 0;
    Bunch.CloseReason           = Bunch.bClose ? (EChannelCloseReason)Reader.ReadInt((uint32)EChannelCloseReason::MAX) : EChannelCloseReason::Destroyed;
    Bunch.bDormant              = (Bunch.CloseReason == EChannelCloseReason::Dormancy);
    Bunch.bIsReplicationPaused  = Reader.ReadBit();
    Bunch.bReliable             = Reader.ReadBit();
    Bunch.ChIndex               = ChIndex;
    Bunch.bHasPackageMapExports = Reader.ReadBit();
    Bunch.bHasMustBeMappedGUIDs = Reader.ReadBit();
    Bunch.bPartial              = Reader.ReadBit();
    Bunch.ChName                = ...
    Bunch.ChType                = ...
    ```

  - Constructs the UChannel object if needed
  - (UChannel)Channel->ReceivedRawBunch(): Lowlevel Bunch processing and construction with checking against attacks (like replay attacks)
    - ReceivedNextBunch():
      - We received the next bunch. Basically at this point
        - We know this is in order if reliable
        - We dont know if this is partial or not
        - If its not a partial bunch, of it completes a partial bunch, we can call ReceivedSequencedBunch to actually handle it
      - ReceivedSequencedBunch(): Light wraper for main bunch processing that does cleanup after main call
        - ReceivedBunch(): Main entry point for bunch processing

#### UChannel::ReceivedBunch()

This is where main bunch processing happens and the function overridden by UActorChannel, UVoiceChannel,etc

- UActorChannel::ReceivedBunch()
 - Resolve NetGuids: Logic for netguid pammping, packagemapclient, etc
 - ProcessBunch()
   - Initialize client if first time through.
     - Spawn New Actor if necessary
       - Connection->PackageMap->SerializeNewActor(Bunch, this, NewChannelActor);
     - Sets if replication is paused
     - Sets up FReplicationFlags like bIgnoreRPCs, bReplay, bRepPhysics, etc
   - Read chunks of actor content
     - ReadContentBlockPayload(): Read the content block header and payload
     - FObjectReplicator& Replicator = FindOrCreateReplicator(RepObj): Main workhorse for actor replication
     - (FObjectReplicator)Replicator->ReceivedBunch()
   - Cleanup
     - Update UActorChannel.ReplicationMap
     - ObjectReplicator->PostReceivedBunch()
     - If new SpawnedActor: Actor->PostNetInit()

##### FObjectReplicator

- General Info
  - Generic class that replicates properties for an object.
  - All delta/diffing work is done in this class.
  - Its primary job is to produce and consume chunks of properties/RPCs:
  - Layout

    | NetGUID ObjRef |
    |----------------|
    |                |
    | Properties...  |
    |                |
    | RPCs...        |
    |                |
    |----------------|
    | </End Tag>     |
    |----------------|

- FObjectReplicator::ReceivedBunch(): Main entry point
  - For RPCS: Calls FObjectReplicator::ReceivedRPC()
    - Calls UE4's UFunction processing through Object->ProcessEvent()
    - ***USEFUL NOTE:*** Has logic for automatically forwarding RPCs to other netdrivers (probably for demonetdriver)

      ```cpp
      if (Connection->Driver->ShouldForwardFunction(OwningActor, Function, Parms))
      {
        FWorldContext* const Context = GEngine->GetWorldContextFromWorld(Connection->Driver->GetWorld());
        if (Context != nullptr)
        {
          UObject* const SubObject = Object != OwningChannel->Actor ? Object : nullptr;

          for (FNamedNetDriver& Driver : Context->ActiveNetDrivers)
          {
            if (Driver.NetDriver != nullptr && (Driver.NetDriver != Connection->Driver) && Driver.NetDriver->ShouldReplicateFunction(OwningActor, Function))
            {
              Driver.NetDriver->ProcessRemoteFunction(OwningActor, Function, Parms, nullptr, nullptr, SubObject);
            }
          }
        }
      }
      ```

- Useful bits:
  - `IsCustomDeltaProperty()`: & STRUCT_NetDeltaSerializeNative
  - `FReplicatedActorProperty`: struct containing property and offset for replicated actor properties
  - `FReplicationChangelistMgr`: manages a list of change lists for a particular replicated object that have occurred since the object started replicating
  - Once the history is completely full, the very first changelist will then be merged with the next one (freeing a slot)
    - This way we always have the entire history for join in progress players
    - This information is then used by all connections, to share the compare work needed to determine what to send each connection
    - Connections will send any changelist that is new since the last time the connection checked

## UWorld::BroadcastPostTickDispatch()

- LevelTick.cpp:UWorld:Tick()::BroadcastPostTickDispatch()
  - Called right after BroadcastTickDispatch()
  - Calls UNetDriver::PostTickDispatch
    - ReplicationDriver->PostTickDispatch()
    - GRPCCSVTracker.EndTickDispatch()

## UWorld::TickNetClient()

- LevelTick.cpp:UWorld:Tick()::UWorld::TickNetClient()
  - Called right after BroadcastTickDispatch()
  - Does checks if the socket is closed and if it was, throw a network failure error

## UWorld::BroadcastTickFlush()

- LevelTick.cpp:UWorld:Tick()::BroadcastTickFlush()
  - Bottom of tick-> UNetDriver::TickFlush() where all the Replication magic happens from client to everywhere else

## UWorld::BroadcastPostTickFlush()

- LevelTick.cpp:UWorld:Tick()::BroadcastPostTickFlush()
  - UNetDriver::PostTickFlush() is the only thing that's bound
    -  Only calls UOnlineEngineInterface::Get()->ClearVoicePackets()
