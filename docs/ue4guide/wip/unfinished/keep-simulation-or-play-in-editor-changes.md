---
sidebar: ue4guide
---
Keep Simulation or Play In Editor changes:

- Hit k keyboard shortcut or right click on actor in viewport/world outliner and select keep simulation changes from context menu

- Uses UObject CopyProperties()

PerformSetCommand(): Sets values on object or all objects of a class and also updates CDO (through DefaultObject->SaveConfig()

​ GlobalSetProperty(): Sets property based on text

On Saving Property Changes During Gameplay/Keep Simulation Changes

#### **OnKeepSimulationChanges()**

// Find our counterpart actor

AActor\* EditorWorldActor = EditorUtilities::GetEditorWorldCounterpartActor( SimWorldActor );

// We only want to copy CPF_Edit properties back, or properties that are set through editor manipulation

// NOTE: This needs to match what we're doing in the BuildSelectedActorInfo() function

const auto CopyOptions = ( EditorUtilities::ECopyOptions::Type )(

​ EditorUtilities::ECopyOptions::CallPostEditChangeProperty |

​ EditorUtilities::ECopyOptions::CallPostEditMove |

​ EditorUtilities::ECopyOptions::OnlyCopyEditOrInterpProperties |

​ EditorUtilities::ECopyOptions::FilterBlueprintReadOnly);

const int32 CopiedPropertyCount = EditorUtilities::CopyActorProperties( SimWorldActor, EditorWorldActor, CopyOptions );

if( CopiedPropertyCount > 0 )

{

​ ++UpdatedActorCount;

​ TotalCopiedPropertyCount += CopiedPropertyCount;

​ if( FirstUpdatedActorLabel.IsEmpty() )

​ {

​ FirstUpdatedActorLabel = EditorWorldActor->GetActorLabel();

​ }

}

**SSCSEditor::OnApplyChangesToBlueprint()**

{

​ const FScopedTransaction Transaction(LOCTEXT("PushToBlueprintDefaults_Transaction", "Apply Changes to Blueprint"));

​ // The component selection state should be maintained

​ GEditor->GetSelectedComponents()->Modify();

​ Actor->Modify();

​ // Mark components that are either native or from the SCS as modified so they will be restored

​ const TArray&lt;UActorComponent\*> Components = Actor->GetComponents();

​ for (UActorComponent\* ActorComponent : Components)

{

​ if (ActorComponent->CreationMethod == EComponentCreationMethod::SimpleConstructionScript || ActorComponent->CreationMethod == EComponentCreationMethod::Native)

​ {

​ ActorComponent->Modify();

​ }

}

​ // Perform the actual copy

​ {

​ AActor\* BlueprintCDO = Actor->GetClass()->GetDefaultObject&lt;AActor>();

​ if (BlueprintCDO != NULL)

​ {

​ const auto CopyOptions = (EditorUtilities::ECopyOptions::Type)(EditorUtilities::ECopyOptions::OnlyCopyEditOrInterpProperties | EditorUtilities::ECopyOptions::PropagateChangesToArchetypeInstances);

​ NumChangedProperties = EditorUtilities::CopyActorProperties(Actor, BlueprintCDO, CopyOptions);

​ if (Actor->GetInstanceComponents().Num() > 0)

​ {

​ FKismetEditorUtilities::AddComponentsToBlueprint(Blueprint, Actor->GetInstanceComponents());

​ NumChangedProperties += Actor->GetInstanceComponents().Num();

​ Actor->ClearInstanceComponents(true);

​ }

​ if (NumChangedProperties > 0)

​ {

​ Actor = nullptr; // It is unsafe to use Actor after this point as it may have been reinstanced, so set it to null to make this obvious

​ }

​ }

​ }

}
