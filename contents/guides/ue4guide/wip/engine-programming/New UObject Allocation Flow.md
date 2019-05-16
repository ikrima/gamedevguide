After tracking debugging, the following analysis of the following related functions:

 

1.  NewObject

template&lt; class T &gt; FUNCTION\_NON\_NULL\_RETURN\_START T\* NewObject(UObject\* Outer, FName Name, EObjectFlags Flags = RF\_NoFlags, UObject\* Template = nullptr, bool bCopyTransientsFromClassDefaults = false, FObjectInstancingGraph\* InInstanceGraph = nullptr) FUNCTION\_NON\_NULL\_RETURN\_END { if (Name == NAME\_None)

>  

2. StaticConstructObject\_Internal



UObject\* StaticConstructObject\_Internal ( UClass\* InClass, UObject\* InOuter /\*=GetTransientPackage()\*/, FName InName /\*=NAME\_None\*/, EObjectFlags InFlags /\*=0\*/, EInternalObjectFlags InternalSetFlags /\*=0\*/, UObject\* InTemplate /\*=NULL\*/, bool bCopyTransientsFromClassDefaults /\*=false\*/, FObjectInstancingGraph\* InInstanceGraph /\*=NULL\*/, bool bAssumeTemplateIsArchetype /\*=false\*/ )





3. StaticAllocateObject: Mainly allocates object memory, and sets name space and registration



UObject\* StaticAllocateObject ( UClass\* InClass, UObject\* InOuter, FName InName, EObjectFlags InFlags, EInternalObjectFlags InternalSetFlags, bool bCanRecycleSubobjects, bool\* bOutRecycledSubobject )

 

/** * Constructor used by StaticAllocateObject * @param InClass non NULL, this gives the class of the new object, if known at this time * @param InFlags RF_Flags to assign * @param InOuter outer for this object * @param InName name of the new object * @param InObjectArchetype archetype to assign */ 

UObjectBase::UObjectBase(UClass* InClass, EObjectFlags InFlags, EInternalObjectFlags InInternalFlags, UObject *InOuter, FName InName) : ObjectFlags (InFlags)

 

Create process summary

 

1.  Quickly find out whether an object with the same name already exists;

2.  If it exists, then destruct it, and use the memory block m;

3.  If there is no object with the same name, the memory block m is allocated according to the Class reflection information;

4.  The constructor ObjectBase is called on memory block m.

5.  Finally, we call the constructor of the desired class on memory block m where the UObjectBase(UClass\* InClass, EObjectFlags InFlags, EInternalObjectFlags InInternalFlags, UObject \*InOuter, FName InName) functions complete the object registration. The following analysis of the function to understand the object management.

 

 

### **Global object table**

 

/\*\* \* Add a newly created object to the name hash tables and the object array \* \* @param Name name to assign to this uobject \*/ void UObjectBase::AddObject(FName InName, EInternalObjectFlags InSetInternalFlags) { NamePrivate = InName; EInternalObjectFlags InternalFlagsToSet = InSetInternalFlags; if (!IsInGameThread()) { InternalFlagsToSet |= EInternalObjectFlags::Async; // 在其它线程创建标志, 主要用在异步加载} if (ObjectFlags & RF\_MarkAsRootSet)

 

Key data structure

-   FUObjectArray

-   FUObjectItem
