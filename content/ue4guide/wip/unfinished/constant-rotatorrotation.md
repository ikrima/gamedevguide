---
sidebar: ue4guide
---
Constant RotatorRotation

Rotate to different end position based on initial rotation

Lerp back out in a different way

​ -Different curve

​ -Different cw rotation direction

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

void UBlueprint::GetAllGraphs(TArray&lt;UEdGraph\*>> Graphs) const

/\*\* Set of pages that combine into a single uber-graph \*/

​ UPROPERTY()

​ TArray&lt;class UEdGraph\*> UbergraphPages;

​ /\*\* Set of functions implemented for this class graphically \*/

​ UPROPERTY()

​ TArray&lt;class UEdGraph\*> FunctionGraphs;

​ /\*\* Graphs of signatures for delegates \*/

​ UPROPERTY()

​ TArray&lt;class UEdGraph\*> DelegateSignatureGraphs;

​ /\*\* Set of macros implemented for this class \*/

​ UPROPERTY()

​ TArray&lt;class UEdGraph\*> MacroGraphs;

for (UEdGraph\* CurrentGraph : Blueprint->FunctionGraphs)

​ {

​ if( CurrentGraph->GetFName() == Schema->FN_UserConstructionScript )

​ {

​ return CurrentGraph;

​ }

​ }

=========

Find references function/find function

GetFindReferenceSearchString

FindInBlueprints.h:

SFindInBlueprints::MakeSearchQuery() - to comprehensively search blueprint nodes (e.g. parameters, comments, etc)

TSharedPtr&lt; FImaginaryBlueprint> ImaginaryBlueprint(new FImaginaryBlueprint(Blueprint->GetName(), Blueprint->GetPathName(), ParentClass, Interfaces, FFindInBlueprintSearchManager::Get().QuerySingleBlueprint(Blueprint)));

​ TSharedPtr&lt; FFiBSearchInstance > SearchInstance(new FFiBSearchInstance);

​ FSearchResult SearchResult = RootSearchResult = SearchInstance->StartSearchQuery(SearchValue, ImaginaryBlueprint);

========

//Show what objects points to this, using the assetregistry

ObjectTools::ShowReferencers()

​ RetrieveReferencers( TArray&lt;FReferencerInformation>\* OutInternalReferencers, TArray&lt;FReferencerInformation>\* OutExternalReferencers);

//Show objects this points to

ObjectTools::ShowReferencedObjs(GetBlueprintObj());

​ //To differentiate between what the default class points to vs. the instance

​ ObjectTools::ShowReferencedObjs(GetBlueprintObj()->GeneratedClass);

/\*\* Gather all bps that Blueprint depends on \*/

static void GatherDependencies(const UBlueprint\* Blueprint, TSet&lt;TWeakObjectPtr&lt;UBlueprint>>& OutDependencies, TSet&lt;TWeakObjectPtr&lt;UStruct>>& OutUDSDependencies);

/\*\* Returns a list of loaded Blueprints that are dependent on the given Blueprint. \*/

static void GetDependentBlueprints(UBlueprint\* Blueprint, TArray&lt;UBlueprint\*>& DependentBlueprints, bool bRemoveSelf = true);

=========

Search Asset Registry

FAssetRegistryModule\* AssetRegistryModule = &FModuleManager::LoadModuleChecked&lt;FAssetRegistryModule>(TEXT("AssetRegistry"));

TArray&lt;FAssetData> AssetData;

FARFilter Filter;

Filter.ClassNames.Add( UBlueprint::StaticClass()->GetFName() ); //get blueprints

Filter.PackagePaths.Add("/Game/Blueprints/RoomModel"); //from location

AssetRegistryModule->Get().GetAssets(Filter, AssetData);

//AssetRegistryModule->Get().GetAssetsByClass(Class->GetFName(), AssetData);

for (TArray&lt;FAssetData>::TConstIterator PkgIter = AssetData.CreateConstIterator(); PkgIter; ++PkgIter)

{

FAssetData Asset = \*PkgIter;

UBlueprint\* BlueAsset = Cast&lt;UBlueprint>(Asset.GetAsset());

if (BlueAsset->ParentClass == ARoomConnection::StaticClass()){

GEngine->AddOnScreenDebugMessage(-1, 10.f, FColor::Red, Asset.AssetName.GetPlainNameString());

}

}

================================

Check if Actor is a BP

UBlueprint::GetBlueprintFromClass(const UClass\* InClass);

BlueprintClass->HasAnyClassFlags(CLASS_CompiledFromBlueprint)

UObject->IsA(UBlueprintGeneratedClass::StaticClass())

UClass->IsChildOf(UBlueprintGeneratedClass::StaticClass())

Find all nodes of type

TArray&lt;UK2Node_CustomEvent\*> BpCustomEvents;

FBlueprintEditorUtils::GetAllNodesOfClass&lt;UK2Node_CustomEvent>(FuncBlueprint, BpCustomEvents);

static bool GetBlueprintHierarchyFromClass(const UClass\* InClass, TArray&lt;UBlueprint\*>& OutBlueprintParents);

===============

For finding shit that exists in bad folders:

TFindObjectReferencers

ShowReferencedObjs

UObject::OutputReferencers()/RetrieveReferencers()
