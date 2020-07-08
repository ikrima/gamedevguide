---
sidebar: ue4guide
---
## **Editor startup process**

```cpp
// Flow of the Editor startup process (Excerpt)
WinMain
  GuardedMain
    FEngineLoop::PreInit
      FEngineLoop::LoadCoreModules                      // CoreModuleのロード
      FEngineLoop::LoadPreInitModules                   // PreInitModuleのロード
      FEngineLoop::AppInit
      UDeviceProfileManager::InitializeCVarsForActiveDeviceProfile          // DeviceProfile Cvarのロード
      InitEngineTextLocalization                                            // Engineローカライズ処理
        ApplyDefaultCultureSettings
          FInternationalization::SetCurrentLanguageAndLocale                // Language/Locale設定
        FTextLocalizationManager::LoadLocalizationResourcesForCulture       // ローカライズリソースロード
          FTextLocalizationManager::LoadLocalizationResourcesForPrioritizedCultures
            FTextLocalizationManager::UpdateFromLocalizations
      FWindowsPlatformSplash::Show                      // Splash表示
      FInternationalization::LoadAllCultureData
        FICUInternationalization::LoadAllCultureData
      FShaderCompilingManager::FShaderCompilingManager  // (1) ShaderCompileWorker起動
      CompileGlobalShaderMap                            // (2) GlobalShaderMapのコンパイル
      CreateMoviePlayer                                 // 起動用MoviePlayer生成
      InitGameTextLocalization                          //     Gameローカライズ処理
      FModuleManager::LoadModule                        // (3) AssetRegistryのロード
      ProcessNewlyLoadedUObjects                        // (4) UObject/Enum/Struct/Propertyの初期化と登録
      LoadStartupCoreModules                            // (5) StartupCoreModuleのロード
      FProjectManager::LoadModulesForProject            // (6) LoadingScreenModuleのロード
      FPluginManager::LoadModulesForEnabledPlugins
      FPlatformMisc::PlatformHandleSplashScreen         //     SplashScreen表示
      FEngineLoop::LoadStartupModules                   // (7) StartupModuleのロード
      FUObjectArray::CloseDisregardForGC                //     DisregardForGCのClose
        FHighResScreenshotConfig::Init                  // (8) HighResScreenshotMaterialの初期化
    EditorInit
      FEngineLoop::Init                                 // (9) EngineLoopの初期化
        UUnrealEdEngine::Init
          UEditorEngine::Init
            UEditorEngine::InitEditor
              UEngine::Init
                UEngine::InitializeHMDDevice            // Device初期化
                UEngine::InitializeEyeTrackingDevice
                UEditorEngine::InitializeObjectReferences
                UEngine::InitializeAudioDeviceManager
            UGameUserSettings::LoadSettings
            UGameUserSettings::ApplySettings
          LoadPackage                                   // EditorResourceロード
      FUnrealEdMisc::OnInit                             // (10) その他の初期化
        FEditorFileUtils::LoadDefaultMapAtStartup
          FEditorFileUtils::LoadMap                     // DefaultMapロード (詳細は3.章参照)
      UEngine::Start
        FWindowsPlatformSplash::Hide                    // Splash非表示

```

*From <https://qiita.com/donbutsu17/items/be66551c48360d7b0864>*

<table><thead><tr class="header"><th><strong>#</strong></th><th><strong>Progress</strong></th><th><strong>Work</strong></th></tr></thead><tbody><tr class="odd"><td>1</td><td>00-09</td><td><p>Load TargetPlatformModule Load </p><p>Target Platform Module</p></td></tr><tr class="even"><td>2</td><td>10-39</td><td><p>Load </p><p>shader (.usf) included in compiled Enigne content of GlobalShaderMap</p></td></tr><tr class="odd"><td>3</td><td>40-44</td><td><p>Load AssetRegistry Load </p><p>all compiled properties (UStruct etc)</p></td></tr><tr class="even"><td>Four</td><td>45-49</td><td>Load resident object for DisregardForGC</td></tr><tr class="odd"><td>Five</td><td>50-59</td><td><p>Generation of LoadEngine </p><p>definition object of StartupCoreModule</p></td></tr><tr class="even"><td>6</td><td>60-69</td><td>Loading Loading Screen Module</td></tr><tr class="odd"><td>7</td><td>70-74</td><td><p>Generation of </p><p>object of load project definition of StartupModule</p></td></tr><tr class="even"><td>8</td><td>75-79</td><td>Initialization of HighResScreenshotMaterial</td></tr><tr class="odd"><td>9</td><td>80-89</td><td><p>Loading EngineLoop initialization </p><p>configuration file, etc.</p></td></tr><tr class="even"><td>Ten</td><td>90-100</td><td>Load other initialization boot map</td></tr></tbody></table>

*From <https://qiita.com/donbutsu17/items/be66551c48360d7b0864>*

### **LevelOpen processing**


```cpp
// Process flow when selecting Level asset from ContentBrowser by double-clicking (excerpt)
// ContentBrowserからLevelアセットをダブルクリックで選択した際の処理の流れ(抜粋)
SContentBrowser::OnAssetsActivated
  FAssetTypeActions_Base::AssetsActivated
    FAssetEditorManager::OpenEditorForAsset
      FEditorFileUtils::LoadMap                             // マップのロード開始
        UUnrealEdEngine::Exec
          UEditorEngine::Exec
            UEditorEngine::HandleMapCommand
              UEditorEngine::Map_Load
                UEditorEngine::EditorDestroyWorld           // 先に現在のWorldを破棄
                  UWorld::ClearWorldComponents
                    ULevel::ClearLevelComponents
                      AActor::UnregisterAllComponents       // 現在のWorldの全てのComponentを登録解除
                  UWorld::DestroyWorld
                    UWorld::CleanupWorld
                      UWorld::ClearWorldComponents
                        ULevel::ClearLevelComponents
                          AActor::UnregisterAllComponents   // 遷移先のWorldのComponentのリセット
                    UEngine::WorldDestroyed
                UWorld::UpdateWorldComponents               // 新しいWorldのComponent更新
                  ULevel::UpdateLevelComponents
                    ULevel::IncrementalUpdateComponents
                      AActor::PreRegisterAllComponents
                      AActor::RerunConstructionScripts
                        AActor::IncrementalRegisterComponents
                          AActor::RegisterAllActorTickFunctions
                          UActorComponent::RegisterComponentWithWorld
                    UWorld::UpdateCullDistanceVolumes
                UWorld::FlushLevelStreaming                 // 現在のWorld情報の更新
                  UWorld::UpdateLevelStreaming
                    ULevelStreaming::UpdateStreamingState
                      UWorld::AddToWorld                    // 新しいWorldのSubLevelを追加
                        ULevel::IncrementalUpdateComponents
                          SortActorsHierarchy
                          AActor::PreRegisterAllComponents
                          AActor::RerunConstructionScripts
                            AActor::IncrementalRegisterComponents
                              AActor::RegisterAllActorTickFunctions
                              UActorComponent::RegisterComponentWithWorld
                UEngine::WorldAdded
                CollectGarbage                              // クリーンアップ
        UUnrealEdEngine::Exec
          UEditorEngine::Exec
            UEditorEngine::HandleMapCommand
              UEditorEngine::Map_Check
ContentBrowserUtils::OpenEditorForAsset
```

*From <https://qiita.com/donbutsu17/items/be66551c48360d7b0864>*

### **PIE Processing**

```cpp
// PIE起動した際の処理の流れ(抜粋)
UEditorEngine::PlayInEditor
  UEditorEngine::CreatePIEGameInstance
    UGameInstance::InitializeForPlayInEditor
      UEditorEngine::CreatePIEWorldByDuplication
        UEditorEngine::PostCreatePIEWorld
          UWorld::InitWorld
    UGameInstance::StartPlayInEditorGameInstance
      UWorld::FlushLevelStreaming                           // AlwaysLoadedのSubLevelを起動
        UWorld::UpdateLevelStreaming
          ULevelStreaming::UpdateStreamingState
            UWorld::AddToWorld                              // SubLevel追加
              ULevel::IncrementalUpdateComponents
                AActor::PreRegisterAllComponents
                  AActor::RerunConstructionScripts
                    AActor::IncrementalRegisterComponents
                      AActor::RegisterAllActorTickFunctions
                        UActorComponent::RegisterComponentWithWorld
      UWorld::InitializeActorsForPlay
        ULevel::RouteActorInitialize
          AActor::PreInitializeComponents                   // World上の全Component登録
          AActor::InitializeComponents
            UActorComponent::Activate
            UActorComponent::InitializeComponent
          AActor::PostInitializeComponents
          AActor::UpdateOverlaps
      ULocalPlayer::SpawnPlayActor
        UWorld::SpawnPlayActor                              // Player生成
          AGameModeBase::Login
            AGameModeBase::SpawnPlayerController
              AGameModeBase::SpawnPlayerController
                AGameModeBase::SpawnPlayerControllerCommon
                  UGameplayStatics::FinishSpawningActor
                    AActor::FinishSpawning
                      AActor::ExecuteConstruction
                        AActor::ProcessUserConstructionScript
                          AActor::UserConstructionScript    // BP Construction Script
      UWorld::BeginPlay
        AGameStateBase::HandleBeginPlay
          AWorldSettings::NotifyBeginPlay                   // Worldに存在する全Actorの起動
            AActor::DispatchBeginPlay
              AActor::BeginPlay                             // Tick起動とComponent起動
                AActor::RegisterAllActorTickFunctions
                UActorComponent::RegisterAllComponentTickFunctions
                UActorComponent::BeginPlay
                AActor::ReceiveBeginPlay
```

*From <https://qiita.com/donbutsu17/items/be66551c48360d7b0864>*
