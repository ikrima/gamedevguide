Keep Simulation or Play In Editor changes:

-   Hit k keyboard shortcut or right click on actor in viewport/world outliner and select keep simulation changes from context menu

-   Uses UObject CopyProperties()

 



 PerformSetCommand(): Sets values on object or all objects of a class and also updates CDO (through DefaultObject-&gt;SaveConfig()

​		GlobalSetProperty(): Sets property based on text



On Saving Property Changes During Gameplay/Keep Simulation Changes

 

#### **OnKeepSimulationChanges()**

// Find our counterpart actor

AActor\* EditorWorldActor = EditorUtilities::GetEditorWorldCounterpartActor( SimWorldActor );

// We only want to copy CPF\_Edit properties back, or properties that are set through editor manipulation

// NOTE: This needs to match what we're doing in the BuildSelectedActorInfo() function

const auto CopyOptions = ( EditorUtilities::ECopyOptions::Type )(

​	EditorUtilities::ECopyOptions::CallPostEditChangeProperty |

​	EditorUtilities::ECopyOptions::CallPostEditMove |

​	EditorUtilities::ECopyOptions::OnlyCopyEditOrInterpProperties |

​	EditorUtilities::ECopyOptions::FilterBlueprintReadOnly);

const int32 CopiedPropertyCount = EditorUtilities::CopyActorProperties( SimWorldActor, EditorWorldActor, CopyOptions );

 

if( CopiedPropertyCount &gt; 0 )

{

​	++UpdatedActorCount;

​	TotalCopiedPropertyCount += CopiedPropertyCount;

 

​	if( FirstUpdatedActorLabel.IsEmpty() )

​	{

​	FirstUpdatedActorLabel = EditorWorldActor-&gt;GetActorLabel();

​	}

}

 

**SSCSEditor::OnApplyChangesToBlueprint()**

{

​	const FScopedTransaction Transaction(LOCTEXT("PushToBlueprintDefaults\_Transaction", "Apply Changes to Blueprint"));

 

​	// The component selection state should be maintained

​	GEditor-&gt;GetSelectedComponents()-&gt;Modify();

 

​	Actor-&gt;Modify();

 

​	// Mark components that are either native or from the SCS as modified so they will be restored

​	const TArray&lt;UActorComponent\*&gt; Components = Actor-&gt;GetComponents();

​	for (UActorComponent\* ActorComponent : Components)

{

​	if (ActorComponent-&gt;CreationMethod == EComponentCreationMethod::SimpleConstructionScript || ActorComponent-&gt;CreationMethod == EComponentCreationMethod::Native)

​	{

​	ActorComponent-&gt;Modify();

​	}

}

 

​	// Perform the actual copy

​	{

​	AActor\* BlueprintCDO = Actor-&gt;GetClass()-&gt;GetDefaultObject&lt;AActor&gt;();

​	if (BlueprintCDO != NULL)

​	{

​	const auto CopyOptions = (EditorUtilities::ECopyOptions::Type)(EditorUtilities::ECopyOptions::OnlyCopyEditOrInterpProperties | EditorUtilities::ECopyOptions::PropagateChangesToArchetypeInstances);

​	NumChangedProperties = EditorUtilities::CopyActorProperties(Actor, BlueprintCDO, CopyOptions);

​	if (Actor-&gt;GetInstanceComponents().Num() &gt; 0)

​	{

​	FKismetEditorUtilities::AddComponentsToBlueprint(Blueprint, Actor-&gt;GetInstanceComponents());

​	NumChangedProperties += Actor-&gt;GetInstanceComponents().Num();

​	Actor-&gt;ClearInstanceComponents(true);

​	}

​	if (NumChangedProperties &gt; 0)

​	{

​	Actor = nullptr; // It is unsafe to use Actor after this point as it may have been reinstanced, so set it to null to make this obvious

​	}

​	}

​	}

}
