**USceneComponents:**

PostEditComponentMove(bool bFinished) {}

**AActors:**

AActor::PreEditChange(UProperty\* PropertyThatWillChange)

virtual bool CanEditChange( const UProperty\* Property ) const override;

PostEditChangeProperty(FPropertyChangedEvent& PropertyChangedEvent)

PostEditMove(bool bFinished)

ReregisterComponentsWhenModified() const

DebugShowComponentHierarchy( const TCHAR\* Info, bool bShowPosition )

DebugShowOneComponentHierarchy( USceneComponent\* SceneComp, int32& NestLevel, bool bShowPosition )

FActorTransactionAnnotation(const AActor\* Actor, const bool bCacheRootComponentData) : ComponentInstanceData(Actor)

AddReferencedObjects(FReferenceCollector& Collector)

HasInstanceData() const

GetTransactionAnnotation() const

PreEditUndo()

PostEditUndo()

PostEditUndo(TSharedPtr&lt;ITransactionObjectAnnotation&gt; TransactionAnnotation)

EditorApplyTranslation(const FVector& DeltaTranslation, bool bAltDown, bool bShiftDown, bool bCtrlDown)

EditorApplyRotation(const FRotator& DeltaRotation, bool bAltDown, bool bShiftDown, bool bCtrlDown)

EditorApplyScale( const FVector& DeltaScale, const FVector\* PivotLocation, bool bAltDown, bool bShiftDown, bool bCtrlDown )

EditorApplyMirror(const FVector& MirrorScale, const FVector& PivotLocation)

IsHiddenEd() const

SetIsTemporarilyHiddenInEditor( bool bIsHidden )

IsEditable() const

IsListedInSceneOutliner() const

EditorCanAttachTo(const AActor\* InParent, FText& OutReason) const

GetActorLabel() const

SetActorLabel( const FString& NewActorLabelDirty, bool bMarkDirty )

SetActorLabelInternal( const FString& NewActorLabelDirty, bool bMakeGloballyUniqueFName, bool bMarkDirty )

IsActorLabelEditable() const

ClearActorLabel()

FActorFolders::Get().CreateFolder(InWorld, NewFolderName)

GetFolderPath() const

SetFolderPath(const FName& NewFolderPath)

SetFolderPath_Recursively(const FName& NewFolderPath)

CheckForDeprecated()

CheckForErrors()

GetReferencedContentObjects( TArray&lt;UObject\*&gt;& Objects ) const

SetLODParent(UPrimitiveComponent\* InLODParent, float InParentDrawDistance)
