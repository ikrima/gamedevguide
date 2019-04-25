**Useful Classes:**

**FLevelEditorModule** has a lot of useful entry points like

-   GetFirstActiveViewport(),

-   GetFirstLevelEditor(), etc

 

**ILevelEditor**

 

**ILevelViewport** & **SLevelViewport**: Widgets to control params for levelviewport:

-   StartPlayInEditorSession()

-   HasPlayInEditorViewport()

-   GetLevelViewportClient()

-   ToggleGameView()

-   AddOverlayWidget()

 

FLevelEditorViewportClient & FEditorViewportClient

 

**Main class for Editor Viewports:**

FEditorViewportClient

-   Also handles most of the viewport UI actions e.g. SetRealtimePreview(), SetShowStats(), SetCameraLock()

 

**Viewport Manipulation:**

FEditorViewportClient::SetCameraSetup(const FVector& LocationForOrbiting, const FRotator& InOrbitRotation, const FVector& InOrbitZoom, const FVector& InOrbitLookAt, const FVector& InViewLocation, const FRotator &InViewRotation );

FEditorViewportClient::SetCameraLock()

FEditorViewportClient::SetViewRotation( InOrbitRotation );

FEditorViewportClient::SetViewLocation( InViewLocation + InOrbitZoom );

FEditorViewportClient::SetLookAtLocation( InOrbitLookAt );

 

//Current active level editing viewport

GCurrentLevelEditingViewportClient

GLastKeyLevelEditingViewportClient

 

**Callbacks on viewport manipulation:**

virtual void EditorApplyTranslation(const FVector& DeltaTranslation, bool bAltDown, bool bShiftDown, bool bCtrlDown) override;

virtual void EditorApplyRotation(const FRotator& DeltaRotation, bool bAltDown, bool bShiftDown, bool bCtrlDown) override;

virtual void EditorApplyScale(const FVector& DeltaScale, const FVector\* PivotLocation, bool bAltDown, bool bShiftDown, bool bCtrlDown) override;

virtual void PostEditMove(bool bFinished) override;

virtual void PostEditComponentMove(bool bFinished) override;

 

 

**Get All Viewports:**

-   /\*\* The "manager" of all the layers for the UWorld currently being edited \*/

> GEditor-&gt;Layers;

 

-   /\*\* List of all viewport clients \*/

> GEditor-&gt;AllViewportClients;

 

-   /\*\* List of level editor viewport clients for level specific actions \*/

> GEditor-&gt;LevelViewportClients;

 

 

**Viewport Toggle RealTime:**

viewportClient-&gt;ToggleRealtime()

viewportClient-&gt;IsRealTime()
