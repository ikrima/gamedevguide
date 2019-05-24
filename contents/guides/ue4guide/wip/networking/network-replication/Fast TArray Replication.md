---
sortIndex: 7
---
*Reference From <https://udn.unrealengine.com/questions/164217/how-can-i-improve-performance-of-tarray-replicatio.html>*


#### Overview

- It’s a faster way to replicate large TArrays of structs. For a large dataset of about 10K, we saw server cpu time go from 3ms to 0.05ms to replicate the very large array when it had changed. When the array has not changed, there is very little performance overhead.

- You also get add/delete/change events on the client side, and there isn’t the ‘remove from middle of array causes everything after it to be resent’ problem that generic TArray replication has.

- The tradeoff is you have to mark elements in the array as dirty when game code changes them. List order is also not guaranteed to be preserved between client/server in all cases.

- You opt into this type of replication by setting up your structure a certain way. See NetSerialization.h and below.

  Keep in mind its still important to optimize your replicated data. The data set being replciated should be as small as possible. Even though the replication only sends the bare minimum of what data has changed, it still has to chew through the entire set of data to find out what changed.


#### Using

 Below is an example of using fast TArray in a structure called FExampleItemEntry (the same code can be found in NetSerialization.h for easier copy/paste). The TArray of these structs is then wrapped in another structure, FExampleArray. Follow the step in the comments to make use of it in your own structure.
```cpp
 /** Step 1: Make your struct inherit from FFastArraySerializerItem */

 USTRUCT()

 struct FExampleItemEntry : public FFastArraySerializerItem

 {

 GENERATED_USTRUCT_BODY()

 // Your data:

 UPROPERTY()

 int32 ExampleIntProperty;

 UPROPERTY()

 float ExampleFloatProperty;

 /** Optional functions you can implement for client side notification of changes to items */

 void PreReplicatedRemove();

 void PostReplicatedAdd();

 void PostReplicatedChange();

 };

 /** Step 2: You MUST wrap your TArray in another struct that inherits from FFastArraySerializer */

 USTRUCT()

 struct FExampleArray: public FFastArraySerializer

 {

 GENERATED_USTRUCT_BODY()

 UPROPERTY()

 TArray&lt;FExampleItemEntry> Items; /** Step 3: You MUST have a TArray named Items of the struct you made in step 1. */

 /** Step 4: Copy this, replace example with your names */

 bool NetDeltaSerialize(FNetDeltaSerializeInfo & DeltaParms)

 {

 return FastArrayDeltaSerialize&lt;FExampleItemEntry>( Items, DeltaParms );

 }

 };

 /** Step 5: Copy and paste this struct trait, replacing FExampleArray with your Step 2 struct. */

 template<>

 struct TStructOpsTypeTraits< FExampleArray > : public TStructOpsTypeTraitsBase

 {

 enum

 {

 WithNetDeltaSerializer = true,

 };

 };

```


Now to use, just:

- Declare a UPROPERTY of your FExampleArray (step 2) type.

- You MUST call MarkItemDirty on the FExampleArray when you change an item in the array. You pass in a reference to the item you dirtied.

- See FFastArraySerializer::MarkItemDirty.

- You should call MarkArrayDirty on the FExampleArray when you remove an item from the array. It does not need to be called exactly 1 time per deletion (for example if you are removing 10 items in a function, call MarkArrayDirty once at the start or end of the function is sufficient).

- In your classes GetReplicationList, use DOREPSTRUCT(YourClass, YourArrayStructPropertyName);

- You can implement these functions in your structure (step 1) to get notifies before add/deletes/removes:

- void PreReplicatedRemove()

- void PostReplicatedAdd()

- void PostReplicatedChange()

  Thats it!
