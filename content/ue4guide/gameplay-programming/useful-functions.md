---
sortIndex: 8
sidebar: ue4guide
---

```cpp
virtual void RerunConstructionScripts();

UActorComponent* CreateComponentFromTemplate(UActorComponent* **Template**, const FName **InName** = NAME_None );

UActorComponent* CreateComponentFromTemplateData(…);
```

LoadedLevel will not be set on the ULevelStreaming object until the level is fully loaded. And at that same point the ULevelStreaming.OnLevelLoaded will be broadcast.

*Reference From <https://udn.unrealengine.com/questions/356697/beginplay-order.html>*

#### Duplicate or create an instance of an existing object. Can also be used to create a duplicate new asset that's a subclass of a new asset:

```cpp
*Bag = (UPEBag*)StaticConstructObject (BagContentRef->StaticClass(), GetTransientPackage(), DataAssetTemplate);*

COREUOBJECT_API UObject* StaticConstructObject( UClass* Class, UObject* InOuter=(UObject*)GetTransientPackage(), FName Name=NAME_None, EObjectFlags SetFlags=RF_NoFlags, UObject* Template=NULL, bool bCopyTransientsFromClassDefaults=false, struct FObjectInstancingGraph* InstanceGraph=NULL );
```

*Reference From <https://forums.unrealengine.com/showthread.php?4287-creating-instances-for-editor-DataAssets>*

#### Prevent or Disable creating a default subobject:

```cpp
ObjectInitializer.DoNotCreateDefaultSubobject(TEXT("Sprite"))
```
