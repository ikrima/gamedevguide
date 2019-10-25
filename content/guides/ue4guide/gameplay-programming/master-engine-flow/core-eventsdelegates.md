---
sortindex: 5
---

# Editor Delegates

Located in `FEditorDelegates`

```cpp
/** Sent when a PIE session is beginning (before we decide if PIE can run - allows clients to avoid blocking PIE) */
  static FOnPIEEvent PreBeginPIE;
  /** Sent when a PIE session is beginning (but hasn't actually started yet) */
  static FOnPIEEvent BeginPIE;
  /** Sent when a PIE session has fully started and after BeginPlay() has been called */
  static FOnPIEEvent PostPIEStarted;
  /** Sent when a PIE session is ending, before anything else happens */
  static FOnPIEEvent PrePIEEnded;
  /** Sent when a PIE session is ending */
  static FOnPIEEvent EndPIE;


/** Called before SaveWorld is processed */
static FOnPreSaveWorld PreSaveWorld;
/** Called after SaveWorld is processed */
static FOnPostSaveWorld PostSaveWorld;


struct ENGINE_API FEditorSupportDelegates
{
  /** delegate type for when the editor is about to cleanse an object that *must* be purged ( Params: UObject* Object ) */
  DECLARE_MULTICAST_DELEGATE_OneParam(FPrepareToCleanseEditorObject, UObject*);
  /** delegate type for force property window rebuild events ( Params: UObject* Object ) */
  DECLARE_MULTICAST_DELEGATE_OneParam(FOnForcePropertyWindowRebuild, UObject*);
  /** delegate type for material texture setting change events ( Params: UMaterialIterface* Material ) */
  DECLARE_MULTICAST_DELEGATE_OneParam(FOnMaterialTextureSettingsChanged, class UMaterialInterface*);
  /** delegate type for windows messageing events ( Params: FViewport* Viewport, uint32 Message )*/
  DECLARE_MULTICAST_DELEGATE_TwoParams(FOnWindowsMessage, class FViewport*, uint32);
  /** delegate type for material usage flags change events ( Params: UMaterial* material, int32 FlagThatChanged ) */
  DECLARE_MULTICAST_DELEGATE_TwoParams(FOnMaterialUsageFlagsChanged, class UMaterial*, int32);
  /** delegate type for vector parameter default change event */
  DECLARE_MULTICAST_DELEGATE_ThreeParams(FOnVectorParameterDefaultChanged, class UMaterialExpression*, FName, const FLinearColor&);
  /** delegate type for scalar parameter default change event */
  DECLARE_MULTICAST_DELEGATE_ThreeParams(FOnScalarParameterDefaultChanged, class UMaterialExpression*, FName, float);

  /** Called when all viewports need to be redrawn */
  static FSimpleMulticastDelegate RedrawAllViewports;
  /** Called when the editor is about to cleanse an object that *must* be purged (such as when changing the active map or level) */
  static FPrepareToCleanseEditorObject PrepareToCleanseEditorObject;
  /** Called when the editor is cleansing of transient references before a map change event */
  static FSimpleMulticastDelegate CleanseEditor;
  /** Called when the world is modified */
  static FSimpleMulticastDelegate WorldChange;
  /** Sent to force a property window rebuild */
  static FOnForcePropertyWindowRebuild ForcePropertyWindowRebuild;
  /** Sent when events happen that affect how the editors UI looks (mode changes, grid size changes, etc) */
  static FSimpleMulticastDelegate UpdateUI;
  /** Called for a material after the user has change a texture's compression settings.
    Needed to notify the material editors that the need to reattach their preview objects */
  static FOnMaterialTextureSettingsChanged MaterialTextureSettingsChanged;
  /** Refresh property windows w/o creating/destroying controls */
  static FSimpleMulticastDelegate RefreshPropertyWindows;
  /** Sent before the given windows message is handled in the given viewport */
  static FOnWindowsMessage PreWindowsMessage;
  /** Sent after the given windows message is handled in the given viewport */
  static FOnWindowsMessage PostWindowsMessage;
  /** Sent after the usages flags on a material have changed*/
  static FOnMaterialUsageFlagsChanged MaterialUsageFlagsChanged;
  /** Sent after vector param default changed */
  static FOnVectorParameterDefaultChanged VectorParameterDefaultChanged;
  /** Sent after scalar param default changed */
  static FOnScalarParameterDefaultChanged ScalarParameterDefaultChanged;

};
```

# FCoreDelegates

Located in `CoreDelegates.h`

## Application/Engine Lifetime

```cpp
  // Callback for platform specific very early init code.
  DECLARE_MULTICAST_DELEGATE(FOnPreMainInit);
  static FOnPreMainInit& GetPreMainInitDelegate();

  /** Sent when GConfig is finished initializing */
  DECLARE_MULTICAST_DELEGATE(FConfigReadyForUse);
  static FConfigReadyForUse ConfigReadyForUse;

  // Called when appInit is called, very early in startup
  static FSimpleMulticastDelegate OnInit;

  // Called at the end of UEngine::Init, right before loading PostEngineInit modules for both normal execution and commandlets
  static FSimpleMulticastDelegate OnPostEngineInit;

  // Called at the very end of engine initialization, right before the engine starts ticking. This is not called for commandlets
  // 'if (GIsRunning)' => to test whether OnEngineInitComplete has already finished
  static FSimpleMulticastDelegate OnFEngineLoopInitComplete;

  // Called when the application is about to exit.
  static FSimpleMulticastDelegate OnExit;

  // Called when before the application is exiting.
  static FSimpleMulticastDelegate OnPreExit;

  // This is called when the application is about to be deactivated (e.g., due to a phone call or SMS or the sleep button).
  // The game should be paused if possible, etc...
  static FApplicationLifetimeDelegate ApplicationWillDeactivateDelegate;

  // Called when the application has been reactivated (reverse any processing done in the Deactivate delegate)
  static FApplicationLifetimeDelegate ApplicationHasReactivatedDelegate;

  // This is called when the application is being backgrounded (e.g., due to switching
  // to another app or closing it via the home button)
  // The game should release shared resources, save state, etc..., since it can be
  // terminated from the background state without any further warning.
  static FApplicationLifetimeDelegate ApplicationWillEnterBackgroundDelegate; // for instance, hitting the home button

                                        // Called when the application is returning to the foreground (reverse any processing done in the EnterBackground delegate)
  static FApplicationLifetimeDelegate ApplicationHasEnteredForegroundDelegate;

  // This *may* be called when the application is getting terminated by the OS.
  // There is no guarantee that this will ever be called on a mobile device,
  // save state when ApplicationWillEnterBackgroundDelegate is called instead.
  static FApplicationLifetimeDelegate ApplicationWillTerminateDelegate;

  DECLARE_MULTICAST_DELEGATE(FApplicationRequestAudioState);
  static FApplicationRequestAudioState ApplicationRequestAudioState;

  // Called when the OS is running low on resources and asks the application to free up any cached resources, drop graphics quality etc.
  static FApplicationLifetimeDelegate ApplicationShouldUnloadResourcesDelegate;

  DECLARE_MULTICAST_DELEGATE_OneParam(FApplicationStartupArgumentsDelegate, const TArray<FString>&);

  // Called with arguments passed to the application on statup, perhaps meta data passed on by another application which launched this one.
  static FApplicationStartupArgumentsDelegate ApplicationReceivedStartupArgumentsDelegate;

// called when the user grants permission to register for remote notifications
  static FApplicationRegisteredForRemoteNotificationsDelegate ApplicationRegisteredForRemoteNotificationsDelegate;

  // called when the user grants permission to register for notifications
  static FApplicationRegisteredForUserNotificationsDelegate ApplicationRegisteredForUserNotificationsDelegate;

  // called when the application fails to register for remote notifications
  static FApplicationFailedToRegisterForRemoteNotificationsDelegate ApplicationFailedToRegisterForRemoteNotificationsDelegate;

  // called when the application receives a remote notification
  static FApplicationReceivedRemoteNotificationDelegate ApplicationReceivedRemoteNotificationDelegate;

  // called when the application receives a local notification
  static FApplicationReceivedLocalNotificationDelegate ApplicationReceivedLocalNotificationDelegate;

  // called when the application receives notice to perform a background fetch
  static FApplicationPerformFetchDelegate ApplicationPerformFetchDelegate;

  // called when the application receives notice that a background download has completed
  static FApplicationBackgroundSessionEventDelegate ApplicationBackgroundSessionEventDelegate;

  /** Sent when a device screen orientation changes */
  DECLARE_MULTICAST_DELEGATE_OneParam(FApplicationReceivedOnScreenOrientationChangedNotificationDelegate, int32);
  static FApplicationReceivedOnScreenOrientationChangedNotificationDelegate ApplicationReceivedScreenOrientationChangedNotificationDelegate;

  // Called when an application is notified that the application license info has been updated.
  // The new license data should be polled and steps taken based on the results (i.e. halt application if license is no longer valid).
  DECLARE_MULTICAST_DELEGATE(FApplicationLicenseChange);
  static FApplicationLicenseChange ApplicationLicenseChange;
```

## Streaming

```cpp
// Callback for platform handling when flushing async loads.
  DECLARE_MULTICAST_DELEGATE(FOnAsyncLoadingFlush);
  static FOnAsyncLoadingFlush OnAsyncLoadingFlush;

  // Callback for a game thread interruption point when a async load flushing. Used to updating UI during long loads.
  DECLARE_MULTICAST_DELEGATE(FOnAsyncLoadingFlushUpdate);
  static FOnAsyncLoadingFlushUpdate OnAsyncLoadingFlushUpdate;

  // Callback on the game thread when an async load is started. This goes off before the packages has finished loading
  DECLARE_MULTICAST_DELEGATE_OneParam(FOnAsyncLoadPackage, const FString&);
  static FOnAsyncLoadPackage OnAsyncLoadPackage;

  DECLARE_MULTICAST_DELEGATE_OneParam(FOnSyncLoadPackage, const FString&);
  static FOnSyncLoadPackage OnSyncLoadPackage;

  // Called when an error occurred.
  static FSimpleMulticastDelegate OnShutdownAfterError;
```

## Rendering

```cpp
// Called at the beginning of a frame
static FSimpleMulticastDelegate OnBeginFrame;

// Called at the end of a frame
static FSimpleMulticastDelegate OnEndFrame;

// Called at the beginning of a frame on the renderthread
static FSimpleMulticastDelegate OnBeginFrameRT;

// Called at the end of a frame on the renderthread
static FSimpleMulticastDelegate OnEndFrameRT;

DECLARE_MULTICAST_DELEGATE_TwoParams(FOnSystemResolutionChanged, uint32 /*ResX*/, uint32 /*ResY*/);
static FOnSystemResolutionChanged OnSystemResolutionChanged;

/** Sent just after the rendering thread has been created. */
static FRenderingThreadChanged PostRenderingThreadCreated;
/* Sent just before the rendering thread is destroyed. */
static FRenderingThreadChanged PreRenderingThreadDestroyed;
```

## VR Specific

```cpp
/** Sent when the platform needs the user to fix headset tracking on startup (PS4 Morpheus only) */
  DECLARE_MULTICAST_DELEGATE(FVRHeadsetTrackingInitializingAndNeedsHMDToBeTrackedDelegate);
  static FVRHeadsetTrackingInitializingAndNeedsHMDToBeTrackedDelegate VRHeadsetTrackingInitializingAndNeedsHMDToBeTrackedDelegate;

  /** Sent when the platform finds that needed headset tracking on startup has completed (PS4 Morpheus only) */
  DECLARE_MULTICAST_DELEGATE(FVRHeadsetTrackingInitializedDelegate);
  static FVRHeadsetTrackingInitializedDelegate VRHeadsetTrackingInitializedDelegate;

  /** Sent when the platform requests a low-level VR recentering */
  DECLARE_MULTICAST_DELEGATE(FVRHeadsetRecenter);
  static FVRHeadsetRecenter VRHeadsetRecenter;

  /** Sent when connection to VR HMD is lost */
  DECLARE_MULTICAST_DELEGATE(FVRHeadsetLost);
  static FVRHeadsetLost VRHeadsetLost;

  /** Sent when connection to VR HMD is restored */
  DECLARE_MULTICAST_DELEGATE(FVRHeadsetReconnected);
  static FVRHeadsetReconnected VRHeadsetReconnected;

  /** Sent when connection to VR HMD connection is refused by the player */
  DECLARE_MULTICAST_DELEGATE(FVRHeadsetConnectCanceled);
  static FVRHeadsetConnectCanceled VRHeadsetConnectCanceled;

  /** Sent when the VR HMD detects that it has been put on by the player. */
  DECLARE_MULTICAST_DELEGATE(FVRHeadsetPutOnHead);
  static FVRHeadsetPutOnHead VRHeadsetPutOnHead;

  /** Sent when the VR HMD detects that it has been taken off by the player. */
  DECLARE_MULTICAST_DELEGATE(FVRHeadsetRemovedFromHead);
  static FVRHeadsetRemovedFromHead VRHeadsetRemovedFromHead;

  /** Sent when a 3DOF VR controller is recentered */
  DECLARE_MULTICAST_DELEGATE(FVRControllerRecentered);
  static FVRControllerRecentered VRControllerRecentered;
```


## Error

```cpp
  // Called when displaying on screen messages (like the "Lighting needs to be rebuilt"), to let other systems add any messages as needed
  // Sample Usage:
  // void GetMyOnScreenMessages(FCoreDelegates::FSeverityMessageMap& OutMessages)
  // {
  //		OutMessages.Add(FCoreDelegates::EOnScreenMessageSeverity::Info, FText::Format(LOCTEXT("MyMessage", "My Status: {0}"), SomeStatus));
  // }
  DECLARE_MULTICAST_DELEGATE_OneParam(FGetOnScreenMessagesDelegate, FSeverityMessageMap&);
  static FGetOnScreenMessagesDelegate OnGetOnScreenMessages;

  // Callback when an ensure has occurred
  static FOnHandleSystemEnsure OnHandleSystemEnsure;
  // Callback when an error (crash) has occurred
  static FOnHandleSystemError OnHandleSystemError;

  /** called when the main loop would otherwise starve. */
  DECLARE_DELEGATE(FStarvedGameLoop);
  static FStarvedGameLoop StarvedGameLoop;

  // Called to request that systems free whatever memory they are able to. Called early in LoadMap.
  // Caller is responsible for flushing rendering etc. See UEngine::TrimMemory
  static FSimpleMulticastDelegate& GetMemoryTrimDelegate();

  // Called when OOM event occurs, after backup memory has been freed, so there's some hope of being effective
  static FSimpleMulticastDelegate& GetOutOfMemoryDelegate();
```

# FGameDelegates

```cpp
DEFINE_GAME_DELEGATE_TYPED(EndPlayMapDelegate, FSimpleMulticastDelegate);
DEFINE_GAME_DELEGATE_TYPED(PendingConnectionLostDelegate, FSimpleMulticastDelegate);
DEFINE_GAME_DELEGATE(PreCommitMapChangeDelegate);
DEFINE_GAME_DELEGATE_TYPED(PostCommitMapChangeDelegate, FSimpleMulticastDelegate);
```

# FCoreUObjectDelegates

Located in `UObjectGlobals`

```cpp
// Called when any object is modified at all
  static FOnObjectModified OnObjectModified;

  // Called before a property is changed
    static FOnPreObjectPropertyChanged OnPreObjectPropertyChanged;
  // Called when a property is changed
    static FOnObjectPropertyChanged OnObjectPropertyChanged;


  // Set of objects modified this frame, to prevent multiple triggerings of the OnObjectModified delegate.
  static TSet<UObject*> ObjectsModifiedThisFrame;
// Sent at the very beginning of LoadMap
  DECLARE_MULTICAST_DELEGATE_OneParam(FPreLoadMapDelegate, const FString& /* MapName */);
  static FPreLoadMapDelegate PreLoadMap;

  // Sent at the _successful_ end of LoadMap & after LoadedWorld->BeginPlay()
  DECLARE_MULTICAST_DELEGATE_OneParam(FPostLoadMapDelegate, UWorld* /* LoadedWorld */);
  static FPostLoadMapDelegate PostLoadMapWithWorld;
```

# FWorldDelegates

Located in `World.h`

```cpp

    // NOTE: Called for each UWorld at the top, before networking drivers tick/network receive. Gets called with undilated/unclamped delta time
  FWorldDelegates::OnWorldTickStart;
  // Note: This gets dilated/clamped delta time and called after networking/initial uworld frame setup. Aka this is right before actors can start icking
  FWorldDelegates::OnWorldPreActorTick;
  // NOTE: This gets called right before netdrivers do TickFlush() aka right before all the replication send magic happens
  FWorldDelegates::OnWorldPostActorTick;

  // Gets called in UWorldConstructor()
  FWorldDelegates::OnPostWorldCreation;
  // Called at start of UWorld::InitWorld(), before UWorld managers are allocated/created (ie Physics scene, I system, Navigation system)
  FWorldDelegates::OnPreWorldInitialization;
  // Called at end of UWorld::InitWorld(), after UWorld managers are allocated/created (ie Physics scene, I system, Navigation system)
  // NOTE: Level Actors are loaded by here but using TActorRange<> won't work. You have to manually iterate the actors. Look at FindActorsOfClass
  FWorldDelegates::OnPostWorldInitialization;
  // Gets called near end of UWorld::InitializeActorsForPlay(), after level map got initialized ie SpawnServerActors(), Levels->RouteActorInitialize(),etc.
  // NOTE: Not called in editor loading process (will be called in PIE)
  FWorldDelegates::OnWorldInitializedActors
    - UWorld::OnActorsInitialized // Exact same as FWorldDelegates::OnWorldInitializedActors but bound to a UWorld object
    - UWorld::AreActorsInitialized() // Can use to check if the world is ready

  // Called at start of UWorld::CleanupWorld(), before world cleanup start
  FWorldDelegates::OnWorldCleanup;
  // Called at end of UWorld::CleanupWorld(), after world cleanup finishes
  FWorldDelegates::OnPostWorldCleanup;
  // Callback for world destruction (only called for initialized worlds)
  FWorldDelegates::OnPreWorldFinishDestroy;

#if WITH_EDITOR
  // Callback for world rename event (pre)
  static FWorldRenameEvent OnPreWorldRename;
#endif // WITH_EDITOR

  // Post duplication event.
  static FWorldPostDuplicateEvent OnPostDuplicate;

  // Sent when a ULevel is added to the world via UWorld::AddToWorld
  static FOnLevelChanged			LevelAddedToWorld;

  // Sent when a ULevel is removed from the world via UWorld::RemoveFromWorld or
  // LoadMap (a NULL object means the LoadMap case, because all levels will be
  // removed from the world without a RemoveFromWorld call for each)
  static FOnLevelChanged			LevelRemovedFromWorld;

  // Called after offset was applied to a level
  DECLARE_MULTICAST_DELEGATE_FourParams(FLevelOffsetEvent, ULevel*,  UWorld*, const FVector&, bool);
  static FLevelOffsetEvent		PostApplyLevelOffset;

  // called by UWorld::GetAssetRegistryTags()
  static FWorldGetAssetTags GetAssetTags;

#if WITH_EDITOR
  // Called when changes in the levels require blueprint actions to be refreshed.
  static FRefreshLevelScriptActionsEvent RefreshLevelScriptActions;
#endif
```

# Engine Delegates

Located in `Engine.h`

```cpp
/** Broadcasts when a world is added. */
  FWorldAddedEvent			WorldAddedEvent;

  /** Broadcasts when a world is destroyed. */
  FWorldDestroyedEvent		WorldDestroyedEvent;
private:

#if WITH_EDITOR

  /** Broadcasts whenever a world's actor list changes in a way not specifiable through other LevelActor__Events */
  FLevelActorListChangedEvent LevelActorListChangedEvent;

  /** Broadcasts whenever an actor is added. */
  FLevelActorAddedEvent LevelActorAddedEvent;

  /** Broadcasts whenever an actor is removed. */
  FLevelActorDeletedEvent LevelActorDeletedEvent;

  /** Broadcasts whenever an actor is attached. */
  FLevelActorAttachedEvent LevelActorAttachedEvent;

  /** Broadcasts whenever an actor is detached. */
  FLevelActorDetachedEvent LevelActorDetachedEvent;

  /** Broadcasts whenever an actor's folder has changed. */
  FLevelActorFolderChangedEvent LevelActorFolderChangedEvent;

  /** Broadcasts whenever an actor is being renamed */
  FLevelActorRequestRenameEvent LevelActorRequestRenameEvent;

  /** Broadcasts whenever a component is being renamed */
  FLevelComponentRequestRenameEvent LevelComponentRequestRenameEvent;

  /** Broadcasts after an actor has been moved, rotated or scaled */
  FOnActorMovedEvent		OnActorMovedEvent;

  /** Broadcasts after a component has been moved, rotated or scaled */
  FOnComponentTransformChangedEvent OnComponentTransformChangedEvent;

  /** Delegate broadcast after UEditorEngine::Tick has been called (or UGameEngine::Tick in standalone) */
  FPostEditorTick PostEditorTickEvent;

  /** Delegate broadcast when the editor is closing */
  FEditorCloseEvent EditorCloseEvent;
```
