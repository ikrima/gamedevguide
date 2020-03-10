---
sortIndex: 8
sidebar: ue4guide
---

## Usefulful places to look for editor commands

- UnrealEngine.cpp: UEngine::Exec()

- Look for functions in the form of Handle{.}+Command(…). Ex: HandleMergeMeshCommand()

- Look for classes that end in Utils()

```cpp
UEditorEngine::CopyPropertiesForUnrelatedObjects(OldActor,NewActor;

GEditor->Exec(World, TEXT("MAP CHECKDEP NOCLEARLOG"));

TFindObjectReferencers

SGenericDialogWidget::OpenDialog(NSLOCTEXT("ObjectTools", "ShowReferencers", "Show Referencers"), SNew(STextBlock).Text(FText::FromString(Ar)));
```

### Merging skeletal meshes:

`FSkeletalMeshMerge`

### Guard Script Execution in Editor while running blueprint function:

`FEditorScriptExecutionGuard ScriptGuard;`

### Send error message to blueprint VM:

```
FFrame::KismetExecutionMessage(*FString::Printf(TEXT("%s - Cannot map local player to unique net ID"), FunctionContext), ELogVerbosity::Warning);
```

### Create Blueprint Exception:

```cpp
FBlueprintExceptionInfo ExceptionInfo(

EBlueprintExceptionType::NonFatalError,

LTXT("Incompatible sequencer property track with component. Check configuration. These must match: sequencer bound property type, ProcAnimComponent.SupportedPropertyType.")

);

FBlueprintCoreDelegates::ThrowScriptException(this, Stack, ExceptionInfo);
```

### Call UFunction with parameters using reflection:

```cpp
UObject::CallFunctionByNameWithArguments
```

### Iterate over sublevels:

```cpp
TArray<FSubLevelStatus> GetSubLevelsStatus( UWorld* World )
```

### Load A Class By Name:

`UClass* Result = StaticLoadClass(UObject::StaticClass(), nullptr, *ClassName, nullptr, LOAD_None, nullptr);`

From <https://answers.unrealengine.com/questions/92651/get-blueprint-class-by-string-in-c.html>

### Find a class by name:

UClass* Result = FindObject<UClass>(ANY_PACKAGE, *ClassName)

From <https://answers.unrealengine.com/questions/92651/get-blueprint-class-by-string-in-c.html>

### Get actor for blueprint editor:

```cpp
if (UBlueprintGeneratedClass* GeneratedClass = Actor->GetTypedOuter<UBlueprintGeneratedClass>())

{
return GeneratedClass->SimpleConstructionScript->GetComponentEditorActorInstance();

}
```

### Get PIE Actor counter-part from Editor World Actor and vice-versa:

```cpp
EditorUtilities::GetEditorWorldCounterpartActor( AActor* Actor );

EditorUtilities::GetSimWorldCounterpartActor( AActor* Actor );
```

### Editor Destroy Actor

```cpp
Normal: GWorld->DestroyActor(Instance...)

In Editor: GetWorld()->EditorDestroyActor(lcbActor, true);
```

### PostEditChangeProperty()

- is the function that gets called when editor changes a property. Use it to perform things like position snapping after the user moves a component
  
  Property->GetNameCPP() returns the property c++ variable name
  
  <https://answers.unrealengine.com/questions/43138/allow-a-material-to-be-changed-from-the-editor-in.html>
  
  <https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AActor/PostEditChangeProperty/index.html>

### Notification Message Warning To Editor:

```cpp
if (SubstituteNodes.Num() > 0)
                {
                        // Display a notification to inform the user that the variable type was invalid (likely due to corruption), it should no longer appear in the list.
                        FNotificationInfo Info(NSLOCTEXT("EdGraphUtilities", "SubstituteNodesWarning", "Conflicting nodes substituted during paste!"));
                        Info.ExpireDuration = 3.0f;
                        Info.bUseLargeFont = false;
                        Info.Image = FCoreStyle::Get().GetBrush(TEXT("MessageLog.Warning"));
                        TSharedPtr<SNotificationItem> Notification = FSlateNotificationManager::Get().AddNotification(Info);
                        if (Notification.IsValid())
                        {
                                Notification->SetCompletionState(SNotificationItem::CS_None);
                        }
                }
```

### Notification Message Warning To Blueprint Editor:

`UBlueprint::Message_Warn(const FString& **MessageToLog**);`

MapCheck MessageLog

### How to log output editor message warnings/errors:

```cpp
FMessageLog("PIE").Warning(FText::Format(LOCTEXT("AttachToSelfRootWarning", "AttachTo: '{0}' root component cannot be attached to other components in the same actor. Aborting."),
                                FText::FromString(GetPathName())));

FMessageLog("MapCheck").Warning()
                        ->AddToken(FUObjectToken::Create(this))
                        ->AddToken(FTextToken::Create(LOCTEXT( "MapCheck_Message_DuplicateLevelInfo", "Duplicate level info" ) ))
                        ->AddToken(FMapErrorToken::Create(FMapErrors::DuplicateLevelInfo));
```

Demarcate whether an actor should be listed or hidden in scene outliner or folder :

```cpp
AActor::bListedInSceneOutliner / bool IsListedInSceneOutliner() const;
```

Disable actor label from being editable

bActorLabelEditable

Get Actor's folder path:

```cpp
AActor::GetFolderPath() const;
FActorFolders::Get().CreateFolder(InWorld, NewFolderName)
```

### Check for unbuilt lighting:

```cpp
/* Returns NumUncachedStaticLightingInteractions for this actor */
const int32 GetNumUncachedStaticLightingInteractions() const;
```

### Modify Editor hooks to move actor (translate, scale, or rotate):

```cpp
/**
* Called by ApplyDeltaToActor to perform an actor class-specific operation based on widget manipulation.
* The default implementation is simply to translate the actor's location.
*/

virtual void EditorApplyTranslation(const FVector& DeltaTranslation, bool bAltDown, bool bShiftDown, bool bCtrlDown);

/**
* Called by ApplyDeltaToActor to perform an actor class-specific operation based on widget manipulation.
* The default implementation is simply to modify the actor's rotation.
*/

virtual void EditorApplyRotation(const FRotator& DeltaRotation, bool bAltDown, bool bShiftDown, bool bCtrlDown);

/**

* Called by ApplyDeltaToActor to perform an actor class-specific operation based on widget manipulation.

* The default implementation is simply to modify the actor's draw scale.

*/

virtual void EditorApplyScale(const FVector& DeltaScale, const FVector* PivotLocation, bool bAltDown, bool bShiftDown, bool bCtrlDown);

GEditor->OnBeginObjectMovement().AddRaw( this, &F3DTransformTrackEditor::OnPreTransformChanged );
        GEditor->OnEndObjectMovement().AddRaw( this, &F3DTransformTrackEditor::OnTransformChanged );

// Listen for the viewport's viewed through camera starts and stops movement
        GEditor->OnBeginCameraMovement().AddRaw( this, &F3DTransformTrackEditor::OnPreTransformChanged );
        GEditor->OnEndCameraMovement().AddRaw( this, &F3DTransformTrackEditor::OnTransformChanged );
```

### FPackageName contains a lot of utility functions for managing packages:

```cpp
/** 
         * Returns the path to the object referred to by the supplied export text path, excluding the class name.
         * 
         * @param InExportTextPath The export text path for an object. Takes on the form: ClassName'ObjectPath'
         * @return The path to the object referred to by the supplied export path.
         */
        static FString ExportTextPathToObjectPath(const FString& InExportTextPath);

/** 
         * Returns the name of the package referred to by the specified object path
         */
        static FString ObjectPathToPackageName(const FString& **InObjectPath**);

/** 
         * Returns the name of the object referred to by the specified object path
         */
        static FString ObjectPathToObjectName(const FString& **InObjectPath**);
```

### Load object with path name

LoadObject<T>() is a helper for this

```cpp
Cast<UClass>(StaticLoadObject(UClass::StaticClass(), NULL, *GEngine->ParticleEventManagerClassPath, NULL, LOAD_NoWarn, NULL));
````
<https://answers.unrealengine.com/questions/476579/loadobject-vs-staticloadobject.html>

### Hook Into saving and useful editor delegates (look at Editor.h, FEditorDelegates):

- Look at editor delegates in [Editor Delegates are in FEditorDelegates]

### Dump Debug Component Hierarchy:

```cpp
AActor::DebugShowComponentHierarchy
```

### Get actor instance in blueprint component editor from component:

```cpp
if (AActor* **Actor** = **ActorSequence**->GetTypedOuter<AActor>())
{
        return **Actor**;
}
#if WITH_EDITOR
else if (UBlueprintGeneratedClass* **GeneratedClass** = **ActorSequence**->GetTypedOuter<UBlueprintGeneratedClass>())
{
        return **GeneratedClass**->SimpleConstructionScript->GetComponentEditorActorInstance();
}
#endif

```

**Asset Registry functions**

```cpp
FAutoConsoleCommand GetByNameCommand;
        FAutoConsoleCommand GetByPathCommand;
        FAutoConsoleCommand GetByClassCommand;
        FAutoConsoleCommand GetByTagCommand;
        FAutoConsoleCommand GetDependenciesCommand;
        FAutoConsoleCommand GetReferencersCommand;
        FAutoConsoleCommand FindInvalidUAssetsCommand;
```

**Mapcheck Iterate over materials to check whether they read from SceneColor**

```cpp
ListSceneColorMaterials
static FAutoConsoleCommand CmdListSceneColorMaterials(
```

**Find Icon for Class:**

```cpp
**ActorIcon** = FSlateIconFinder::FindIconForClass(**ActorsValidForPossession**\[0]->GetClass());
```

Create mini scene outliner:

    **SceneOutlinerModule**.CreateSceneOutliner(

Find icon for class:

```cpp
FSlateIconFinder::FindIconForClass(InSequence->GetClass());

FPropertyPath get root property:

UProperty* Property = KeyablePropertyPath.GetRootProperty().Property.Get();

Descend Iterate over full property path: FSequencerObjectChangeListener::CanKeyProperty_Internal() const

if (CanKeyPropertyParams.PropertyPath.GetNumProperties() == 0)

 {

 return false;

 }

// iterate over the property path trying to find keyable properties

 InOutPropertyPath = FPropertyPath();

 for (int32 Index = 0; Index < CanKeyPropertyParams.PropertyPath.GetNumProperties(); ++Index)

 {

 const FPropertyInfo& PropertyInfo = CanKeyPropertyParams.PropertyPath.GetPropertyInfo(Index);

 // Add this to our 'potentially truncated' path

 InOutPropertyPath.AddProperty(PropertyInfo);

 UProperty* Property = CanKeyPropertyParams.PropertyPath.GetPropertyInfo(Index).Property.Get();

 if (Property)

 {

 const UStruct* PropertyContainer = CanKeyPropertyParams.FindPropertyContainer(Property);

 if (PropertyContainer)

 {

 {

 FAnimatedPropertyKey PropertyKey = FAnimatedPropertyKey::FromProperty(Property);

 const FOnAnimatablePropertyChanged* DelegatePtr = FindPropertySetter(*PropertyContainer, PropertyKey, *Property);

 if (DelegatePtr != nullptr)

 {

 InOutProperty = Property;

 InOutDelegate = *DelegatePtr;

 return true;

 }

 }

 if (UObjectProperty* ObjectProperty = Cast<UObjectProperty>(Property))

 {

 UClass* ClassType = ObjectProperty->PropertyClass ? ObjectProperty->PropertyClass->GetSuperClass() : nullptr;

 while (ClassType)

 {

 FAnimatedPropertyKey PropertyKey = FAnimatedPropertyKey::FromObjectType(ClassType);

 const FOnAnimatablePropertyChanged* DelegatePtr = FindPropertySetter(*PropertyContainer, PropertyKey, *Property);

 if (DelegatePtr != nullptr)

 {

 InOutProperty = Property;

 InOutDelegate = *DelegatePtr;

 return true;

 }

 ClassType = ClassType->GetSuperClass();

 }

 }

 }

 }

 }
```

Get BP Variable metadata:

```cpp
FBlueprintEditorUtils::GetBlueprintVariableMetaData()
FBlueprintEditorUtils::SetBlueprintVariableMetaData()
```

Register Blueprint Editor Property Variable Customization:

Look at ControlRig for examples

```cpp
virtual void RegisterVariableCustomization(UStruct* InStruct, FOnGetVariableCustomizationInstance **InOnGetVariableCustomization**);

virtual TArray<TSharedPtr<IDetailCustomization>> CustomizeVariable(UStruct* InStruct, TSharedPtr<IBlueprintEditor> **InBlueprintEditor**);

virtual void RegisterSCSEditorCustomization(const FName& **InComponentName**, FSCSEditorCustomizationBuilder **InCustomizationBuilder**);
```
