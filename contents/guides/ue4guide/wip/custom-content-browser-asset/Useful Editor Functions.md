**Usefulful places to look for editor commands:**

- UnrealEngine.cpp: UEngine::Exec()

- Look for functions in the form of Handle{.}+Command(…). Ex: HandleMergeMeshCommand()

Look for classes that end in Utils()

UEditorEngine::CopyPropertiesForUnrelatedObjects(**OldActor**, **NewActor**);

GEditor->Exec(**World**, TEXT("MAP CHECKDEP NOCLEARLOG"));

TFindObjectReferencers

SGenericDialogWidget::OpenDialog(NSLOCTEXT("ObjectTools", "ShowReferencers", "Show Referencers"), SNew(STextBlock).Text(FText::FromString(**Ar**)));

**Merging skeletal meshes:**

FSkeletalMeshMerge

**Guard Script Execution in Editor while running blueprint function:**

FEditorScriptExecutionGuard **ScriptGuard**;

**Send error message to blueprint VM:  
**FFrame::KismetExecutionMessage(\*FString::Printf(TEXT("%s - Cannot map local player to unique net ID"), FunctionContext), ELogVerbosity::Warning);

**Create Blueprint Exception:**

FBlueprintExceptionInfo ExceptionInfo(

EBlueprintExceptionType::NonFatalError,

LTXT("Incompatible sequencer property track with component. Check configuration. These must match: sequencer bound property type, ProcAnimComponent.SupportedPropertyType.")

);

FBlueprintCoreDelegates::ThrowScriptException(this, Stack, ExceptionInfo);

Call UFunction with parameters using reflection:

UObject::CallFunctionByNameWithArguments

Iterate over sublevels:

TArray&lt;FSubLevelStatus> GetSubLevelsStatus( UWorld\* World )

**Load A Class By Name:**

UClass\* Result = StaticLoadClass(UObject::StaticClass(), nullptr, \*ClassName, nullptr, LOAD_None, nullptr);

*From &lt;<https://answers.unrealengine.com/questions/92651/get-blueprint-class-by-string-in-c.html>>*

**Find a class by name:**

UClass\* Result = FindObject&lt;UClass>(ANY_PACKAGE, \*ClassName)

*From &lt;<https://answers.unrealengine.com/questions/92651/get-blueprint-class-by-string-in-c.html>>*

**Get actor for blueprint editor:**

if (UBlueprintGeneratedClass\* GeneratedClass = Actor->GetTypedOuter&lt;UBlueprintGeneratedClass>())

{

return GeneratedClass->SimpleConstructionScript->GetComponentEditorActorInstance();

}

**Get PIE Actor counter-part from Editor World Actor and vice-versa:**

EditorUtilities::GetEditorWorldCounterpartActor( AActor\* Actor );

EditorUtilities::GetSimWorldCounterpartActor( AActor\* Actor );

**Editor Destroy Actor:**

Normal: GWorld->DestroyActor(Instance...)

In Editor: GetWorld()->EditorDestroyActor(lcbActor, true);

**PostEditChangeProperty()**

- is the function that gets called when editor changes a property. Use it to perform things like position snapping after the user moves a component

> Property->GetNameCPP() returns the property c++ variable name
>
> <https://answers.unrealengine.com/questions/43138/allow-a-material-to-be-changed-from-the-editor-in.html>
>
> <https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AActor/PostEditChangeProperty/index.html>

**Notification Message Warning To Editor:**

if (**SubstituteNodes**.Num() > 0)  
                {  
                        // Display a notification to inform the user that the variable type was invalid (likely due to corruption), it should no longer appear in the list.  
                        FNotificationInfo **Info**(NSLOCTEXT("EdGraphUtilities", "SubstituteNodesWarning", "Conflicting nodes substituted during paste!"));  
                        **Info**.ExpireDuration = 3.0f;  
                        **Info**.bUseLargeFont = false;  
                        **Info**.Image = FCoreStyle::Get().GetBrush(TEXT("MessageLog.Warning"));  
                        TSharedPtr&lt;SNotificationItem> **Notification** = FSlateNotificationManager::Get().AddNotification(**Info**);  
                        if (**Notification**.IsValid())  
                        {  
                                **Notification**->SetCompletionState(SNotificationItem::CS_None);  
                        }  
                }

**Notification Message Warning To Blueprint Editor:**

UBlueprint::Message_Warn(const FString& **MessageToLog**);

MapCheck MessageLog

How to log output editor message warnings/errors:

FMessageLog("PIE").Warning(FText::Format(LOCTEXT("AttachToSelfRootWarning", "AttachTo: '{0}' root component cannot be attached to other components in the same actor. Aborting."),  
                                FText::FromString(GetPathName())));

FMessageLog("MapCheck").Warning()  
                        ->AddToken(FUObjectToken::Create(this))  
                        ->AddToken(FTextToken::Create(LOCTEXT( "MapCheck_Message_DuplicateLevelInfo", "Duplicate level info" ) ))  
                        ->AddToken(FMapErrorToken::Create(FMapErrors::DuplicateLevelInfo));

Demarcate whether an actor should be listed or hidden in scene outliner or folder :

AActor::bListedInSceneOutliner / bool IsListedInSceneOutliner() const;

Disable actor label from being editable

bActorLabelEditable

Get Actor's folder path:

AActor::GetFolderPath() const;

FActorFolders::Get().CreateFolder(InWorld, NewFolderName)

Check for unbuilt lighting:

/\*\* Returns NumUncachedStaticLightingInteractions for this actor \*/  
        const int32 GetNumUncachedStaticLightingInteractions() const;

Modify Editor hooks to move actor (translate, scale, or rotate):

/\*\*

\* Called by ApplyDeltaToActor to perform an actor class-specific operation based on widget manipulation.

\* The default implementation is simply to translate the actor's location.

\*/

virtual void EditorApplyTranslation(const FVector& DeltaTranslation, bool bAltDown, bool bShiftDown, bool bCtrlDown);

/\*\*

\* Called by ApplyDeltaToActor to perform an actor class-specific operation based on widget manipulation.

\* The default implementation is simply to modify the actor's rotation.

\*/

virtual void EditorApplyRotation(const FRotator& DeltaRotation, bool bAltDown, bool bShiftDown, bool bCtrlDown);

/\*\*

\* Called by ApplyDeltaToActor to perform an actor class-specific operation based on widget manipulation.

\* The default implementation is simply to modify the actor's draw scale.

\*/

virtual void EditorApplyScale(const FVector& DeltaScale, const FVector\* PivotLocation, bool bAltDown, bool bShiftDown, bool bCtrlDown);

GEditor->OnBeginObjectMovement().AddRaw( this, &F3DTransformTrackEditor::OnPreTransformChanged );  
        GEditor->OnEndObjectMovement().AddRaw( this, &F3DTransformTrackEditor::OnTransformChanged );

// Listen for the viewport's viewed through camera starts and stops movement  
        GEditor->OnBeginCameraMovement().AddRaw( this, &F3DTransformTrackEditor::OnPreTransformChanged );  
        GEditor->OnEndCameraMovement().AddRaw( this, &F3DTransformTrackEditor::OnTransformChanged );

Save an objects property into the config file:

void SaveConfig( uint64 **Flags**=CPF_Config, const TCHAR\* **Filename**=NULL, FConfigCacheIni\* **Config**=GConfig );

/\*\*  
         \* Saves just the section(s) for this class into the default ini file for the class (with just the changes from base)  
         \*/  
        void UpdateDefaultConfigFile(const FString& **SpecificFileLocation** = "");

/\*\*  
         \* Saves just the section(s) for this class into the global user ini file for the class (with just the changes from base)  
         \*/  
        void UpdateGlobalUserConfigFile();

/\*\*  
         \* Saves just the property into the global user ini file for the class (with just the changes from base)  
         \*/  
        void UpdateSinglePropertyInConfigFile(const UProperty\* **InProperty**, const FString& **InConfigIniName**);

**FPackageName** contains a lot of utility functions for managing packages:

/\*\*   
         \* Returns the path to the object referred to by the supplied export text path, excluding the class name.  
         \*   
         \* @param InExportTextPath The export text path for an object. Takes on the form: ClassName'ObjectPath'  
         \* @return The path to the object referred to by the supplied export path.  
         \*/  
        static FString ExportTextPathToObjectPath(const FString& **InExportTextPath**);

/\*\*   
         \* Returns the name of the package referred to by the specified object path  
         \*/  
        static FString ObjectPathToPackageName(const FString& **InObjectPath**);

/\*\*   
         \* Returns the name of the object referred to by the specified object path  
         \*/  
        static FString ObjectPathToObjectName(const FString& **InObjectPath**);

**Load object with path name:**

LoadObject&lt;T>() is a helper for this

Cast&lt;UClass>(StaticLoadObject(UClass::StaticClass(), NULL, \*GEngine->ParticleEventManagerClassPath, NULL, LOAD_NoWarn, NULL));

<https://answers.unrealengine.com/questions/476579/loadobject-vs-staticloadobject.html>

**Hook Into saving and useful editor delegates (look at Editor.h, FEditorDelegates):**

- Look at editor delegates in [Editor Delegates are in FEditorDelegates]

Dump Debug Component Hierarchy:

AActor::DebugShowComponentHierarchy

Get actor instance in blueprint component editor from component:

if (AActor\* **Actor** = **ActorSequence**->GetTypedOuter&lt;AActor>())  
{  
        return **Actor**;  
}  
#if WITH_EDITOR  
else if (UBlueprintGeneratedClass\* **GeneratedClass** = **ActorSequence**->GetTypedOuter&lt;UBlueprintGeneratedClass>())  
{  
        return **GeneratedClass**->SimpleConstructionScript->GetComponentEditorActorInstance();  
}  
#endif  
}

**Asset Registry functions**

FAutoConsoleCommand GetByNameCommand;  
        FAutoConsoleCommand GetByPathCommand;  
        FAutoConsoleCommand GetByClassCommand;  
        FAutoConsoleCommand GetByTagCommand;  
        FAutoConsoleCommand GetDependenciesCommand;  
        FAutoConsoleCommand GetReferencersCommand;  
        FAutoConsoleCommand FindInvalidUAssetsCommand;

**Mapcheck Iterate over materials to check whether they read from SceneColor**

ListSceneColorMaterials  
static FAutoConsoleCommand CmdListSceneColorMaterials(

**Find Icon for Class:**

**ActorIcon** = FSlateIconFinder::FindIconForClass(**ActorsValidForPossession**\[0]->GetClass());

Create mini scene outliner:

**SceneOutlinerModule**.CreateSceneOutliner(

Find icon for class:

FSlateIconFinder::FindIconForClass(InSequence->GetClass());

FPropertyPath get root property:

UProperty\* Property = KeyablePropertyPath.GetRootProperty().Property.Get();

Descend Iterate over full property path: FSequencerObjectChangeListener::CanKeyProperty_Internal() const

if (CanKeyPropertyParams.PropertyPath.GetNumProperties() == 0)

> {
>
> return false;
>
> }

// iterate over the property path trying to find keyable properties

> InOutPropertyPath = FPropertyPath();
>
> for (int32 Index = 0; Index &lt; CanKeyPropertyParams.PropertyPath.GetNumProperties(); ++Index)
>
> {
>
> const FPropertyInfo& PropertyInfo = CanKeyPropertyParams.PropertyPath.GetPropertyInfo(Index);
>
> // Add this to our 'potentially truncated' path
>
> InOutPropertyPath.AddProperty(PropertyInfo);
>
> UProperty\* Property = CanKeyPropertyParams.PropertyPath.GetPropertyInfo(Index).Property.Get();
>
> if (Property)
>
> {
>
> const UStruct\* PropertyContainer = CanKeyPropertyParams.FindPropertyContainer(Property);
>
> if (PropertyContainer)
>
> {
>
> {
>
> FAnimatedPropertyKey PropertyKey = FAnimatedPropertyKey::FromProperty(Property);
>
> const FOnAnimatablePropertyChanged\* DelegatePtr = FindPropertySetter(\*PropertyContainer, PropertyKey, \*Property);
>
> if (DelegatePtr != nullptr)
>
> {
>
> InOutProperty = Property;
>
> InOutDelegate = \*DelegatePtr;
>
> return true;
>
> }
>
> }
>
> if (UObjectProperty\* ObjectProperty = Cast&lt;UObjectProperty>(Property))
>
> {
>
> UClass\* ClassType = ObjectProperty->PropertyClass ? ObjectProperty->PropertyClass->GetSuperClass() : nullptr;
>
> while (ClassType)
>
> {
>
> FAnimatedPropertyKey PropertyKey = FAnimatedPropertyKey::FromObjectType(ClassType);
>
> const FOnAnimatablePropertyChanged\* DelegatePtr = FindPropertySetter(\*PropertyContainer, PropertyKey, \*Property);
>
> if (DelegatePtr != nullptr)
>
> {
>
> InOutProperty = Property;
>
> InOutDelegate = \*DelegatePtr;
>
> return true;
>
> }
>
> ClassType = ClassType->GetSuperClass();
>
> }
>
> }
>
> }
>
> }
>
> }

Get BP Variable metadata:

FBlueprintEditorUtils::GetBlueprintVariableMetaData()  
FBlueprintEditorUtils::SetBlueprintVariableMetaData()

Register Blueprint Editor Property Variable Customization:

Look at ControlRig for examples

virtual void RegisterVariableCustomization(UStruct\* **InStruct**, FOnGetVariableCustomizationInstance **InOnGetVariableCustomization**);

virtual TArray&lt;TSharedPtr&lt;IDetailCustomization>> CustomizeVariable(UStruct\* **InStruct**, TSharedPtr&lt;IBlueprintEditor> **InBlueprintEditor**);

virtual void RegisterSCSEditorCustomization(const FName& **InComponentName**, FSCSEditorCustomizationBuilder **InCustomizationBuilder**);

[editor delegates are in feditordelegates]: onenote:#Core%20Events\Delegates&section-id={37412B85-90BD-4C74-B6F2-230753E331ED}&page-id={52C48550-D9C3-4CB4-9C71-6D4A7CB88779}&object-id={965BF652-A2D5-0804-046A-6DC4D757634C}&1E&base-path=https://kitelightning-my.sharepoint.com/personal/ikrima_kiteandlightning_la/Documents/KiteLightning/Bebylon/Unreal.one
