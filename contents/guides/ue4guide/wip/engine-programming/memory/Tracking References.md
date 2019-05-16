- Reference Viewer

  - Right click on node & selec\`t show referenced (objs that current obj points to/depends on) & show referencing (other objs that point to current obj)

- "obj refs name= S_Hex_Urban_Standard_03 shortest"

*From &lt;<https://www.unrealengine.com/en-US/blog/debugging-and-optimizing-memory>>*

- Show referencing property: obj refs name=/Game/Development/VRIntegrator/Blueprints/BPC_VRRadialMenu

- obj dependencies

- Right click->audit asset->size map

- Breakpoint FSoftObjectPath::SerializePath and then resave the sequence

- Print out a text export of one of the offending assets that would help - you can do this with RMB->Asset Actions->Export.

*From &lt;<https://udn.unrealengine.com/questions/427836/ulevelsequencebindingreferences-causes-unnecessary.html>>*

> Tracking Garbage Collector references to an object:
>
> static int32 URamaStaticFunctionLib::GetObjReferenceCount(UObject\* Obj, TArray&lt;UObject\*>\* OutReferredToObjects = nullptr)  
> {  
>         if(!Obj || !Obj->IsValidLowLevelFast())  
>         {  
>                 return -1;  
>         }
>
> TArray&lt;UObject\*> ReferredToObjects;                                //req outer, ignore archetype, recursive, ignore transient  
>         FReferenceFinder ObjectReferenceCollector( ReferredToObjects, Obj, false, true, true, false);  
>         ObjectReferenceCollector.FindReferences( Obj );
>
> if(OutReferredToObjects)  
>         {  
>                 OutReferredToObjects->Append(ReferredToObjects);  
>         }  
>         return OutReferredToObjects.Num();  
> }

*From &lt;&lt;<https://wiki.unrealengine.com/Garbage_Collection>*~*Count_References_To_Any_Object#Code>>*

>

- **Non-UObject References:**

> Normal, non-UObjects can also have the ability to add a reference to an object and prevent garbage collection. To do that, your object must derive from **FGCObject** and override its **AddReferencedObjects** class.
>
> class FMyNormalClass : public FGCObject  
> {  
> public:  
> UObject\* SafeObject;
>
> FMyNormalClass(UObject\* Object)  
> : SafeObject(Object)  
> {  
> }
>
> void AddReferencedObjects(FReferenceCollector& Collector) override  
> {  
> Collector.AddReferencedObject(SafeObject);  
> }  
> };

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Introduction/index.html>>*

> TStrongObjectPtr
>
> FGCObjectScopeGuard
