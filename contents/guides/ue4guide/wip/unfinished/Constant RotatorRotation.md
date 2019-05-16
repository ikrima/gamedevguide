Constant RotatorRotation

Rotate to different end position based on initial rotation

 

Lerp back out in a different way

​	-Different curve

​	-Different cw rotation direction

 

Debug Level

 

Add Custom World Settings

 

//TODO: ikrimae: Check to make sure that we have the necessary components in our level

// -GameMode is ABBGameModeBase

// -LevelScripts are ABBLevelScript

// -ArenaLevels have all their objects set to static mobility

// -StadiumLevels have all their objects set to movable mobility

// -We have placed instances for all of our manager classes in the level (e.g. ABBStateMachineManager)

//Make sure mapcheck checks against all visible levels

===========================================

 

 

void UBlueprint::GetAllGraphs(TArray&lt;UEdGraph\*&gt;& Graphs) const

 

/\*\* Set of pages that combine into a single uber-graph \*/

​		UPROPERTY()

​		TArray&lt;class UEdGraph\*&gt; UbergraphPages;

 

​	/\*\* Set of functions implemented for this class graphically \*/

​	UPROPERTY()

​	TArray&lt;class UEdGraph\*&gt; FunctionGraphs;

 

​	/\*\* Graphs of signatures for delegates \*/

​	UPROPERTY()

​	TArray&lt;class UEdGraph\*&gt; DelegateSignatureGraphs;

 

​	/\*\* Set of macros implemented for this class \*/

​	UPROPERTY()

​	TArray&lt;class UEdGraph\*&gt; MacroGraphs;

 

for (UEdGraph\* CurrentGraph : Blueprint-&gt;FunctionGraphs)

​	{

​	if( CurrentGraph-&gt;GetFName() == Schema-&gt;FN\_UserConstructionScript )

​		{

​	return CurrentGraph;

​		}

​	}

=========

Find references function/find function

 

GetFindReferenceSearchString

 

FindInBlueprints.h:

SFindInBlueprints::MakeSearchQuery() - to comprehensively search blueprint nodes (e.g. parameters, comments, etc)

TSharedPtr&lt; FImaginaryBlueprint&gt; ImaginaryBlueprint(new FImaginaryBlueprint(Blueprint-&gt;GetName(), Blueprint-&gt;GetPathName(), ParentClass, Interfaces, FFindInBlueprintSearchManager::Get().QuerySingleBlueprint(Blueprint)));

​	TSharedPtr&lt; FFiBSearchInstance &gt; SearchInstance(new FFiBSearchInstance);

​	FSearchResult SearchResult = RootSearchResult = SearchInstance-&gt;StartSearchQuery(SearchValue, ImaginaryBlueprint);

 

========

//Show what objects points to this, using the assetregistry

ObjectTools::ShowReferencers()

​	RetrieveReferencers( TArray&lt;FReferencerInformation&gt;\* OutInternalReferencers, 	TArray&lt;FReferencerInformation&gt;\* OutExternalReferencers);

 

//Show objects this points to

ObjectTools::ShowReferencedObjs(GetBlueprintObj());

​	//To differentiate between what the default class points to vs. the instance

​	ObjectTools::ShowReferencedObjs(GetBlueprintObj()-&gt;GeneratedClass);

 

/\*\* Gather all bps that Blueprint depends on \*/

static void GatherDependencies(const UBlueprint\* Blueprint, TSet&lt;TWeakObjectPtr&lt;UBlueprint&gt;&gt;& OutDependencies, TSet&lt;TWeakObjectPtr&lt;UStruct&gt;&gt;& OutUDSDependencies);

 

/\*\* Returns a list of loaded Blueprints that are dependent on the given Blueprint. \*/

static void GetDependentBlueprints(UBlueprint\* Blueprint, TArray&lt;UBlueprint\*&gt;& DependentBlueprints, bool bRemoveSelf = true);

 

=========

Search Asset Registry

 

FAssetRegistryModule\* AssetRegistryModule = &FModuleManager::LoadModuleChecked&lt;FAssetRegistryModule&gt;(TEXT("AssetRegistry"));

TArray&lt;FAssetData&gt; AssetData;

FARFilter Filter;

Filter.ClassNames.Add( UBlueprint::StaticClass()-&gt;GetFName() ); //get blueprints

Filter.PackagePaths.Add("/Game/Blueprints/RoomModel"); //from location

AssetRegistryModule-&gt;Get().GetAssets(Filter, AssetData);

//AssetRegistryModule-&gt;Get().GetAssetsByClass(Class-&gt;GetFName(), AssetData);

for (TArray&lt;FAssetData&gt;::TConstIterator PkgIter = AssetData.CreateConstIterator(); PkgIter; ++PkgIter)

{

FAssetData Asset = \*PkgIter;

UBlueprint\* BlueAsset = Cast&lt;UBlueprint&gt;(Asset.GetAsset());

if (BlueAsset-&gt;ParentClass == ARoomConnection::StaticClass()){

GEngine-&gt;AddOnScreenDebugMessage(-1, 10.f, FColor::Red, Asset.AssetName.GetPlainNameString());

}

}

================================

 

Check if Actor is a BP

UBlueprint::GetBlueprintFromClass(const UClass\* InClass);

BlueprintClass-&gt;HasAnyClassFlags(CLASS\_CompiledFromBlueprint)

UObject-&gt;IsA(UBlueprintGeneratedClass::StaticClass())

UClass-&gt;IsChildOf(UBlueprintGeneratedClass::StaticClass())

 

Find all nodes of type

TArray&lt;UK2Node\_CustomEvent\*&gt; BpCustomEvents;

FBlueprintEditorUtils::GetAllNodesOfClass&lt;UK2Node\_CustomEvent&gt;(FuncBlueprint, BpCustomEvents);

static bool GetBlueprintHierarchyFromClass(const UClass\* InClass, TArray&lt;UBlueprint\*&gt;& OutBlueprintParents);

 

===============

 

 

For finding shit that exists in bad folders:

TFindObjectReferencers

ShowReferencedObjs

UObject::OutputReferencers()/RetrieveReferencers()
