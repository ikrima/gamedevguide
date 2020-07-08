<!-- markdownlint-disable -->

- ABBStateMachineManager::TickActor() is the core game logic loop
  - The game logic is ticked at 30hz using integer frame numbers (FBBSimFN) vs. visual frames (FBBVisFN)
    - We have our own bc this was before UE4 had the builtin FFrameNumber used now in sequencer
  - This also controls the network RPC calls (routes through the PlayerController)
    - UBBSMMRPConduit subobject handles our multicasting scheme
      - We can RPC from any machine to others based on machine connection mask (client machines go to the server and multicast back out but there's logic so it doesn't send back down to initiating client)
- Initial Connection/Intro
  - Block world starting/ticking/beginplay until both players have connected
  - entityAdmin.MatchStateManager.ProcessInitialConnectionLoop()
  - The logic here is messy but you can ignore most of it. In hindsight, should've just had this outside of the ECS system
  - The intro also is piped here bc of a hack to enable the preload which unfortunately uses sequencer bits that are disallowed to be used but artist hacked it for a demo

# System Loop

- System: Process Network Control Messages (e.g. update which clients have released their netsync barriers)
  - ProcessRcvdNetCtrlMsgs()
    - These are from the server that provide control (transition, wait for sync, etc)
    - These exist out of the ecs state bc they're really meant to control simulation flow with exigent things like "wait until all machines have reached this point", "wait until the server confirmed", etc
    - Right now it's just used for EVarType_ReplMsg::NetSyncBarrierSignal && EVarType_ReplMsg::NetSyncBarrierRelease

- System: Update Time & Transient properties (e.g. IsNetSyncStalled, IsPureVisTick) && Process Deferred Transient Simulation/Engine Bookkeeping Actions

  - ProcessStartEngineTick
    - UtilInt_ProcessProcessDeferredEngTickActions(): UE4 engine actions that need to be processed (will refactor to process netsync barriers vs. other stuff)
      - EVarType_NextEngineTickDeferredActn::BroadcastSyncSignalForLocalMachine: Signal to server that sync barrier was unlatched
      - EVarType_NextEngineTickDeferredActn::ClearNetSyncEvent
      - EVarType_NextEngineTickDeferredActn::ReturnSequenceActorToPool
      - EVarType_NextEngineTickDeferredActn::DBGForceTransition
    - Util_SnapshotUE4FrameState(): Snapshot UE4 Specific state (e.g. current controller input) so that ECS can just reference this struct instead of querying UE4.
      - Allows us to stub different structs here as well as during rollback serialize it back from transaction log
    - Adjust Game Time by clamping to MaxPredSfn
  - ProcessReleaseNetSyncBarriers()

- System: Network Sync: Confirm local moves with server moves and set misprediction frames /////
  - ProcessConfirmServerNetReplay(): System: Network Sync: Confirm local moves with server moves and set misprediction frames
    - if listenserver =>
      - parse clients inputs & confirm for opponent player inputs only
      - rollback/rollforth
      - update lastsyncack
    - if client =>
      - confirm lastsync ack
      - rollbackrollforth

- System: Rollback
  - ProcessRollback()
    - From Current Frame backwards

- System: Rollforth

  - System: Determines If We Need To Rollforth
    - ProcessDetermineSubTickType()
      - Determine tick type

  - System: Calculates MatchCurSFN/VFN
    - ProcessStartRollforthSubTick

  - System: Process Rollforth frame state like saving snapshot or applying historical data
    - ProcessApplyReplayState()
    - ProcessDeferredSimTickActions()

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

## Initial Connect

### MachineConnection::ProcessConnectionLoop

- Handle All Initial Connection Logic
- Setup local machine masks
- Wait to connect to server
- Show waiting to connect
- Wait until other client connects
- Wait until replication finished

## During Game

### Debug Cheat Commands

### Quit Game

## End Of Game

### Rematch

### Lobby


















* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

## ~~Refactor NetSync~~
~~GetAuthReplayLog() => Refactor~~
~~PendingNetReplaySnapshot => PendingCommandFrame~~
~~Util_SetNextTransitionIfSyncReleased~~
~~Rename FESReplayState to FESCommandFrame~~
~~FESAuthReplayLog~~
~~FESCommandFrame~~
~~Util_RequestNetRPCSync => Make internal~~


* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Rollback/Rollforth

- ~~PendingCommandFrame~~
- ~~FESFrameStateSnapshot::ReplaySnapshot => move to its own place~~

- ~~BBECSCustomTimeStep~~
  - ~~will clamp teh simtick~~
  - ~~update sfn~~
  - ~~update vfn~~

- ~~StartEngineTick:~~
  - ~~NOTE: Scrub process deferred engine actions~~
  - ~~Set Subtick type~~
    - ~~If we are too far ahead, BBECSCustomTimeStep will clamp teh simtick~~
  - ~~Possibly Pull from network log queue?~~
    - ~~Update FESTransactionLog::AuthCommandFrameLog from NetworkDispatcher~~

- ~~Figure Out What CommandFrame We Need To Sim~~
  - ~~ProcessConfirmServerCommandFrames~~
    - ~~Compare AuthCommandFrameLog to LocalCommandFrameLog~~
      - ~~Set Range To Confirm (if new AuthCommandFrames received)~~
      - ~~Compare & Confirm LocalCommandFrameLog vs AuthCommandFrameLog~~
        - ~~Mark LocalCommandFrameLog[sfn].Status = Confirmed/NeedsCorrect/Predicted~~
  - ~~ProcessRollback~~
    - ~~Give each system ability to unwind~~
      - ~~NOTE: Don't delete stuff necessarily bc it might be recreated. Key into spawning logic/createentity~~
      - ~~NOTE: Scrub blueprints for anything that calls actor spawn/particle spawn/etc~~
    - ~~Fullrestore FrameState to lastconfirmedSFN~~
  - ~~Update UEFSComp.SfnToSim~~

## Rollforth
  - ~~ProcessStartRollforthSubTick(): Determine rollforth ticktype/etc based StateSnapshotFrameLog.FrameStatus~~

### RollforthCorrect
  -  ~~ProcessRollforthFrameState~~
     - ~~ProcessApplyReplayState => ProcessApplyCorrectiveRollforth~~
       - ~~Apply authoratative commandframe into framesnapshot~~
       - ~~Use LocalCommandFrameLog misprediction data for correction or better prediction forward?~~
     - ~~ProcessDeferredSimTickActions~~ No deferred actions to process during rollforthcorrect
     - ~~ProcessMatchStateTransition~~: Shouldn't predicted across matchstate transitions
  - ProcessRecordControllerInputState
    - UtilInput_ReplayDataCIS_Save():
      - NOTE: Stores prediction of opposite player. Guard against?
  - ProcessStaleEntities
  - ProcessLegendNodeEnterActns()
  - ProcessSweepHitboxes()
    - NOTE: Logic doing hitsweeps won't work bc of physx. Mebbe change to immediatemode?
  - ProcessItems()
    - NOTE: Logic references item->GetActorLocation()
    - NOTE: Watch out for cosmetic calls
    - NOTE: Watch out for sspawning/creation
  - ProcessSpawners()
    - NOTE: Logic references item->GetActorLocation()
    - NOTE: Watch out for cosmetic calls
    - NOTE: Watch out for sspawning/creation
  - ProcessProjectiles()
    - NOTE: Logic references item->GetActorLocation()
    - NOTE: Watch out for cosmetic calls
    - NOTE: Watch out for sspawning/creation
    - NOTE: Watch out for physics collision logic
  - ProcessGameEffectsAndVitalsModifications()
  - Legend::ProcessTransitions()
    - NOTE: Scrub GetPendingGameEvts()
  - ProcessHitboxes()
    - NOTE: Scrub use of GetComponentLocation()
  - ProcessBeginDestroy()
    - NOTE: Scrub this properly
  - ProcessEndRollforthSubTick(): Save Data
    - ~~LocalCommandFrameLog[sfn] = AuthCommandFrameLog[sfn]~~
    - ~~StateSnapshotFrameLog.FrameStatus = Confirmed~~
    - ~~SnapshotFrameState~~
      - NOTE: What about stuff that happens in UE4 (callbacks) that updates stuff? That won't get saved?
        - Maybe use ABBStateMachineManager::EndFrame() to catchall?

  - NOTE: Make sure Spawning calls don't actually recreate stuff during rollforthcorrect. Key into CreateEntity calls
  - NOTE: Watch all the CosNotify calls
  - NOTE: No visual ticking

### RollforthRePredict
  -  ~~ProcessRollforthFrameState~~
     - ~~ProcessApplyReplayState => ProcessApplyCorrectiveRollforth~~
       - ~~**Predict based on lastframe for opposite player & use LocalCommandFrameLog[localplayer] & possibly misprediction data**~~
     - ~~**ProcessDeferredSimTickActions**~~: No deferred actions to process during rollforthcorrect
     - ~~**ProcessMatchStateTransition**~~: Shouldn't predicted across matchstate transitions
  - ProcessRecordControllerInputState
    - UtilInput_ReplayDataCIS_Save():
      - NOTE: Stores prediction of opposite player. Guard against?
  - ProcessStaleEntities
  - ProcessLegendNodeEnterActns()
  - ProcessSweepHitboxes()
    - NOTE: Logic doing hitsweeps won't work bc of physx. Mebbe change to immediatemode?
  - ProcessItems()
    - NOTE: Logic references item->GetActorLocation()
    - NOTE: Watch out for cosmetic calls
    - NOTE: Watch out for sspawning/creation
  - ProcessSpawners()
    - NOTE: Logic references item->GetActorLocation()
    - NOTE: Watch out for cosmetic calls
    - NOTE: Watch out for sspawning/creation
  - ProcessProjectiles()
    - NOTE: Logic references item->GetActorLocation()
    - NOTE: Watch out for cosmetic calls
    - NOTE: Watch out for sspawning/creation
    - NOTE: Watch out for physics collision logic
  - ProcessGameEffectsAndVitalsModifications()
  - Legend::ProcessTransitions()
    - NOTE: Scrub GetPendingGameEvts()
  - ProcessHitboxes()
    - NOTE: Scrub use of GetComponentLocation()
  - ProcessBeginDestroy()
    - NOTE: Scrub this properly
  - ~~ProcessEndRollforthSubTick(): Save Data~~
    - **~~LocalCommandFrameLog[sfn] = AuthCommandFrameLog[sfn]~~**
    - ~~**StateSnapshotFrameLog.FrameStatus = PredictedAlready**~~
    - ~~SnapshotFrameState~~
      - NOTE: What about stuff that happens in UE4 (callbacks) that updates stuff? That won't get saved?
        - Maybe use ABBStateMachineManager::EndFrame() to catchall?

  - NOTE: Make sure Spawning calls don't actually recreate stuff during rollforthcorrect. Key into CreateEntity calls
  - NOTE: Watch all the CosNotify calls
  - NOTE: No visual ticking


### RollforthFullPredict
  -  ~~ProcessRollforthFrameState~~
     - ~~ProcessApplyReplayState => ProcessApplyFullPredictionRollforth~~
       - ~~Apply authoratative commandframe into framesnapshot~~
       - ~~Use LocalCommandFrameLog misprediction data for correction or better prediction forward?~~
     - ~~**ProcessDeferredSimTickActions**~~
     - ~~**ProcessMatchStateTransition**~~
  - ProcessRecordControllerInputState
    - UtilInput_ReplayDataCIS_Save():
      - NOTE: Stores prediction of opposite player. Guard against?
  - ProcessStaleEntities
  - ProcessLegendNodeEnterActns()
  - ProcessSweepHitboxes()
    - NOTE: Logic doing hitsweeps won't work bc of physx. Mebbe change to immediatemode?
  - ProcessItems()
    - NOTE: Logic references item->GetActorLocation()
    - NOTE: Watch out for cosmetic calls
    - NOTE: Watch out for sspawning/creation
  - ProcessSpawners()
    - NOTE: Logic references item->GetActorLocation()
    - NOTE: Watch out for cosmetic calls
    - NOTE: Watch out for sspawning/creation
  - ProcessProjectiles()
    - NOTE: Logic references item->GetActorLocation()
    - NOTE: Watch out for cosmetic calls
    - NOTE: Watch out for sspawning/creation
    - NOTE: Watch out for physics collision logic
  - ProcessGameEffectsAndVitalsModifications()
  - Legend::ProcessTransitions()
    - NOTE: Scrub GetPendingGameEvts()
  - ProcessHitboxes()
    - NOTE: Scrub use of GetComponentLocation()
  - ProcessBeginDestroy()
    - NOTE: Scrub this properly
  - ProcessEndRollforthSubTick(): Save Data
    - ~~LocalCommandFrameLog[sfn] = AuthCommandFrameLog[sfn]~~
    - ~~StateSnapshotFrameLog.FrameStatus = PredictedAlready~~
    - ~~SnapshotFrameState~~
      - NOTE: What about stuff that happens in UE4 (callbacks) that updates stuff? That won't get saved?
        - Maybe use ABBStateMachineManager::EndFrame() to catchall?

  - **~~NOTE: Make sure Spawning calls don't actually recreate stuff during rollforthcorrect. Key into CreateEntity calls~~**
  - **~~NOTE: Watch all the CosNotify calls~~**
  - **~~NOTE: No visual ticking~~**

### ProcessEndEngineTick()
- ~~ProcessNetworkSend~~
  - ~~IDispatch::Enqueue() the latest local command frames~~
  - ~~Dispatcher::Thread()~~
    - ~~Filter the log to only send (AuthCommandFrameLog.Latest(), LocalCommandFrameLog.Latest())~~
    - ServerMachineMask(): Marshall to "DedicatedServer Thread" Log


### General
- NOTE: Make a mode where each subtick happens on engine tick to circumvent complexity of actor->GetActorLocation/Transform() complexity with physx
- NOTE: Scrub everything that derives from IESEntityInterface/IESComponentInterface and make sure ECSSystems do not reference the uobject transforms/movement/etc
  - Ex: ItemsManager::Processs() does item->GetActorLocation()
- NOTE: Look at these
  - Util_AddLegendEventForThisFrame
  - UtilUE_AddLegendLandedInput
  - UtilLgnd_ReplayDataTriggerEvt_Apply
  - UtilLgnd_ReplayDataMovement_Apply
- NOTE: Scrub FESSimStateComp::_* functions
- NOTE: Scrub Util_IsLocalMultiplayer
- NOTE: Scrub matchStateComp.MatchCurSFN/VFN
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

## Refactor ECSCustomTimeStep

### ELevelTick Overview
  > - EditorEngine::Tick()->World-Tick() passes in ELevelTick TickType = IsRealtime ? LEVELTICK_ViewportsOnly : LEVELTICK_TimeOnly;
  >   - GameEngine always passes LEVELTICK_All
  > - LEVELTICK_TimeOnly: Can Ignore; mostly used for editor viewport's realtime vs. not
  > - LEVELTICK_ViewportsOnly: Controller's don't tick
  >   - Enabled by setting World::bPlayersOnlyPending = true which will update World::bPlayersOnly to true
  >     - Right now only happens in the cheatmanager
  >   - Different than calling GameMode::SetPause() as it will tick all actors as normal but will check their ShouldTickViewportOnly()
  > - LEVELTICK_PauseTick:
  >   - Set thorugh worldsettings->Pauser != nullptr & TimeSeconds >= PauseDelay
  >   - You need to set World::PauseDelay = 0
  > - NOTE: Oculus might be doing something dumb with overriding maxfps when paused

### TODO

~~ProcessDetermineSubTickType~~
~~ABBWorldSettings::FixupDeltaSeconds~~

- ~~Conditions for simtick~~
  - ~~Server~~
    - ~~AdvanceSimTick: If we have input from both clients~~
    - ~~Block otherwise: block~~
  - ~~Client~~
    - ~~Max Frame we can predict to: LastSyncAckFrame + MaxPredictionBuffer~~
    - ~~If past maxframe: block~~
  - ~~Block Logic:~~
    - ~~deltaT = 0~~
    - ~~bPlayersOnlyPending / bPlayersOnly = true~~
    - ~~Set pause: `WorldSettings->Pauser = PC->PlayerState;`~~
    - ~~UnpausedTimeSeconds += WorldSettings::Fixup()~~
      - ~~Might need to udpate World::UnpausedTimeSeconds as TickFunctions that have b.TickEvenWhenPaused will use this as their DeltaT~~ ***Note needed; ClampedDeltaT is used to update UnpausedTimeSeconds***
    - ~~DeltaTimeSeconds = WorldSettings::Fixup()~~
    - ~~TimeSeconds += !Paused ? DeltaSeconds : 0;~~
    - ~~Possibly set something so LaunchEngineLoop::ShouldUseIdleMode() returns true~~
    - ~~You need to set World::PauseDelay = 0~~

~~NOTE: bIdleMode/LaunchEngineLoop::ShouldUseIdleMode()/Pausing might prevent input processing~~

~~IsStalledOnPrediction()~~
~~UtilUE_NeedToStallTimeUpdate~~
  ~~HasPendingNetFrameSync()~~
  ~~GetBBGameTimeSeconds()~~
  ~~GetBBGameTimeDeltaSeconds()~~
  ~~GetBBRealTimeSeconds()~~
  ~~GetBBRealTimeDeltaSeconds()~~
~~simComp.SubTickType~~
~~GetEngineGameTickVFN()~~

## Deferred Actions

FESNextEngineTickDeferredActn_ReturnSequenceActorToPool => Move to SimTick

UtilInt_ProcessProcessDeferredEngTickActions() => split this to be process net sync barriers and other stuff
Util_QueueStateTransitionOnCondVarSignal
UtilUE_QueNxtEngineTickEngineActn() => Split into purely sync barrier stuff
UtilUE_QueNxtSimTickAction() => re-evaluate
Util_QueueStateTransition() => Re-eval
ProcessDeferredSimTickActions(): Separate deferred actions from nextsimtick deferred (need to happen inside rollforth) vs nextEngineTick (ue4 stuff)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

## Refactor NetDriver
UtilRPC_ReceiveReplayFrameHistory

FESNetReplayLog
  ~~FESMachineConnectionComp::NetReplayLog~~
  ~~Util_RequestNetRPCSync~~
  Util_RequestWaitForServerConfirmSFN

  ~~ProcessNetworkSend~~
  ~~ProcessConfirmServerNetReplay~~
  ~~UtilRPC_ReceiveReplNetMsgs~~
  ~~UtilRPC_ReceiveReplayFrameHistory~~
  ~~Util_GetReplaySnapshot~~
  ~~UtilInt_NetSync*~~



## Network Stream Thread

NetworkLogWrapper:
Indexed on EngineTick? SimTick? Command Frame?

- QueueRecievedCommandFrames
- QueueSendCommandFrames
- QueueNetControlRcvdMessages
- QueueNetControlToSendMessages


    struct FBBNetworkStream {
        TCircularQueue<FReceivedPacket> NetCtrlRPCMsgSendQueue;
        TCircularQueue<FReceivedPacket> NetCtrlRPCMsgRcvQueue;
        FESNetReplayLog NetCmdFrameLogRcvAuthoratative;
        FESNetReplayLog NetCmdFrameLogSend;
    };
    FORCEINLINE       FFxdArray_RpcCtrlDispatchMsg::Type& GetPendingNetSendMsgs()       { return PendingNetSendMsgsWrapper.Values; }
        FORCEINLINE const FFxdArray_RpcCtrlDispatchMsg::Type& GetPendingNetSendMsgs() const { return PendingNetSendMsgsWrapper.Values; }
        FORCEINLINE       FFxdArray_RpcCtrlDispatchMsg::Type& GetPendingNetRcvdMsgs()       { return PendingNetRcvdMsgsWrapper.Values; }
        FORCEINLINE const FFxdArray_RpcCtrlDispatchMsg::Type& GetPendingNetRcvdMsgs() const { return PendingNetRcvdMsgsWrapper.Values; }

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Code Hygiene

Remove these singleton accessor functions and pass explicit components

- FESCommandFrame
- UtilUE_MarkRagdollTargetHit
- Util_InitializeFrameLog
- entityAdmin->GetSimStateComp()
- GetSngltnComp() & also uses of singletonComp directly
- Util_GetDeltaVCNT
- UtilInt_GetLocalMachineConnInfo
- UtilInt_IsLocalMachineSyncSignaled
- UtilInt_GetMachConnInfo
- Util_BroadcastSyncSignalForLocalMachine
- ~~ProcessDetermineSubTickType~~
- Util_QueueStateTransition
- UtilInput_Replay*
- Util_GetLocalMCID
- BUG: Need to display "Waiting to connect" & "Press Enter to Start" messages
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *


ProcessSyncAckAuthCmdFramesAndRollback

UEFSComp.BBMatchStartGameTimeSeconds = UEFSComp.BBGameTimeSeconds - FBBSimFCNT::One.ToDurSec();
UtilInt_MarkInitialCommandFrame
WaitToStartLoopTick





















## EngineTick Processing: Out of Rollback/Rollforth Stuff

- OnEngineTickStart:

  - Process NetStream::QueuedRcvdNetCtrlRPCs

    NetControlRPCs: These exist out of command frame rollforth/rollback. They conceptually are really RPCs/events

    - Notify Desync and hard sync flush. Ex: One machine is too far out of wack and we need to send down fullstate
    - Notify disconnection
    - Notify rematch request

  - Process NetworkStream::QueuedRecievedCommandFrame

- Syncing
  - ClientIntroEnded: Block until both clients authoratatively reached this frame number
  - ClientCountdownEnded: Block until both clients authoratatively reached this frame number
  - ClientSpecialStarted/ClientTransitionStart: Block & don't predict across this frame (Wait for authoratative commandframe)
    - Time dilate until then
  - ClientSpecialEnded/ClientTransitionEnded: Block & don't predict across this frame (Wait for authoratative commandframe)
    - Time dilate until then

Ex: Special Attack lands

- Cient
  - Block until confirmation
  - Dont predict forward
  - On Confirm:
    - Start Cinematic playing
    - On Finished:
      - Send Signal Finished
      - Block Until Server Confirms Both Players Are Ready
  - On Disconfirm:
    - Rollback handles it normally
- Server
  - Sim as usual
  - On Detect Special Cinematic Command Frame:
    - Block by Wait For Input for Cinematic Started (the next frame)
    - Keep Sending Data Until Ack Rcv From both clients

## ECS Main Tick Loop

UEngine::SetCustomTimeStep(UEngineCustomTimeStep\* InCustomTimeStep)

- Move logic from ABBWorldSettings::FixupDeltaSeconds()
- Move logic from ProcessStartEngineTick()

  bool UEngine::SetTimecodeProvider(UTimecodeProvider\* InTimecodeProvider)

EBBSimTickType::RollForthReplayPredict

- Used in ProcessStartRollforthSubTick & ProcessApplyReplayState
- Extract the if statement logic to be in the mainloop

ProcessStartRollforthSubTick() => Rename to Calculate MatchCurSFN/VFN

* * *

# Cleanup

Code convention:

- UtilInt\_\* => internal only helper function to an ECS Manager
- UtilUE\_\* => Helper function to deal with UE4
- UtilUEd\_ => Editor helper function
