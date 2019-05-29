---
sortIndex: 1
---

GaurdedMainLoop

* * *

```cpp
FCoreDelegates::GetPreMainInitDelegate().Broadcast()

FEngineLoop::PreInit: Sets up lots of init like project paths and parses commandline

see if it needs to run commandlets, etc

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

PlayMovie() or FPlatformMisc::PlatformHandleSplashScreen()

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

UEditorEngine::Init(InEngineLoop=0x00007ff691bd2580) C++ Symbols loaded.

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

FStats::AdvanceFrame

{

STAT_FrameTime

SlateApp.PollGameDeviceState();

GEngine->Tick()

GDistanceFieldAsyncQueue->ProcessAsyncTasks();

FSlateApplication::Get().Tick() {

STAT_SlateTickTime

TickPlatform/TickApplication/DrawWindows

ENQUEUE_SlateDrawWindowsCommand {

DrawWindow_RenderThread

}

}

{

STAT_DeferredTickTime

FTicker::GetCoreTicker().Tick(FApp::GetDeltaTime());

FThreadManager::Get().Tick();

GEngine->TickDeferredCommands();

}

FCoreDelegates::OnEndFrame.Broadcast();

ENQUEUE_EndFrame {

FCoreDelegates::OnEndFrameRT.Broadcast();

FRealtimeGPUProfiler::EndFrame()/FD3DGPUProfiler.EndFrame()

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
