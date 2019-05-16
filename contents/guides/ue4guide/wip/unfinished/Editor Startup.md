## **Editor startup process**

// Flow of the Editor startup process (Excerpt)  
WinMain  
GuardedMain  
FEngineLoop :: PreInit  
FEngineLoop :: LoadCoreModules // Load  
CoreModule FEngineLoop :: LoadPreInitModules // Load  
PreInitModule FEngineLoop :: AppInit  
UDeviceProfileManager :: InitializeCVarsForActiveDeviceProfile // Load  
DeviceProfile Cvar InitEngineTextLocalization / / Engine Localization Process  
ApplyDefaultCultureSettings  
FInternationalization :: SetCurrentLanguageAndLocale // Language / Locale Settings  
FTextLocalizationManager ::EruoeidieruoshieieruaizationResourcesForCulture // localized resource load  
FTextLocalizationManager :: EruoeidieruoshieieruaizuieitiaioenuaruiesuoyuarucesForPrioritizedCultures  
FTextLocalizationManager :: UpdateFromLocalizations  
FWindowsPlatformSplash :: Show // Splash display  
FInternationalization :: LoadAllCultureData  
FICUInternationalization :: LoadAllCultureData  
FShaderCompilingManager :: FShaderCompilingManager // (1) ShaderCompileWorker start  
CompileGlobalShaderMap // (2) GlobalShaderMap compilation of  
CreateMoviePlayer // Launch MoviePlayer generated  
InitGameTextLocalization // Game localization process  
FModuleManager :: LoadModule // (3) Load AssetRegistry  
ProcessNewlyLoadedUObjects // (4) Initialize and register  
UObject / Enum / Struct / Property LoadStartupCoreModules // (5) Load  
StartupCoreModule FProjectManager :: LoadModulesForProject // (6) Loading of  
LoadingScreenModule FPluginManager :: LoadModulesForEnabledPlugins  
FPlatformMisc :: PlatformHandleSplashScreen // SplashScreen display  
FEngineLoop :: LoadStartupModules // (7) Loading  
StartupModule FUObjectArray :: CloseDisregardForGC // DisregardForGC Close  
FHighResScreenshotConfig :: Init // (8) Initialize  
HighResScreenshotMaterial EditorInit  
FEngineLoop :: Init // (9) Initialize  
EngineLoop UUnrealEdEngine :: Init  
UEditorEngine :: Init  
UEditorEngine :: InitEditor  
UEngine :: Init  
UEngine :: InitializeHMDDevice // Device initialization  
UEngine :: AienuitializeEyeTrackingDevice  
UEditorEngine :: AinitializeObjectReferences  
UEngine :: AienuaitializeAudioDeviceManager  
UGameUserSettings :: LoadSettings  
UGameUserSettings :: ApplySettings  
LoadPackage // EditorResource load  
FUnrealEdMisc :: OnInit // (10) Other initialization  
FEditorFileUtils :: LoadDefaultMapAtStartup  
FEditorFileUtils :: LoadMap // Load DefaultMap (See Chapter 3.  
UEngine :: Start  
FWindowsPlatformSplash :: Hide // Hide Splash

*From &lt;<https://qiita.com/donbutsu17/items/be66551c48360d7b0864>>*

<table><thead><tr class="header"><th><strong>#</strong></th><th><strong>Progress</strong></th><th><strong>Work</strong></th></tr></thead><tbody><tr class="odd"><td>1</td><td>00-09</td><td><p>Load TargetPlatformModule Load </p><p>Target Platform Module</p></td></tr><tr class="even"><td>2</td><td>10-39</td><td><p>Load </p><p>shader (.usf) included in compiled Enigne content of GlobalShaderMap</p></td></tr><tr class="odd"><td>3</td><td>40-44</td><td><p>Load AssetRegistry Load </p><p>all compiled properties (UStruct etc)</p></td></tr><tr class="even"><td>Four</td><td>45-49</td><td>Load resident object for DisregardForGC</td></tr><tr class="odd"><td>Five</td><td>50-59</td><td><p>Generation of LoadEngine </p><p>definition object of StartupCoreModule</p></td></tr><tr class="even"><td>6</td><td>60-69</td><td>Loading Loading Screen Module</td></tr><tr class="odd"><td>7</td><td>70-74</td><td><p>Generation of </p><p>object of load project definition of StartupModule</p></td></tr><tr class="even"><td>8</td><td>75-79</td><td>Initialization of HighResScreenshotMaterial</td></tr><tr class="odd"><td>9</td><td>80-89</td><td><p>Loading EngineLoop initialization </p><p>configuration file, etc.</p></td></tr><tr class="even"><td>Ten</td><td>90-100</td><td>Load other initialization boot map</td></tr></tbody></table>

*From &lt;<https://qiita.com/donbutsu17/items/be66551c48360d7b0864>>*

### **LevelOpen processing**

// Process flow when selecting Level asset from ContentBrowser by double-clicking (excerpt)  
SContentBrowser :: OnAssetsActivated  
 FAssetTypeActions_Base :: AssetsActivated  
 FAssetEditorManager :: OpenEditorForAsset  
 FEditorFileUtils :: LoadMap // Start loading of map  
 UUnrealEdEngine :: Exec  
 UEditorEngine :: Exec  
 UEditorEngine :: HandleMapCommand  
 UEditorEngine :: Map_Load  
 UEditorEngine :: EditorDestroyWorld // Discard Current World  
 First UWorld :: ClearWorldComponents  
 ULevel ::ClearLevelComponents  
 AActor :: UnregisterAllComponents //  
 Unregister all components of the current World UWorld :: DestroyWorld  
 UWorld :: CleanupWorld  
 UWorld :: ClearWorldComponents  
 ULevel :: ClearLevelComponents  
 AActor :: UnregisterAllComponents // Reset destination World Component UEngine :: WorldDestroyed  
 UWorld :: UpdateWorldComponents // New World Component Update  
 ULevel :: UpdateLevelComponents  
 ULevel :: IncrementalUpdateComponents  
 AActor ::PreRegisterAllComponents  
 AActor :: RerunConstructionScripts  
 AActor :: AienushiaruementalRegisterComponents  
 AActor :: AruijiaisterAllActorTickFunctions  
 UActorComponent :: AruegisterComponentWithWorld  
 UWorld :: UpdateCullDistanceVolumes  
 UWorld :: FlushLevelStreaming of // the current World information update UWorld :: UpdateLevelStreaming  
 ULevelStreaming :: UpdateStreamingState  
 UWorld :: AddToWorld // new World of Add  
 SubLevel ULevel :: IncrementalUpdateComponents  
 SortActorsHierarchy  
 AActor :: PreRegisterAllComponents  
 AActor :: RerunConstructionScripts  
 AActor :: AienushiaruementalRegisterComponents  
 AActor :: AruijiaisterAllActorTickFunctions  
 UActorComponent :: AruegisterComponentWithWorld  
 UEngine :: WorldAdded  
 CollectGarbage // clean up  
 UUnrealEdEngine :: Exec  
 UEditorEngine :: Exec  
 UEditorEngine :: HandleMapCommand  
 UEditorEngine :: Map_Check  
 ContentBrowserUtils :: OpenEditorForAsset

*From &lt;<https://qiita.com/donbutsu17/items/be66551c48360d7b0864>>*

### **PIE Processing**

UEditorEngine::PlayInEditor
UEditorEngine::CreatePIEGameInstance
UGameInstance::InitializeForPlayInEditor
UEditorEngine::CreatePIEWorldByDuplication
UEditorEngine::PostCreatePIEWorld
UWorld::InitWorld
UGameInstance::StartPlayInEditorGameInstance
UWorld::FlushLevelStreaming // AlwaysLoaded の SubLevel を起動
UWorld::UpdateLevelStreaming
ULevelStreaming::UpdateStreamingState
UWorld::AddToWorld // SubLevel 追加
ULevel::IncrementalUpdateComponents
AActor::PreRegisterAllComponents
AActor::RerunConstructionScripts
AActor::IncrementalRegisterComponents
AActor::RegisterAllActorTickFunctions
UActorComponent::RegisterComponentWithWorld
UWorld::InitializeActorsForPlay
ULevel::RouteActorInitialize
AActor::PreInitializeComponents // World 上の全 Component 登録
AActor::InitializeComponents
UActorComponent::Activate
UActorComponent::InitializeComponent
AActor::PostInitializeComponents
AActor::UpdateOverlaps
ULocalPlayer::SpawnPlayActor
UWorld::SpawnPlayActor // Player 生成
AGameModeBase::Login
AGameModeBase::SpawnPlayerController
AGameModeBase::SpawnPlayerController
AGameModeBase::SpawnPlayerControllerCommon
UGameplayStatics::FinishSpawningActor
AActor::FinishSpawning
AActor::ExecuteConstruction
AActor::ProcessUserConstructionScript
AActor::UserConstructionScript // BP Construction Script
UWorld::BeginPlay
AGameStateBase::HandleBeginPlay
AWorldSettings::NotifyBeginPlay // World に存在する全 Actor の起動
AActor::DispatchBeginPlay
AActor::BeginPlay // Tick 起動と Component 起動
AActor::RegisterAllActorTickFunctions
UActorComponent::RegisterAllComponentTickFunctions
UActorComponent::BeginPlay
AActor::ReceiveBeginPlay

From [&lt;https://qiita.com/donbutsu17/items/be66551c48360d7b0864]\(<https://qiita.com/donbutsu17/items/be66551c48360d7b0864)>
