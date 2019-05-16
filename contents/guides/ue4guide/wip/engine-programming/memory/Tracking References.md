-   Reference Viewer

    -   Right click on node & selec\`t show referenced (objs that current obj points to/depends on) & show referencing (other objs that point to current obj)

-   "obj refs name= S\_Hex\_Urban\_Standard\_03 shortest"

*From &lt;<https://www.unrealengine.com/en-US/blog/debugging-and-optimizing-memory>&gt;*

-   Show referencing property: obj refs name=/Game/Development/VRIntegrator/Blueprints/BPC\_VRRadialMenu

-   obj dependencies

-   Right click-&gt;audit asset-&gt;size map

-   Breakpoint FSoftObjectPath::SerializePath and then resave the sequence

-   Print out a text export of one of the offending assets that would help - you can do this with RMB-&gt;Asset Actions-&gt;Export.

 

*From &lt;<https://udn.unrealengine.com/questions/427836/ulevelsequencebindingreferences-causes-unnecessary.html>&gt;*

>  
>
>  
>
> Tracking Garbage Collector references to an object:
>
> static int32 URamaStaticFunctionLib::GetObjReferenceCount(UObject\* Obj, TArray&lt;UObject\*&gt;\* OutReferredToObjects = nullptr)  
> {  
>         if(!Obj || !Obj-&gt;IsValidLowLevelFast())  
>         {  
>                 return -1;  
>         }  
> 
>         TArray&lt;UObject\*&gt; ReferredToObjects;                                //req outer, ignore archetype, recursive, ignore transient  
>         FReferenceFinder ObjectReferenceCollector( ReferredToObjects, Obj, false, true, true, false);  
>         ObjectReferenceCollector.FindReferences( Obj );  
> 
> if(OutReferredToObjects)  
>         {  
>                 OutReferredToObjects-&gt;Append(ReferredToObjects);  
>         }  
>         return OutReferredToObjects.Num();  
> }
>
>  

*From &lt;<https://wiki.unrealengine.com/Garbage_Collection_~_Count_References_To_Any_Object#Code>&gt;*

>  
>
>  

-   **Non-UObject References:**

>  
>
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
>
>  

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Introduction/index.html>&gt;*

 

> TStrongObjectPtr
>
> FGCObjectScopeGuard
