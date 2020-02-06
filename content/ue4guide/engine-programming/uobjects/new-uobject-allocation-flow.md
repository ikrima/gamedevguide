---
sortIndex: 4
sidebar: ue4guide
---

# UObject Creation/Initialization

## NewObject Summary

1. Quickly find out whether an object with the same name already exists;

2. If it exists, then destruct it, and use the memory block m;

3. If there is no object with the same name, the memory block m is allocated according to the Class reflection information;

4. The constructor ObjectBase is called on memory block m.

5. Finally, we call the constructor of the desired class on memory block m where the UObjectBase(UClass* InClass, EObjectFlags InFlags, EInternalObjectFlags InInternalFlags, UObject *InOuter, FName InName) functions complete the object registration. The following analysis of the function to understand the object management.

## Allocation, Construction, & Initialization Details

Reference from: <https://www.cnblogs.com/wellbye/p/5808894.html>

1. NewObject

   In addition to some condition detections, the previous counterpart of StaticConstructObject_Internal was directly adjusted.
   Here are a few parameters, the interesting is the fifth parameter Template, through which you can copy the object.

   ```cpp
   template< class T > FUNCTION_NON_NULL_RETURN_START T* NewObject(UObject* Outer, FName Name, EObjectFlags Flags = RF_NoFlags, UObject* Template = nullptr, bool bCopyTransientsFromClassDefaults = false, FObjectInstancingGraph* InInstanceGraph = nullptr) FUNCTION_NON_NULL_RETURN_END { if (Name == NAME_None)
   ```

2. StaticConstructObject_Internal: Responsible for memory allocation with `StaticAllocateObject` & object initialization

   ```cpp
   UObject* StaticConstructObject_Internal ( UClass* InClass, UObject* InOuter /*=GetTransientPackage()*/, FName InName /*=NAME_None*/, EObjectFlags InFlags /*=0*/, EInternalObjectFlags InternalSetFlags /*=0*/, UObject* InTemplate /*=NULL*/, bool bCopyTransientsFromClassDefaults /*=false*/, FObjectInstancingGraph* InInstanceGraph /*=NULL*/, bool bAssumeTemplateIsArchetype /*=false*/ )
   ```

3. StaticAllocateObject: Mainly allocates object memory, and sets name space and registration

   The first is to check whether to create a new object or replace an existing object, because there is a Name parameter passed in all the way. If you find an existing object with the same name, you will force that object to be destructed, and then reuse its space, otherwise, it will allocate space directly:

   ```cpp
   UObjectBase* FUObjectAllocator::AllocateUObject(int32 Size, int32 Alignment, bool bAllowPermanent)
   ```

   In addition to this main task, there are many other things, such as managing connections between objects, notifications when creating objects in asynchronous threads, and so on.

   ```cpp
   UObject* StaticAllocateObject ( UClass* InClass, UObject* InOuter, FName InName, EObjectFlags InFlags, EInternalObjectFlags InternalSetFlags, bool bCanRecycleSubobjects, bool* bOutRecycledSubobject )

   /** * Constructor used by StaticAllocateObject * @param InClass non NULL, this gives the class of the new object, if known at this time * @param InFlags RF_Flags to assign * @param InOuter outer for this object * @param InName name of the new object * @param InObjectArchetype archetype to assign */

   UObjectBase::UObjectBase(UClass* InClass, EObjectFlags InFlags, EInternalObjectFlags InInternalFlags, UObject *InOuter, FName InName) : ObjectFlags (InFlags)
   ```

4. With the space allocated by the former, you can construct objects here:

   ```cpp
   Result = StaticAllocateObject(InClass, InOuter, InName, InFlags, InternalSetFlags, bCanRecycleSubobjects, &bRecycledSubobject);
   (*InClass->ClassConstructor)( FObjectInitializer(Result, InTemplate, bCopyTransientsFromClassDefaults, true, InInstanceGraph) );
   ```

   Here ClassConstructor is a function pointer class member variable that every UClass has. In fact, all pointers in UClass point to a global template function:

   ```cpp
   template<class T>
   void InternalConstructor( const FObjectInitializer& X )
   {
     T::__DefaultConstructor(X);
   }
   ```

   The __DefaultConstructor in each class is also generated uniformly using macros, and the content is simply forwarded to new:

   ```cpp
   static void __DefaultConstructor(const FObjectInitializer& X) { new((EInternal*)X.GetObj())TClass(X); }
   ```

   This new form is very non-trivial, both `[(EInternal *)X.GetObj()]` passed to `operator new` and `FObjectInitializer& X` passed to the actual constructor of this class

   The latter is the actual parameter required by `InClass->ClassConstructor`, and the former is also an operator new defined in each UObject through a macro (DECLARE_CLASS):

   ```cpp
   inline void* operator new( const size_t InSize, EInternal* InMem ) \
       { \
           return (void*)InMem; \
       }
   ```

   To summarize the things that go around above are:
     - StaticAllocateObject allocates memory space Result, and then uses this as a parameter (of course, there are other parameters) to construct a `FObjectInitializer X`, where `X.GetObj` returns this memory address `Result`
     - Then use `new (Result) TClass (X)` to construct the object, specify the address on the Result, and pass X as a parameter to its constructor.

5. About FObjectInitializer

   Following the previous step, after the constructor returns, its temporary parameter [FObjectInitializer & X] is automatically destructed . Therefore, ue4 uses this step to do a lot of things, most of which are related to the internal state of the system. For management, it is difficult to understand thoroughly.

   But there is one operation that is related to the application, that is, property initialization, which is done through InitProperties:

   ```cpp
   void FObjectInitializer::InitProperties(UObject* Obj, UClass* DefaultsClass, UObject* DefaultData, bool bCopyTransientsFromClassDefaults)
   {
   　　……
       UClass* Class = Obj->GetClass();
   　　……if (!bNeedInitialize && bCanUsePostConstructLink)
       {
           // This is just a fast path for the below in the common case that we are not doing a duplicate or initializing a CDO and this is all native.
           // We only do it if the DefaultData object is NOT a CDO of the object that's being initialized. CDO data is already initialized in the
           // object's constructor.
           if (DefaultData)
           {
               if (Class->GetDefaultObject(false) != DefaultData)
               {
                   QUICK_SCOPE_CYCLE_COUNTER(STAT_InitProperties_FromTemplate);
                   for (UProperty* P = Class->PropertyLink; P; P = P->PropertyLinkNext)
                   {
                       P->CopyCompleteValue_InContainer(Obj, DefaultData);
                   }
               }
               else
               {
                   QUICK_SCOPE_CYCLE_COUNTER(STAT_InitProperties_ConfigEtcOnly);
                   // Copy all properties that require additional initialization (e.g. CPF_Config).
                   for (UProperty* P = Class->PostConstructLink; P; P = P->PostConstructLinkNext)
                   {
                       P->CopyCompleteValue_InContainer(Obj, DefaultData);
                   }
               }
           }
   　　……
   ```

   By traversing the attribute metadata recorded on the UClass, you can assign a value to each attribute of the current instance.

   What is interesting is the DefaultData parameter, which is the earliest Template parameter. Of course, if the Template is empty, the DefaultData here is the CDO of this class.

   The code clearly shows different strategies for dealing with these two situations:

   If the object to be copied is Template-> DefaultData, then all the properties on the class must be traversed, because for an actual copy target, you do not know which properties have changed (not the default values), so you must copy the entire disk

   And if it is only copied from CDO, then you only need to process the fields that have been explicitly specified in this class that may have initialization status, such as fields marked with CPF_Config, and they will go to the ini file to extract the corresponding configuration values ​​at startup.

## Global Object table

```cpp
/** * Add a newly created object to the name hash tables and the object array * * @param Name name to assign to this uobject */
void UObjectBase::AddObject(FName InName, EInternalObjectFlags InSetInternalFlags)
 { NamePrivate = InName; EInternalObjectFlags InternalFlagsToSet = InSetInternalFlags; if (!IsInGameThread())
 { InternalFlagsToSet |= EInternalObjectFlags::Async;
```

Key data structures

- FUObjectArray
- FUObjectItem
