---
sortIndex: 4
---

After tracking debugging, the following analysis of the following related functions:

1. NewObject

   template&lt; class T > FUNCTION_NON_NULL_RETURN_START T\* NewObject(UObject\* Outer, FName Name, EObjectFlags Flags = RF_NoFlags, UObject\* Template = nullptr, bool bCopyTransientsFromClassDefaults = false, FObjectInstancingGraph\* InInstanceGraph = nullptr) FUNCTION_NON_NULL_RETURN_END { if (Name == NAME_None)



2. StaticConstructObject_Internal

   UObject\* StaticConstructObject_Internal ( UClass\* InClass, UObject\* InOuter /\*=GetTransientPackage()\*/, FName InName /\*=NAME_None\*/, EObjectFlags InFlags /\*=0\*/, EInternalObjectFlags InternalSetFlags /\*=0\*/, UObject\* InTemplate /\*=NULL\*/, bool bCopyTransientsFromClassDefaults /\*=false\*/, FObjectInstancingGraph\* InInstanceGraph /\*=NULL\*/, bool bAssumeTemplateIsArchetype /\*=false\*/ )

   

3. StaticAllocateObject: Mainly allocates object memory, and sets name space and registration

   UObject\* StaticAllocateObject ( UClass\* InClass, UObject\* InOuter, FName InName, EObjectFlags InFlags, EInternalObjectFlags InternalSetFlags, bool bCanRecycleSubobjects, bool\* bOutRecycledSubobject )

   

   /\*\* * Constructor used by StaticAllocateObject * @param InClass non NULL, this gives the class of the new object, if known at this time * @param InFlags RF_Flags to assign * @param InOuter outer for this object * @param InName name of the new object * @param InObjectArchetype archetype to assign \*/

   

   UObjectBase::UObjectBase(UClass* InClass, EObjectFlags InFlags, EInternalObjectFlags InInternalFlags, UObject *InOuter, FName InName) : ObjectFlags (InFlags)



Create process summary

1. Quickly find out whether an object with the same name already exists;

1. If it exists, then destruct it, and use the memory block m;

1. If there is no object with the same name, the memory block m is allocated according to the Class reflection information;

1. The constructor ObjectBase is called on memory block m.

1. Finally, we call the constructor of the desired class on memory block m where the UObjectBase(UClass\* InClass, EObjectFlags InFlags, EInternalObjectFlags InInternalFlags, UObject \*InOuter, FName InName) functions complete the object registration. The following analysis of the function to understand the object management.

### **Global object table**

/\*\* \* Add a newly created object to the name hash tables and the object array \* \* @param Name name to assign to this uobject \*/ void UObjectBase::AddObject(FName InName, EInternalObjectFlags InSetInternalFlags) { NamePrivate = InName; EInternalObjectFlags InternalFlagsToSet = InSetInternalFlags; if (!IsInGameThread()) { InternalFlagsToSet |= EInternalObjectFlags::Async; // 在其它线程创建标志, 主要用在异步加载} if (ObjectFlags & RF_MarkAsRootSet)

Key data structure

- FUObjectArray

- FUObjectItem
