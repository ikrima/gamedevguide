Then learn how to add component of any class, once you learn that you will be able place any component you like. you do this:

In header:

UPROPERTY()  
UClassOfTheComponent\* Component;

Then you want to create component:

Component = ConstructObject&lt;UClassOfTheComponent&gt;(UClassOfTheComponent::StaticClass(), GetOwner(), NAME\_None, RF\_Transient);

Then set up variables that set up the component (in case of UChildActorComponent you set ChildActorClass which will spawn actor, or ChildActor if you got ready one). If you deal with SceneComponent you need to attach it to something, so you can copy rama code here:

Component-&gt;AttachTo(this-&gt;ShipMesh, primaryWeaponSlots\[i\].socketName, EAttachLocation::SnapToTarget);

And with every component you need to register it

Component-&gt;RegisterComponent();

 

*From &lt;<https://answers.unrealengine.com/questions/221783/add-child-actor-component-in-c.html>&gt;*

 

Spawn/respawn/Create/recreate/modify Component at runtime:

void AMyComponentSpawner::PostEditChangeProperty(struct FPropertyChangedEvent& PropertyChangedEvent)  
{  
//Get all of our components  
TArray&lt;UActorComponent\*&gt; MyComponents;  
GetComponents(MyComponents);

//Get the name of the property that was changed  
FName PropertyName = (PropertyChangedEvent.Property != nullptr) ? PropertyChangedEvent.Property-&gt;GetFName() : NAME\_None;

// We test using GET\_MEMBER\_NAME\_CHECKED so that if someone changes the property name  
// in the future this will fail to compile and we can update it.  
if ((PropertyName == GET\_MEMBER\_NAME\_CHECKED(AMyComponentSpawner, MyMesh)))  
{  
FMultiComponentReregisterContext ReregisterContext(MyComponents);

for (UActorComponent\* Comp : MyComponents)  
{  
if (UStaticMeshComponent\* MeshComp = Cast&lt;UStaticMeshComponent&gt;(Comp))  
{  
MeshComp-&gt;SetStaticMesh(MyMesh); // Update the component to the new mesh  
}  
}  
}

// Call the base class version  
Super::PostEditChangeProperty(PropertyChangedEvent);  
}  
\#endif

 

*From &lt;<https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AActor/PostEditChangeProperty/>&gt;*
