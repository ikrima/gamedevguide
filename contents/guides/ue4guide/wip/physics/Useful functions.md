---
sortIndex: 8
---

Useful functions

Tuesday, April 4, 2017

4:23 PM

virtual void RerunConstructionScripts();

UActorComponent\* CreateComponentFromTemplate(UActorComponent\* **Template**, const FName **InName** = NAME_None );

UActorComponent\* CreateComponentFromTemplateData(…);

LoadedLevel will not be set on the ULevelStreaming object until the level is fully loaded. And at that same point the ULevelStreaming.OnLevelLoaded will be broadcast.

_From &lt;<https://udn.unrealengine.com/questions/356697/beginplay-order.html>&gt;_

Duplicate or create an instance of an existing object. Can also be used to create a duplicate new asset that's a subclass of a new asset:

_Bag = (UPEBag\*)StaticConstructObject (BagContentRef-&gt;StaticClass(), GetTransientPackage(), DataAssetTemplate);_

COREUOBJECT_API UObject\* StaticConstructObject( UClass\* Class, UObject\* InOuter=(UObject\*)GetTransientPackage(), FName Name=NAME_None, EObjectFlags SetFlags=RF_NoFlags, UObject\* Template=NULL, bool bCopyTransientsFromClassDefaults=false, struct FObjectInstancingGraph\* InstanceGraph=NULL );

_From &lt;<https://forums.unrealengine.com/showthread.php?4287-creating-instances-for-editor-DataAssets>&gt;_

Prevent or Disable creating a default subobject:

ObjectInitializer.DoNotCreateDefaultSubobject(TEXT("Sprite"))
