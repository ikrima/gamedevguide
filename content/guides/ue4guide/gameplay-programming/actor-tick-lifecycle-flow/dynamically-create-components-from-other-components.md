---
sortIndex: 5
---

Your component isn't being serialized properly because you're not telling the engine to keep it around. If nothing has a reference to the static mesh component (i.e. a UProperty), then the engine will clean it up and remove it.

Using the following implementation for FindOrCreateStaticLodMesh I was able to have cooking succeed and have the component be preserved across level changes ( LodComponent is the name of my private UStaticMeshComponent marked with UPROPERTY()):

```cpp
UStaticMeshComponent \*UDestructibleComponent::FindOrCreateStaticLodMesh()

{

static const FName NAME_StaticMeshComponent = TEXT("StaticLodMesh");



 if (HasAnyFlags(RF_ClassDefaultObject | RF_ArchetypeObject))

  {

 return nullptr;

  }

// If we have a reference to the component, just return it

if (LodComponent)

{

return LodComponent;

}



 // Try to find the component on the owner actor

 LodComponent = GetOwner()->FindComponentByClass&lt;UStaticMeshComponent>();

 if (LodComponent)

 {

 return LodComponent;

 }


 // Now create the component

 LodComponent = NewObject&lt;UStaticMeshComponent>(GetOwner(), NAME_StaticMeshComponent);

 LodComponent->SetupAttachment(GetOwner()->GetRootComponent());

 LodComponent->CreationMethod = EComponentCreationMethod::Instance;

 LodComponent->RegisterComponent();

 return LodComponent;

 }
```

*Reference From <https://udn.unrealengine.com/questions/457850/view.html>*

[gerardo.perez](https://accounts.unrealengine.com/login/index?response_type=code&client_id=bc742d26f8314469aa997373f39c876e)  ( Disruptive Games Inc. ) 3 days ago Newest

We ended up adding it to the actor's InstanceComponents list, which is serialized. Using a uproperty on the component alone was not working at some point but I'm not aware of the details. Anyway, thank you. Our problem is resolved.

*Reference From <https://udn.unrealengine.com/questions/457850/view.html>*
