GEditor-&gt;RequestPlaySession(false, VREditorLevelViewportWeakPtr.Pin(), true /\*bSimulateInEditor\*/, StartLoc, StartRot, -1);

\#if WITH_EDITOR

​ extern UNREALED_API UEditorEngine\* GEditor;

​ return GIsEditor && (GEditor-&gt;bIsSimulateInEditorQueued || GEditor-&gt;bIsSimulatingInEditor);

\#endif

/\*\* Sent when a PIE session has fully started and after BeginPlay() has been called \*/

static FOnPIEEvent PostPIEStarted;
