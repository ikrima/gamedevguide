 Using netserialize for custom struct serialization

<http://www.aclockworkberry.com/custom-struct-serialization-for-networking-in-unreal-engine/>

 

-   To define your own NetSerialize and NetDeltaSerialize on a structure:

- GameplayDebuggerCategoryReplicator.h, FGameplayDebuggerNetPack, and AGameplayDebuggerCategoryReplicator  are good examples of full netserialization

  struct FGameplayDebuggerNetPack  
  class GAMEPLAYDEBUGGER\_API AGameplayDebuggerCategoryReplicator : public Aactor

 

**NetSerialization.h has lots of comments:**

/\*\*

> \* @param Ar                        FArchive to read or write from.
>
> \* @param Map                        PackageMap used to resolve references to UObject\*
>
> \* @param bOutSuccess        return value to signify if the serialization was succesfull (if false, an error will be logged by the calling function)
>
> \*
>
> \* @return return true if the serialization was fully mapped. If false, the property will be considered 'dirty' and will replicate again on the next update.
>
> \*        This is needed for UActor\* properties. If an actor's Actorchannel is not fully mapped, properties referencing it must stay dirty.
>
> \*        Note that UPackageMap::SerializeObject returns false if an object is unmapped. Generally, you will want to return false from your ::NetSerialize
>
> \* if you make any calls to ::SerializeObject that return false.
>
> \*
>
> \*/
>
> bool NetSerialize(FArchive& Ar, class UPackageMap\* Map, bool& bOutSuccess)

 

 

/\*\*

> \* @param DeltaParms        Generic struct of input parameters for delta serialization
>
> \*
>
> \* @return return true if the serialization was fully mapped. If false, the property will be considered 'dirty' and will replicate again on the next update.
>
> \*        This is needed for UActor\* properties. If an actor's Actorchannel is not fully mapped, properties referencing it must stay dirty.
>
> \*        Note that UPackageMap::SerializeObject returns false if an object is unmapped. Generally, you will want to return false from your ::NetSerialize
>
> \* if you make any calls to ::SerializeObject that return false.
>
> \*
>
> \*/
>
> bool NetDeltaSerialize(FNetDeltaSerializeInfo & DeltaParms)
