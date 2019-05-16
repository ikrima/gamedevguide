==========================================

GaurdedMainLoop

-------------------------------------------

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

GEngine-&gt;Init() or GEditor-&gt;InitEditor()

FCoreDelegates::OnPostEngineInit.Broadcast();

IProjectManager:LoadModulesForProject(ELoadingPhase::PostEngineInit))

IPluginManager::LoadModulesForEnabledPlugins(ELoadingPhase::PostEngineInit))

 

FEngineLoop.Init() (or call FEngineLoop.EditorInit() in editor mode which basically calls .Init())

GEngine-&gt;Init()

UBBUnrealEdEngine::Init()

UEditorEngine::InitEditor(InEngineLoop) C++ Symbols loaded.

UEditorEngine::Init(InEngineLoop=0x00007ff691bd2580) C++ Symbols loaded.

UUnrealEdEngine::Init(InEngineLoop) C++ Symbols loaded.

UEngine::OnPostEngineInit.Broadcast();

FCoreDelegates::OnPostEngineInit.Broadcast();

IProjectManager:LoadModulesForProject(ELoadingPhase::PostEngineInit))

IPluginManager::LoadModulesForEnabledPlugins(ELoadingPhase::PostEngineInit))

 

GEngine-&gt;Start()

(For game engine Only) GameInstance-&gt;StartGameInstance()

GetMoviePlayer()-&gt;WaitForMovieToFinish();

GEngine-&gt;StartHardwareSurvey();

FCoreDelegates::StarvedGameLoop.BindStatic(&GameLoopIsStarved);

FThreadHeartBeat::Get().Start();

FCoreDelegates::OnFEngineLoopInitComplete.Broadcast();

 

FEngineLoop::Tick()

FThreadHeartBeat::Get().HeartBeat(true);

FGameThreadHitchHeartBeat::Get().FrameStart();

ActiveProfiler-&gt;FrameSync();

 

{

STAT\_FrameTime

 

FCoreDelegates::OnBeginFrame.Broadcast();

 

ENQUEUE\_BeginFrame {

FRealtimeGPUProfiler::BeginFrame/FD3DGPUProfiler.BeginFrame()

::This is where Frame event is marked

FCoreDelegates::OnBeginFrameRT.Broadcast();

}

}

 

FStats::AdvanceFrame

 

{

STAT\_FrameTime

 

SlateApp.PollGameDeviceState();

GEngine-&gt;Tick()

GDistanceFieldAsyncQueue-&gt;ProcessAsyncTasks();

FSlateApplication::Get().Tick() {

STAT\_SlateTickTime

 

TickPlatform/TickApplication/DrawWindows

ENQUEUE\_SlateDrawWindowsCommand {

DrawWindow\_RenderThread

}

}

 

{

STAT\_DeferredTickTime

 

FTicker::GetCoreTicker().Tick(FApp::GetDeltaTime());

FThreadManager::Get().Tick();

GEngine-&gt;TickDeferredCommands();

}

 

FCoreDelegates::OnEndFrame.Broadcast();

 

ENQUEUE\_EndFrame {

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

GLog-&gt;TearDown();
