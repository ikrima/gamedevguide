Your component isn't being serialized properly because you're not telling the engine to keep it around. If nothing has a reference to the static mesh component (i.e. a UProperty), then the engine will clean it up and remove it.

Using the following implementation for FindOrCreateStaticLodMesh I was able to have cooking succeed and have the component be preserved across level changes ( LodComponent is the name of my private UStaticMeshComponent marked with UPROPERTY()):

1.  UStaticMeshComponent \*UDestructibleComponent::FindOrCreateStaticLodMesh()

2.  {

3.  static const FName NAME_StaticMeshComponent = TEXT("StaticLodMesh");

4.

5)  if (HasAnyFlags(RF_ClassDefaultObject | RF_ArchetypeObject))

6)  {

7)  return nullptr;

8)  }

9)

10. // If we have a reference to the component, just return it

11. if (LodComponent)

12. {

13. return LodComponent;

14. }

15.

16) // Try to find the component on the owner actor

17) LodComponent = GetOwner()-&gt;FindComponentByClass&lt;UStaticMeshComponent&gt;();

18) if (LodComponent)

19) {

20) return LodComponent;

21) }

22)

23. // Now create the component

24. LodComponent = NewObject&lt;UStaticMeshComponent&gt;(GetOwner(), NAME_StaticMeshComponent);

25. LodComponent-&gt;SetupAttachment(GetOwner()-&gt;GetRootComponent());

26. LodComponent-&gt;CreationMethod = EComponentCreationMethod::Instance;

27. LodComponent-&gt;RegisterComponent();

28. return LodComponent;

29. }

> _From &lt;<https://udn.unrealengine.com/questions/457850/view.html>&gt;_
>
> [gerardo.perez]  ( Disruptive Games Inc. ) 3 days ago Newest
>
> We ended up adding it to the actor's InstanceComponents list, which is serialized. Using a uproperty on the component alone was not working at some point but I'm not aware of the details. Anyway, thank you. Our problem is resolved.
>
> _From &lt;<https://udn.unrealengine.com/questions/457850/view.html>&gt;_

[gerardo.perez]: https://udn.unrealengine.com/users/14846/view.html
