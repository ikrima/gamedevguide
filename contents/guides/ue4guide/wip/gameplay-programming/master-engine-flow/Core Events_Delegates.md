## Editor Delegates are in FEditorDelegates

/\*\* Sent when a PIE session is beginning (before we decide if PIE can run - allows clients to avoid blocking PIE) \*/

> static FOnPIEEvent PreBeginPIE;
>
> /\*\* Sent when a PIE session is beginning (but hasn't actually started yet) \*/
>
> static FOnPIEEvent BeginPIE;
>
> /\*\* Sent when a PIE session has fully started and after BeginPlay() has been called \*/
>
> static FOnPIEEvent PostPIEStarted;
>
> /\*\* Sent when a PIE session is ending, before anything else happens \*/
>
> static FOnPIEEvent PrePIEEnded;
>
> /\*\* Sent when a PIE session is ending \*/
>
> static FOnPIEEvent EndPIE;

/\*\* Called before SaveWorld is processed \*/

static FOnPreSaveWorld PreSaveWorld;

/\*\* Called after SaveWorld is processed \*/

static FOnPostSaveWorld PostSaveWorld;

struct ENGINE_API FEditorSupportDelegates

{

> /\*\* delegate type for when the editor is about to cleanse an object that \*must\* be purged ( Params: UObject\* Object ) \*/
>
> DECLARE_MULTICAST_DELEGATE_OneParam(FPrepareToCleanseEditorObject, UObject\*);
>
> /\*\* delegate type for force property window rebuild events ( Params: UObject\* Object ) \*/
>
> DECLARE_MULTICAST_DELEGATE_OneParam(FOnForcePropertyWindowRebuild, UObject\*);
>
> /\*\* delegate type for material texture setting change events ( Params: UMaterialIterface\* Material ) \*/
>
> DECLARE_MULTICAST_DELEGATE_OneParam(FOnMaterialTextureSettingsChanged, class UMaterialInterface\*);
>
> /\*\* delegate type for windows messageing events ( Params: FViewport\* Viewport, uint32 Message )\*/
>
> DECLARE_MULTICAST_DELEGATE_TwoParams(FOnWindowsMessage, class FViewport\*, uint32);
>
> /\*\* delegate type for material usage flags change events ( Params: UMaterial\* material, int32 FlagThatChanged ) \*/
>
> DECLARE_MULTICAST_DELEGATE_TwoParams(FOnMaterialUsageFlagsChanged, class UMaterial\*, int32);
>
> /\*\* delegate type for vector parameter default change event \*/
>
> DECLARE_MULTICAST_DELEGATE_ThreeParams(FOnVectorParameterDefaultChanged, class UMaterialExpression\*, FName, const FLinearColor&);
>
> /\*\* delegate type for scalar parameter default change event \*/
>
> DECLARE_MULTICAST_DELEGATE_ThreeParams(FOnScalarParameterDefaultChanged, class UMaterialExpression\*, FName, float);
>
> /\*\* Called when all viewports need to be redrawn \*/
>
> static FSimpleMulticastDelegate RedrawAllViewports;
>
> /\*\* Called when the editor is about to cleanse an object that \*must\* be purged (such as when changing the active map or level) \*/
>
> static FPrepareToCleanseEditorObject PrepareToCleanseEditorObject;
>
> /\*\* Called when the editor is cleansing of transient references before a map change event \*/
>
> static FSimpleMulticastDelegate CleanseEditor;
>
> /\*\* Called when the world is modified \*/
>
> static FSimpleMulticastDelegate WorldChange;
>
> /\*\* Sent to force a property window rebuild \*/
>
> static FOnForcePropertyWindowRebuild ForcePropertyWindowRebuild;
>
> /\*\* Sent when events happen that affect how the editors UI looks (mode changes, grid size changes, etc) \*/
>
> static FSimpleMulticastDelegate UpdateUI;
>
> /\*\* Called for a material after the user has change a texture's compression settings.
>
> Needed to notify the material editors that the need to reattach their preview objects \*/
>
> static FOnMaterialTextureSettingsChanged MaterialTextureSettingsChanged;
>
> /\*\* Refresh property windows w/o creating/destroying controls \*/
>
> static FSimpleMulticastDelegate RefreshPropertyWindows;
>
> /\*\* Sent before the given windows message is handled in the given viewport \*/
>
> static FOnWindowsMessage PreWindowsMessage;
>
> /\*\* Sent after the given windows message is handled in the given viewport \*/
>
> static FOnWindowsMessage PostWindowsMessage;
>
> /\*\* Sent after the usages flags on a material have changed\*/
>
> static FOnMaterialUsageFlagsChanged MaterialUsageFlagsChanged;
>
> /\*\* Sent after vector param default changed \*/
>
> static FOnVectorParameterDefaultChanged VectorParameterDefaultChanged;
>
> /\*\* Sent after scalar param default changed \*/
>
> static FOnScalarParameterDefaultChanged ScalarParameterDefaultChanged;

};

## Look at FCoreDelegates in CoreDelegates.h:

// Called at the beginning of a frame

static FSimpleMulticastDelegate OnBeginFrame;

// Called at the end of a frame

static FSimpleMulticastDelegate OnEndFrame;

static FApplicationLifetimeDelegate ApplicationWillDeactivateDelegate;

// Called when the application has been reactivated (reverse any processing done in the Deactivate delegate)

static FApplicationLifetimeDelegate ApplicationHasReactivatedDelegate;

// Called when appInit is called, very early in startup

static FSimpleMulticastDelegate OnInit;

// Called at the end of UEngine::Init, right before loading PostEngineInit modules for both normal execution and commandlets

static FSimpleMulticastDelegate OnPostEngineInit;

// Called at the very end of engine initialization, right before the engine starts ticking. This is not called for commandlets

static FSimpleMulticastDelegate OnFEngineLoopInitComplete;

**Rendering:**

// Called at the beginning of a frame

static FSimpleMulticastDelegate OnBeginFrame;

// Called at the end of a frame

static FSimpleMulticastDelegate OnEndFrame;

// Called at the beginning of a frame on the renderthread

static FSimpleMulticastDelegate OnBeginFrameRT;

// Called at the end of a frame on the renderthread

static FSimpleMulticastDelegate OnEndFrameRT;

**VR Specific:**

/\*\* Sent when the platform needs the user to fix headset tracking on startup (PS4 Morpheus only) \*/

static FVRHeadsetTrackingInitializingAndNeedsHMDToBeTrackedDelegate VRHeadsetTrackingInitializingAndNeedsHMDToBeTrackedDelegate;

/\*\* Sent when the platform finds that needed headset tracking on startup has completed (PS4 Morpheus only) \*/

static FVRHeadsetTrackingInitializedDelegate VRHeadsetTrackingInitializedDelegate;

/\*\* Sent when the platform requests a low-level VR recentering \*/

static FVRHeadsetRecenter VRHeadsetRecenter;

/\*\* Sent when connection to VR HMD is lost \*/

static FVRHeadsetLost VRHeadsetLost;

/\*\* Sent when connection to VR HMD is restored \*/

static FVRHeadsetReconnected VRHeadsetReconnected;

/\*\* Sent when connection to VR HMD connection is refused by the player \*/

static FVRHeadsetConnectCanceled VRHeadsetConnectCanceled;

/\*\* Sent when the VR HMD detects that it has been put on by the player. \*/

static FVRHeadsetPutOnHead VRHeadsetPutOnHead;

/\*\* Sent when the VR HMD detects that it has been taken off by the player. \*/

static FVRHeadsetRemovedFromHead VRHeadsetRemovedFromHead;

## FGameDelegates:

DEFINE_GAME_DELEGATE_TYPED(EndPlayMapDelegate, FSimpleMulticastDelegate);

DEFINE_GAME_DELEGATE_TYPED(PendingConnectionLostDelegate, FSimpleMulticastDelegate);

DEFINE_GAME_DELEGATE(PreCommitMapChangeDelegate);

DEFINE_GAME_DELEGATE_TYPED(PostCommitMapChangeDelegate, FSimpleMulticastDelegate);

## Also FCoreUObjectDelegates in UObjectGlobals:

// Called when any object is modified at all

> static FOnObjectModified OnObjectModified;
>
> // Called before a property is changed
>
> static FOnPreObjectPropertyChanged OnPreObjectPropertyChanged;
>
> // Called when a property is changed
>
> static FOnObjectPropertyChanged OnObjectPropertyChanged;
>
> // Set of objects modified this frame, to prevent multiple triggerings of the OnObjectModified delegate.
>
> static TSet&lt;UObject\*> ObjectsModifiedThisFrame;

// Sent at the very beginning of LoadMap

> DECLARE_MULTICAST_DELEGATE_OneParam(FPreLoadMapDelegate, const FString& /\* MapName \*/);
>
> static FPreLoadMapDelegate PreLoadMap;
>
> // Sent at the \_successful\_ end of LoadMap
>
> DECLARE_MULTICAST_DELEGATE_OneParam(FPostLoadMapDelegate, UWorld\* /\* LoadedWorld \*/);
>
> static FPostLoadMapDelegate PostLoadMapWithWorld;
>
> DEPRECATED(4.16, "Use PostLoadMapWithWorld instead.")
>
> static FSimpleMulticastDelegate PostLoadMap;
>
> // Sent at the \_successful\_ end of LoadMap

## Also FWorldDelegates in World.h:

static FOnWorldTickStart OnWorldTickStart;

> // Callback for world creation
>
> static FWorldEvent OnPostWorldCreation;
>
> // Callback for world initialization (pre)
>
> static FWorldInitializationEvent OnPreWorldInitialization;
>
> // Callback for world initialization (post)
>
> static FWorldInitializationEvent OnPostWorldInitialization;

\#if WITH_EDITOR

> // Callback for world rename event (pre)
>
> static FWorldRenameEvent OnPreWorldRename;

\#endif // WITH_EDITOR

> // Post duplication event.
>
> static FWorldPostDuplicateEvent OnPostDuplicate;
>
> // Callback for world cleanup
>
> static FWorldCleanupEvent OnWorldCleanup;
>
> // Callback for world cleanup end
>
> static FWorldCleanupEvent OnPostWorldCleanup;
>
> // Callback for world destruction (only called for initialized worlds)
>
> static FWorldEvent OnPreWorldFinishDestroy;
>
> // Sent when a ULevel is added to the world via UWorld::AddToWorld
>
> static FOnLevelChanged                        LevelAddedToWorld;
>
> // Sent when a ULevel is removed from the world via UWorld::RemoveFromWorld or
>
> // LoadMap (a NULL object means the LoadMap case, because all levels will be
>
> // removed from the world without a RemoveFromWorld call for each)
>
> static FOnLevelChanged                        LevelRemovedFromWorld;

static FLevelOffsetEvent                PostApplyLevelOffset;

> // called by UWorld::GetAssetRegistryTags()
>
> static FWorldGetAssetTags GetAssetTags;

\#if WITH_EDITOR

> // Delegate called when levelscript actions need refreshing
>
> DECLARE_MULTICAST_DELEGATE_OneParam(FRefreshLevelScriptActionsEvent, UWorld\*);
>
> // Called when changes in the levels require blueprint actions to be refreshed.
>
> static FRefreshLevelScriptActionsEvent RefreshLevelScriptActions;

\#endif

-

## Engine Delegates in Engine.h:

/\*\* Broadcasts when a world is added. \*/

> FWorldAddedEvent                        WorldAddedEvent;
>
> /\*\* Broadcasts when a world is destroyed. \*/
>
> FWorldDestroyedEvent                WorldDestroyedEvent;

private:

\#if WITH_EDITOR

> /\*\* Broadcasts whenever a world's actor list changes in a way not specifiable through other LevelActor\_\_Events \*/
>
> FLevelActorListChangedEvent LevelActorListChangedEvent;
>
> /\*\* Broadcasts whenever an actor is added. \*/
>
> FLevelActorAddedEvent LevelActorAddedEvent;
>
> /\*\* Broadcasts whenever an actor is removed. \*/
>
> FLevelActorDeletedEvent LevelActorDeletedEvent;
>
> /\*\* Broadcasts whenever an actor is attached. \*/
>
> FLevelActorAttachedEvent LevelActorAttachedEvent;
>
> /\*\* Broadcasts whenever an actor is detached. \*/
>
> FLevelActorDetachedEvent LevelActorDetachedEvent;
>
> /\*\* Broadcasts whenever an actor's folder has changed. \*/
>
> FLevelActorFolderChangedEvent LevelActorFolderChangedEvent;
>
> /\*\* Broadcasts whenever an actor is being renamed \*/
>
> FLevelActorRequestRenameEvent LevelActorRequestRenameEvent;
>
> /\*\* Broadcasts whenever a component is being renamed \*/
>
> FLevelComponentRequestRenameEvent LevelComponentRequestRenameEvent;
>
> /\*\* Broadcasts after an actor has been moved, rotated or scaled \*/
>
> FOnActorMovedEvent                OnActorMovedEvent;
>
> /\*\* Broadcasts after a component has been moved, rotated or scaled \*/
>
> FOnComponentTransformChangedEvent OnComponentTransformChangedEvent;
>
> /\*\* Delegate broadcast after UEditorEngine::Tick has been called (or UGameEngine::Tick in standalone) \*/
>
> FPostEditorTick PostEditorTickEvent;
>
> /\*\* Delegate broadcast when the editor is closing \*/
>
> FEditorCloseEvent EditorCloseEvent;
