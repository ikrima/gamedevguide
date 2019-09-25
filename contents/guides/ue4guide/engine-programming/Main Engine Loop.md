---
sortIndex: 1
---

# Gaurded Main Loop

```cpp
FCoreDelegates::GetPreMainInitDelegate().Broadcast()

FEngineLoop::PreInit: Sets up lots of init like project paths and parses commandline see if it needs to run commandlets, etc
    FPlatformProcess::SetupGameThread()
    Initialize cvars, apply rendering cvars to initialize
    Sets up TaskGraph & ThreadPools
    FThreadStats::StartThread()
    LoadPreInitModules
    AppInit() - Initialize Application
      (At end) FCoreDelegates::OnInit.Broadcast();
    Setup MemoryAllocators and various
      FPlatformMisc::PlatformInit(), FPlatformApplicationMisc::Init(), FPlatformMemory::Init();
    InitGamePhys();
    FSlateApplication::Create();
    Compile shaders
    InitializeRenderer()/RHIInit
    LoadStartupCoreModules()
    StartRenderingThread()
    PlayMovie() or  FPlatformMisc::PlatformHandleSplashScreen()
    LoadStartupModules()
    if Running Commandlet
      GEngine->Init() or GEditor->InitEditor()
      FCoreDelegates::OnPostEngineInit.Broadcast();
      IProjectManager:LoadModulesForProject(ELoadingPhase::PostEngineInit))
      IPluginManager::LoadModulesForEnabledPlugins(ELoadingPhase::PostEngineInit))

FEngineLoop.Init() (or call FEngineLoop.EditorInit() in editor mode which basically calls .Init())
  GEngine->Init()
    UBBUnrealEdEngine::Init()
      UEditorEngine::InitEditor(InEngineLoop) C++ Symbols loaded.
        UEditorEngine::Init(InEngineLoop=0x00007ff691bd2580)    C++ Symbols loaded.
          UUnrealEdEngine::Init(InEngineLoop) C++ Symbols loaded.
  UEngine::OnPostEngineInit.Broadcast();
  FCoreDelegates::OnPostEngineInit.Broadcast();
  IProjectManager:LoadModulesForProject(ELoadingPhase::PostEngineInit))
  IPluginManager::LoadModulesForEnabledPlugins(ELoadingPhase::PostEngineInit))

  GEngine->Start()
    (For game engine Only) GameInstance->StartGameInstance()
  GetMoviePlayer()->WaitForMovieToFinish();
  GEngine->StartHardwareSurvey();
  FCoreDelegates::StarvedGameLoop.BindStatic(&GameLoopIsStarved);
  FThreadHeartBeat::Get().Start();
  FCoreDelegates::OnFEngineLoopInitComplete.Broadcast();

FEngineLoop::Tick()
  FThreadHeartBeat::Get().HeartBeat(true);
  FGameThreadHitchHeartBeat::Get().FrameStart();
  ActiveProfiler->FrameSync();

  {
    STAT_FrameTime

    FCoreDelegates::OnBeginFrame.Broadcast();

    ENQUEUE_BeginFrame {
      FRealtimeGPUProfiler::BeginFrame/FD3DGPUProfiler.BeginFrame()
        ::This is where Frame event is marked
      FCoreDelegates::OnBeginFrameRT.Broadcast();
    }
  }

  FStats::AdvanceFrame()
  {
      STAT_FrameTime

      SlateApp.PollGameDeviceState();

      GEngine->Tick()

        - Foreach UWorld(), do the following:
          TickWorldTravel() - Tick all travel & pending NetGames (Seamless, server, client)
          Uworld::Tick()
            FWorldDelegates::OnWorldTickStart.Broadcast(TickType, DeltaSeconds) - Called with DeltaSeconds that's FApp::GetDeltaTime()

            - Networking Recieve Logic
              BroadcastTickDispatch() - Entry point where client receives all network requests. Calls NetDriver::TickDispatch(). Look at [Low Level Networking Overview] for details
              BroadcastPostTickDispatch() - Mainly calls ReplicationDriver->PostTickDispatch();
              TickNetClient() - Does checks if the socket is closed and if it was, throw a network failure error

            - Logic To Calculate Clamped/Dilated GameTime
              - AWorldSettings::GetEffectiveTimeDilation()
              - AWorldSettings::FixupDeltaSeconds()

            CurrentLatentActionManager.BeginFrame()
            FWorldDelegates::OnWorldPreActorTick.Broadcast(this, TickType, DeltaSeconds) - Note: This gets dilated/clamped delta time

            - Foreach Level in UWorld::LevelCollection
              - FTiskTaskManagerInterface::StartFrame()
                - Queues up all the TickFunctions according to their dependency graph & TickGroup
                - Ticking within each group is done by a dependency graph (AddTickPrerequisite) of tick functions of various objects during TickFunction registration
                - This function might change what TickGroup something runs in according to the prerequisite tick function's tickgroup
                - Actor Components do not necessarily tick after their owner Actor
              - Calls RunTickGroup() for various tick groups which ticks component
              - GetTimerManager().Tick(DeltaSeconds)
              - FTickableGameObject::TickObjects() - ticks UObjects or anything that derives from FTickableGameObject (e.g. SceneCapturerCubes or LevelSequencePlayers )
              - Update cameras and streaming volumes
                - Foreach PlayerController: PlayerController->UpdateCameraManager(DeltaSeconds) or UpdateCameraPhotographyOnly();
                - ProcessLevelStreamingVolumes()
                - WorldComposition->UpdateStreamingState();
              - RunTickGroup(TG_PostUpdateWork)
              - RunTickGroup(TG_LastDemotable)
              - FTickTaskManagerInterface::Get().EndFrame()

            FWorldDelegates::OnWorldPostActorTick.Broadcast()

            - Networking Send Logic
              BroadcastTickFlush(RealDeltaSeconds)
                - Tick all net drivers/flush networking/Replicate Actors
                - Calls UNetDriver::TickFlush() where all the replication magic happens from client to everywhere else
              BroadcastPostTickFlush(RealDeltaSeconds)
                - Calls UNetDriver::PostTickFlush()
                  - UOnlineEngineInterface::ClearVoicePackets()

          USkyLightComponent::UpdateSkyCaptureContents()
          UReflectionCaptureComponent::UpdateReflectionCaptureContents()
          More Level Streaming Logic - i.e. BlockTillLevelStreamingCompleted()/UpdateLevelStreaming()/ConditionalCommoitMapChange()/etc -

        FTickableGameObject::TickObjects(nullptr, LEVELTICK_All, false, DeltaSeconds) - This gets called again with nullptr signifying it gets run after UWorlds
        MediaModule->TickPostEngine();
        GameViewport->Tick()
        RedrawViewports()
        GetRendererModule().PostRenderAllViewports() - Some tasks can only be done once we finish all scenes/viewports
        UpdateActiveAudioDevices(bIsAnyNonPreviewWorldUnpaused);
        ENQUEUE_RENDER_COMMAND(TickRenderingTimer) { GRenderingRealtimeClock.Tick(DeltaSeconds); GetRendererModule().TickRenderTargetPool(); }


      GShaderCompilingManager->ProcessAsyncResults()
      GDistanceFieldAsyncQueue->ProcessAsyncTasks()
      ProcessLocalPlayerSlateOperations()
      FSlateApplication::Get().Tick()
        TickPlatform/TickApplication/DrawWindows
        ENQUEUE_SlateDrawWindowsCommand { DrawWindow_RenderThread }

      RHITick( FApp::GetDeltaTime() ) - Update RHI
      FrameEndSync.Sync() - Sync game and render thread. Either total sync or allowing one frame lag.


      {
        STAT_DeferredTickTime

        FTicker::GetCoreTicker().Tick()
          - Ticks all objects of type FTickerObjectBase. Ex: FHttpManager, FAvfMediaPlayer, FVoiceCapture, FSteamSocketSubsystem)
          - This would be great place to add Objects that need to tick at the end of the frame that are engine/world agnostic
          - Good possible place for our own UDP network ticking replication
        FThreadManager::Get().Tick()
        GEngine->TickDeferredCommands()
      }

      FCoreDelegates::OnEndFrame.Broadcast();

      ENQUEUE_RENDER_COMMAND(EndFrame) {
        EndFrameRenderThread()
          FCoreDelegates::OnEndFrameRT.Broadcast();
          GPU_STATS_ENDFRAME(RHICmdList) aka FRealtimeGPUProfiler::EndFrame()/FD3DGPUProfiler.EndFrame()
          FPlatformMisc::EndNamedEvent();
      }
  }

FEngineLoop::Exit()
  GEngine::PreExit()
  FSlateApplication::Shutdown();
  AppPreExit()
    FCoreDelegates::OnPreExit.Broadcast();
    FCoreDelegates::OnExit.Broadcast();
    Destroy ThreadPools (GLargeThreadPool,GThreadPool,GBackgroundPriorityThreadPool,GIOThreadPool)
  TermGamePhys()
  StopRenderingThread();
  RHIExitAndStopRHIThread();
  FModuleManager::Get().UnloadModulesAtShutdown()
  DestroyMoviePlayer();
  FThreadStats::StopThread();
  FTaskGraphInterface::Shutdown();
  IStreamingManager::Shutdown();
  FPlatformMisc::ShutdownTaggedStorage();

FEngineLoop::AppExit()
  FPlatformApplicationMisc::TearDown();
  FPlatformMisc::PlatformTearDown();
  GLog->TearDown();
```
