Your component isn't being serialized properly because you're not telling the engine to keep it around. If nothing has a reference to the static mesh component (i.e. a UProperty), then the engine will clean it up and remove it.

Using the following implementation for FindOrCreateStaticLodMesh I was able to have cooking succeed and have the component be preserved across level changes ( LodComponent is the name of my private UStaticMeshComponent marked with UPROPERTY()):

1. UStaticMeshComponent \*UDestructibleComponent::FindOrCreateStaticLodMesh()

1. {

1. static const FName NAME_StaticMeshComponent = TEXT("StaticLodMesh");

1.

5)  if (HasAnyFlags(RF_ClassDefaultObject | RF_ArchetypeObject))

6)  {

7)  return nullptr;

8)  }

9)

10. // If we have a reference to the component, just return it

10. if (LodComponent)

10. {

10. return LodComponent;

10. }

10.

16) // Try to find the component on the owner actor

17) LodComponent = GetOwner()->FindComponentByClass&lt;UStaticMeshComponent>();

18) if (LodComponent)

19) {

20) return LodComponent;

21) }

22)

23. // Now create the component

23. LodComponent = NewObject&lt;UStaticMeshComponent>(GetOwner(), NAME_StaticMeshComponent);

23. LodComponent->SetupAttachment(GetOwner()->GetRootComponent());

23. LodComponent->CreationMethod = EComponentCreationMethod::Instance;

23. LodComponent->RegisterComponent();

23. return LodComponent;

23. }

> *From &lt;<https://udn.unrealengine.com/questions/457850/view.html>>*
>
> [gerardo.perez]  ( Disruptive Games Inc. ) 3 days ago Newest
>
> We ended up adding it to the actor's InstanceComponents list, which is serialized. Using a uproperty on the component alone was not working at some point but I'm not aware of the details. Anyway, thank you. Our problem is resolved.
>
> *From &lt;<https://udn.unrealengine.com/questions/457850/view.html>>*

[gerardo.perez]: https://udn.unrealengine.com/users/14846/view.html
