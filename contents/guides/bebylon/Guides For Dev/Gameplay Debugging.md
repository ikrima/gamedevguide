# MISSING INSTRUCTIONS:

1. Copy BBR.natvis (C:\\ikrima\\src\\knl\\Bebylon\\Devops\\VS\\BBR.natvis)
1. Python tooling & devops project is a VSCode project Bebylon\\Devops\\devtooling.code-workspace
1. Remember to do `conda activate kl-py` in the terminal (I have a user_profile.cmd shortcut that sets this in terminals)
1. To run the ECS codegen: `Bebylon\Devops\BuildAutomation\BuildAutomation\CoreEngineExtensions\ESGenerator.py`
   1. There's also our hierchical statemachine codegen but you won't need to run that but for completion, its: `Bebylon\Devops\BuildAutomation\BuildAutomation\CoreEngineExtensions\SMGenerator.py`

# Starting Game/Playing

Development Toggles/Settings Overview

Bebylon menu in the editor is an entry point to the key configuration settings of the game
Most of them are also viewable in Editor->Project Settings -> Bebylon category

Utility.h has our asserts with varying levels of paranoia checking

# Playing The Game

The test map to use is: /Game/BebylonCore/Levels/1-Goldfingers/U-Master-Goldfingers

We use the ListenServer right now for multiplayer (with intention of making sure dedicated server works in next couple of months)

# Bebylon Project Settings

(accessible through Edit->Project Settings->Bebylon)

## Game Build Settings

These affect compilation flags for asserts. I have a UserBebylonEngine.ini file that sets developer specific settings (placed in Bebylon\\UnrealEngine\\BBR\\Config\\UserBebylonEngine.ini)

```ini
; IMPORANT: IMPORANT: IMPORANT: This is now set in code in .Target.cs
; IMPORANT: IMPORANT: IMPORANT: This is now set in code in .Target.cs
; IMPORANT: IMPORANT: IMPORANT: This is now set in code in .Target.cs
; These only control compiliation of features. Some features still need to be enabled
; still to actually use them (eg passing -mpenable=true for microprofile)
; This is for the bebylon custom engine wide changes
[/Script/BBR.BebylonBuildConfiguration]
;bBBLivePPEnabled=false
;bBBIGMemTraceEnabled=false
;bBBMicroProfileEnabled=true
;bBBExperimentalFeaturesEnabled=false

; These only control compiliation of features. Some features still need to be enabled
; still to actually use them (eg passing -mpenable=true for microprofile)
[/Script/BBR.BBGameBuildConfiguration]
BBTreatAssertLevelAsWarning=4
bBBUseDevMachineSettings=true
BBCompileAssertLevel=4
BBCompileParanoiaLevel=4
```

## General Game Settings

These have general types/singletons/etc. Also has our netcfg throttle settings

## Demo Settings

Settings for demo mode. The useful one here is bLocalMultiplayerMode = true (enabled by default) to enable cheat commands

## Developer Settings

Various dev flags such as whether to autobreak into the debugger for certain classes of asserts, whether to warn/prompt on ensures/etc

Most of the defaults here won't need to be changed

## Useful Console Commands

All of our console commands start with bb.

- Microprofile:
  - start with -mpenable=true in the commandline
  - Do a capture: bb.perf.MicroProfileCapture
  - Launch in-game profiler: bb.perf.MicroProfileLaunchWindow
  - Can also view it through chrome at: <http://localhost:1338/>

# In-Game Dev Tools

- Gameplay Debugger
  - Hit the ' (single quot) key to bring it up
  - Tab key to go into spectator fly mode
  - This shows a handful of state (Legend Statemachine, Machine Connection mask, etc)

# Code Overview

## ECS System

- We have a makeshift ECS system; wrote almost all of it over 3 weeks over xmas so lots of shortcuts and adding features as needed/went along
  - So if you encounter something that isn't intuitive or missing, probably not bc of arch decision but out of time constraint
  - Uses cog for codegen: <https://nedbatchelder.com/code/cog/>
- All ECS components are a PODs (with minor exceptions)
- Helper macros to snapshot stuff into VisLogger like ECSDBG_LOGMSG(), ECSDBG_COMPSAVE(), etc
  - Bebylon\\UnrealEngine\\BBR\\Source\\BBR\\Public\\Systems\\BBSystemsDbgTypes.h
- Each system is pure behavior, all state is in the components
- Attempted to keep most data mutation in one central place for each component type (eg FESVitalsManager is the only manager that updates vitals stats)

  - When other systems need to update/modify, generally they enqueue deferred PODs and the owning system operates on those
    - These action PODs are sumtypes/std::variant (codegen bc std::variant obviously wasn't available )

  - Ex: Player throws item

    - Player presses throw button
    - LegendSM Manager processes input into the hierarchical statemachine
      - Determines player's holding item and needs to throw it
      - Enqueues a deferred action FESItemManager::Util_MarkItemForThrow()
        - `InItemComp.PendingActn = FESItemDeferredActnSumType::EmplaceMake<FESItemDeferredActn_Throw>(LaunchOrigWS, ThrowDirWS);`
    - ItemManager processes pending actions during its Process() update

      ```cpp
      void FESItemManager::ProcessItems(const FESMatchStateComp& MatchStateComp) {
      ...
      // Process Deferred User Actions
      switch (ItemComp.PendingActn.VariantType)
      {
      case EVarType_ItemDeferredActn::Throw:
        {
            FESItemDeferredActn_Throw& throwData = ItemComp.PendingActn.GetVariant<FESItemDeferredActn_Throw>();
      ```

  - Reason is for code simplicity and also makes it easier to
    - Multithread later for perf (both going wide while processing entities but also overlap systems in parallel since can annotate read/writes)
    - Can coalesce modifications
      - Simplify resolution/skip unneeded work (eg if there's 30 bullet decals being spawned, can have the optimization/skip logic in one place where they get applied)
      - Slims down networking state (eg if 7 different things caused damage/vitals modification, all we need to snapshot for networking is the final delta of everything)

## Code Flow

- EBBMatchState is the match statemachine. The enum is defined in order of match states

  ```cpp
  enum class EBBMatchState : uint8
  {
    Uninitialized,
    WaitingForPlayersToJoinAndSync,
    InitializingLevelObjects,
    InitializedWaitingToStart,
    InitConnectToGamePurgatory, //Hacky state that does nothing until we separate connection states with matchstates
    Intro,
    Countdown,
    Fighting,
    TransitioningZone2,
    TransitioningZone3,
    Cinematic,
    PostMatch,
    Rematching,
    RematchingDenied,

    PlayerLoggedOut, // A player has left prematurely, like tears in the rain. Time to die.
    ShuttingDown
  };
  ```


- Server doesn't proceed forward until it's gotten input from both clients
- We don't predict across "big events" like start/finish of a cinematic
  - We wait until the move is confirmed,
  - then signal to clients to start the cinematic
  - Then wait on the server until clients have finished
  - We do this to avoid complexity of rolling back a lot of visual state/messy blueprint logic
- When we're waiting for input, we time dilate to 0.01%, effectively slowing down the render update
  - Using the new UEngineCustomTimeStep & UTimecodeProvider classes might be a cleaner mechanism to control this


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
- ProcessRcvdNetCtrlMsgs(): Manage network control messages
  - These are from the server that provide control (transition, wait for sync, etc)
  - Right now it's just used for EVarType_ReplMsg::NetSyncBarrierSignal && EVarType_ReplMsg::NetSyncBarrierRelease
- System: Update Time & Transient properties (e.g. IsNetSyncStalled, IsPureVisTick) && Process Deferred Transient Simulation/Engine Bookkeeping Actions
  - ProcessStartEngineTick
    - UtilInt_ProcessProcessDeferredEngTickActions(): UE4 engine actions that need to be processed
    - Util_SnapshotUE4FrameState(): Snapshot UE4 State like Controller input
  - ProcessReleaseNetSyncBarriers()
- ProcessConfirmServerNetReplay(): System: Network Sync: Confirm local moves with server moves and set misprediction frames
-

===============

# Cleanup

Note: Sometimes various functions are marked with UFUNCTION() soley to be exposed to the python tooling
entityAdmin.UtilDbg_IsDbgSingleStepping()
entityAdmin.UtilDbg_GetDbgNetOp()

HasPendingNetFrameSync()
