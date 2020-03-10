---
sortIndex: 4
sidebar: ue4guide
---


# Adding Blueprint Static Analysis Tool

The easiest way to augment the compiler would be to write a `UBlueprintCompilerExtension`, just derive from that type and when you want to enable your extension (e.g. only when a commandlet is running, ini setting is set, or unconditionally at CDO creation time) just call FBlueprintCompilationManager::RegisterCompilerExtension. The first parameter is the type of blueprints you're interested in - e.g. UBlueprint::StaticClass() if you want to instrument all blueprint compilation.

Reference <https://udn.unrealengine.com/questions/513017/blueprint-static-analysis.html>


# Adding Mapcheck for Blueprints


Check KismetEditorUtilities.h/BlueprintEditorUtils.h/BlueprintEditorUtils.cpp/ComponentEditorUtils.h

GetSimpleConstructionScript(USceneComponent const\* **Component**);

FindCorrespondingSCSNode(USceneComponent const\* **ComponentObj**);

virtual void EditorReplacedActor(AActor\* **OldActor**) {}

Useful editor tool class:

FBlueprintEditorUtils

===========================================

```cpp
void UBlueprint::GetAllGraphs(TArray&lt;UEdGraph\*>> Graphs) const

/\*\* Set of pages that combine into a single uber-graph \*/

 UPROPERTY()

 TArray&lt;class UEdGraph\*> UbergraphPages;

 /\*\* Set of functions implemented for this class graphically \*/

 UPROPERTY()

 TArray&lt;class UEdGraph\*> FunctionGraphs;

 /\*\* Graphs of signatures for delegates \*/

 UPROPERTY()

 TArray&lt;class UEdGraph\*> DelegateSignatureGraphs;

 /\*\* Set of macros implemented for this class \*/

 UPROPERTY()

 TArray&lt;class UEdGraph\*> MacroGraphs;

for (UEdGraph\* CurrentGraph : Blueprint->FunctionGraphs)

 {

 if( CurrentGraph->GetFName() == Schema->FN_UserConstructionScript )
 {

 return CurrentGraph;

 }

 }
```

=========

**Find references function/find function**

```cpp
GetFindReferenceSearchString

FindInBlueprints.h:

SFindInBlueprints::MakeSearchQuery() - to comprehensively search blueprint nodes (e.g. parameters, comments, etc)

TSharedPtr&lt; FImaginaryBlueprint> ImaginaryBlueprint(new FImaginaryBlueprint(Blueprint->GetName(), Blueprint->GetPathName(), ParentClass, Interfaces, FFindInBlueprintSearchManager::Get().QuerySingleBlueprint(Blueprint)));

 TSharedPtr&lt; FFiBSearchInstance > SearchInstance(new FFiBSearchInstance);

 FSearchResult SearchResult = RootSearchResult = SearchInstance->StartSearchQuery(SearchValue, ImaginaryBlueprint);
```

========

```cpp
//Show what objects points to this, using the assetregistry

ObjectTools::ShowReferencers()

 RetrieveReferencers( TArray&lt;FReferencerInformation>\* OutInternalReferencers, TArray&lt;FReferencerInformation>\* OutExternalReferencers);

//Show objects this points to

ObjectTools::ShowReferencedObjs(GetBlueprintObj());

 //To differentiate between what the default class points to vs. the instance

 ObjectTools::ShowReferencedObjs(GetBlueprintObj()->GeneratedClass);

/\*\* Gather all bps that Blueprint depends on \*/

static void GatherDependencies(const UBlueprint\* Blueprint, TSet&lt;TWeakObjectPtr&lt;UBlueprint>>& OutDependencies, TSet&lt;TWeakObjectPtr&lt;UStruct>>& OutUDSDependencies);

/\*\* Returns a list of loaded Blueprints that are dependent on the given Blueprint. \*/

static void GetDependentBlueprints(UBlueprint\* Blueprint, TArray&lt;UBlueprint\*>& DependentBlueprints, bool bRemoveSelf = true);
```

=========
**Search Asset Registry**

```cpp
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
```

================================

**Check if Actor is a Blueprint**

```cpp
UBlueprint::GetBlueprintFromClass(const UClass\* InClass);

BlueprintClass->HasAnyClassFlags(CLASS_CompiledFromBlueprint)

UObject->IsA(UBlueprintGeneratedClass::StaticClass())

UClass->IsChildOf(UBlueprintGeneratedClass::StaticClass())

Find all nodes of type

TArray&lt;UK2Node_CustomEvent\*> BpCustomEvents;

FBlueprintEditorUtils::GetAllNodesOfClass&lt;UK2Node_CustomEvent>(FuncBlueprint, BpCustomEvents);

static bool GetBlueprintHierarchyFromClass(const UClass\* InClass, TArray&lt;UBlueprint\*>& OutBlueprintParents);
```

===============

**For finding shit that exists in bad folders:**

```cpp
TFindObjectReferencers

ShowReferencedObjs

UObject::OutputReferencers()/RetrieveReferencers()
```
