---
sortIndex: 1
sidebar: ue4guide
---

# UE4 Reflection Overview

<https://www.unrealengine.com/blog/unreal-property-system-reflection>

The type hierarchy for the property system looks like this:

- UField
  - UStruct
    - UClass (C++ class)
    - UScriptStruct (C++ struct)
    - UFunction (C++ function)
  - UEnum (C++ enumeration)
  - UProperty (C++ member variable or function parameter)
    - (Many subclasses for different types)

UStruct is the basic type of aggregate structures (anything that contains other members, such as a C++ class, struct, or function), and shouldn’t be confused with a C++ struct (that's UScriptStruct). UClass can contain functions or properties as their children, while UFunction and UScriptStruct are limited to just properties.

# UScriptStructs

## Manipulation

The main place to access a lot of manipulation helpers is through `UScriptStruct::ICppStructOps`. Some useful bits:

```cpp
UScriptStruct::ICppStructOps& StructCppOps = FES2ArchTypeEntitiesTable::StaticStruct()->GetCppStructOps();
int32 StructSize = StructCppOps->GetSize();
int32 StructAlignment = StructCppOps->GetAlignment();
void* Allocation = FMemory::Malloc(StructSize, StructAlignment);
StructCppOps->Construct(Allocation);
StructCppOps->Serialize(...)
StructCppOps->NetSerialize(...)
```

### Initialize Struct

```cpp
StructMemory = (uint8*)FMemory::Malloc(ActualStruct->GetStructureSize());
ActualStruct->InitializeStruct(StructMemory);
```

### Copy Struct

```cpp
if (ProcAnimComponent && OutInitValueStore)
{
     void* RowPtr = Table->FindRowUnchecked(RowName);
     if (RowPtr != NULL)
     {
         UScriptStruct* StructType = Table->RowStruct;
         if (StructType != NULL)
         {
             StructType->CopyScriptStruct(OutRowPtr, RowPtr);
             bFoundRow = true;
         }
     }
}
```

### Destroy Struct

```cpp
UScriptStruct* structType = FESCompSumType::GetStructType(CompStructType);
            structType->DestroyStruct(StructData);
```

### Reflection through Struct Params apart

```cpp
FMovieSceneEvalTemplatePtr& operator=(const FMovieSceneEvalTemplatePtr& RHS)
{
  if (RHS.IsValid())
  {
    UScriptStruct::ICppStructOps& StructOps = *RHS->GetScriptStruct().GetCppStructOps();

    void* Allocation = Reserve(StructOps.GetSize(), StructOps.GetAlignment());
    StructOps.Construct(Allocation);
    StructOps.Copy(Allocation, &RHS.GetValue(), 1);
  }

  return *this;
}
```

Reference: <https://forums.unrealengine.com/community/community-content-tools-and-tutorials/27351-tutorial-how-to-accept-wildcard-structs-in-your-ufunctions>

## Iterate over UStruct members

To iterate over all members of a UStruct, use a TFieldIterator:

```cpp
for (TFieldIterator<UProperty> PropIt(GetClass()); PropIt; ++PropIt)
{
  UProperty* Property = *PropIt;
  // Do something with the property
}
```

Each type has a unique set of flags (EClassFlags + HasAnyClassFlags, etc…), as well as a generic metadata storage system inherited from UField.

## Look up / Find a property

```cpp
FindField<UProperty>(Struct, VarDesc->VarName)
```

## Export/Import text from UProperty

```cpp
Property->ExportText_InContainer(0, PropertyValue, RowData, RowData, nullptr, PPF_None);
```

## Comparison

### Compare UProperty Equality

If two properties are identical:

```cpp
UProperty::Identical( const void* A, const void* B, uint32 PortFlags=0 )
UProperty::Identical_InContainer()
```

### Compare UStruct instances

CompareScriptStruct

### Compare UStructs Type Equality

Compare if two UStructs types (not C++ structs but UE4 USTRUCT meaning class type, property, etc) are the same:

```cpp
FStructUtils::ArePropertiesTheSame(PropA, PropB, false)
FStructUtils::TheSameLayout(const UStruct* StructA, const UStruct* StructB, bool bCheckPropertiesNames)
```

## Hook Into UObject/UProperty change modification delegates

[Listen on property changes and notifies/notifications:]

### Special Callbacks

```cpp
virtual void EditorApplyTranslation(const FVector& DeltaTranslation, bool bAltDown, bool bShiftDown, bool bCtrlDown) override;
virtual void EditorApplyRotation(const FRotator& DeltaRotation, bool bAltDown, bool bShiftDown, bool bCtrlDown) override;
virtual void EditorApplyScale(const FVector& DeltaScale, const FVector* PivotLocation, bool bAltDown, bool bShiftDown, bool bCtrlDown) override;
virtual void PostEditMove(bool bFinished) override;
virtual void PostEditComponentMove(bool bFinished) override;
```

## Export UStruct to String

```cpp
UScriptStruct* structClass = FBBStadCamManip::StaticStruct();
FString outStr;
structClass->ExportText(outStr, &stadCamManipVal, nullptr, nullptr, PPF_None, nullptr);
```

# UFunctions

## Introspect UFunction

```ue4c
LISTFUNCS
LISTFUNC - List details about a function including parameters and byte sizes
```

These are helpful functions to look at for examples:

```cpp
UFunction::IsSignatureCompatibleWith
TFieldIterator<UProperty> IteratorA(ufunc);
```

## Check if a UFunction is latent

```cpp
bIsLatent = (Function->HasMetaData(FBlueprintMetadata::MD_Latent) != false);
```

## Find No Parameters Event

```cpp
this->GetClass()->FindFunctionByName("ReceiveBeginPlay", EIncludeSuperFlag::ExcludeSuper)
UFunction* EventTarget = this->FindFunction(EventName);
if( EventTarget && EventTarget->NumParms == 0)
{
  LSA->ProcessEvent(EventTarget, NULL);
  bFoundEvent = true;
}
```

## UFunction Parameters


### Calling UFunction Through Reflection

<https://answers.unrealengine.com/questions/7732/a-sample-for-calling-a-ufunction-with-reflection.html>

### Compare UFunctions Signatures

```cpp
UFunction::IsSignatureCompatibleWith(const UFunction* OtherFunction, uint64 IgnoreFlags) const
```

### Iterate UFunction Parameters

```cpp
for (TFieldIterator<UFunction> FunctionIt(this->GetClass(), EFieldIteratorFlags::ExcludeSuper); FunctionIt; ++FunctionIt)
{
  UFunction* Function = *FunctionIt;
}
```

### Retrieve UFunction Parameters Default Value

>Hi,
>
>This cannot be known in general, but you can check the UFunction's "CPP_Default\_" metadata to see if a given parameter has a default argument, and the value of that default.
>
>However, only default arguments of certain types and values can be parsed and, as it's metadata, this information only exists in builds with WITH_METADATA defined, which is basically editor-only.
>
>Hope this helps,
>
>Steve

*Reference From <https://answers.unrealengine.com/questions/545342/how-can-i-know-ufunction-contain-how-many-paramete.html?sort=oldest&lang=zh-CN>*

# UClass

## Iterate Class Inheritance Hierarchy

Finding a specific subclass in a class' hierarchy chain:

```cpp
// Construct list of non-abstract sound node classes.
for(TObjectIterator<UClass> It; It; ++It)
{
  if(It->IsChildOf(USoundNode::StaticClass())
    && !It->HasAnyClassFlags(CLASS_Abstract))
  {
    SoundNodeClasses.Add(*It);
  }
}
```

## Find Class or UStruct by name

```cpp
FClass* FClasses::FindClass(const TCHAR* ClassName) const
UObject* ClassPackage = ANY_PACKAGE;
UClass* Result = FindObject<UClass>(ClassPackage, ClassName);
```

*Reference From <https://answers.unrealengine.com/questions/92651/get-blueprint-class-by-string-in-c.html>*

# User Defined Structs

## Programmatically Create UUserDefinedStruct

```cpp
return FStructureEditorUtils::CreateUserDefinedStruct(InParent, Name, Flags);
FStructureEditorUtils::AddVariable(StructureDetailsSP->GetUserDefinedStruct(), InitialPinType);
```

## Change UUserDefinedStruct's Parent Struct

```cpp
FStructureEditorUtils::CreateUserDefinedStruct():
  ((UUserDefinedStructEditorData*)(Struct->EditorData))->NativeBase = FNativeBaseS::StaticStruct();
```

## Programmatically Construct Struct/UScriptStruct

```cpp
template<typename T>
T ConstructTInlineValue(UScriptStruct* Struct)
static void SetStructurePropertyByName(UObject* Object, FName PropertyName, const T& Value)
UKismetSystemLibrary::Generic_SetStructurePropertyByName(Object, PropertyName, &Value);
```
