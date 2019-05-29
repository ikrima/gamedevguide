---
sortIndex: 4
---

#### Overview of the reflection system:

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

To iterate over all members of a UStruct, use a TFieldIterator:

```cpp
for (TFieldIterator&lt;UProperty> PropIt(GetClass()); PropIt; ++PropIt)

{

UProperty\* Property = \*PropIt;

// Do something with the property

}
```

Each type has a unique set of flags (EClassFlags + HasAnyClassFlags, etc…), as well as a generic metadata storage system inherited from UField.

#### Look up / Find a property:\*\*

```cpp
FindField&lt;UProperty>(**Struct**, **VarDesc**->**VarName**)
```

#### Export/Import text from Uproperty:\*\*

```cpp
**Property**->ExportText_InContainer(0, **PropertyValue**, **RowData**, **RowData**, nullptr, PPF_None);
```

#### Test for UProperty equality or if two properties are identical:\*\*

```cpp
UProperty::Identical( const void\* A, const void\* B, uint32 PortFlags=0 )

UProperty::Identical_InContainer()
```

#### **Change UUserDefinedStruct's parent structure:**

```cpp
In FStructureEditorUtils::CreateUserDefinedStruct():

((UUserDefinedStructEditorData\*)(Struct->EditorData))->NativeBase = FNativeBaseS::StaticStruct();

\* \*
```

#### Hook Into UObject/UProperty change modification delegates:

[Listen on property changes and notifies/notifications:]

**Specific callbacks:**

```cpp
virtual void EditorApplyTranslation(const FVector& DeltaTranslation, bool bAltDown, bool bShiftDown, bool bCtrlDown) override;

virtual void EditorApplyRotation(const FRotator& DeltaRotation, bool bAltDown, bool bShiftDown, bool bCtrlDown) override;

virtual void EditorApplyScale(const FVector& DeltaScale, const FVector\* PivotLocation, bool bAltDown, bool bShiftDown, bool bCtrlDown) override;

virtual void PostEditMove(bool bFinished) override;

virtual void PostEditComponentMove(bool bFinished) override;
```

#### How to check if a UFunction is latent:

```cpp
**bIsLatent** = (**Function**->HasMetaData(FBlueprintMetadata::MD_Latent) != false);

**Export UStruct to text or ToString**

UScriptStruct\* **structClass** = FBBStadCamManip::StaticStruct();  
FString **outStr**;  
**structClass**->ExportText(**outStr**, &**stadCamManipVal**, nullptr, nullptr, PPF_None, nullptr);

// Find an event with no parameters

this->GetClass()->FindFunctionByName("ReceiveBeginPlay", EIncludeSuperFlag::ExcludeSuper)UFunction\* **EventTarget** = **this**->FindFunction(**EventName**);  
if( **EventTarget** && **EventTarget**->NumParms == 0)  
{  
        **LSA**->ProcessEvent(**EventTarget**, *NULL*);  
        **bFoundEvent** = true;  
}
```

**Find Class or Ustruct by name:**

```cpp
FClass\* FClasses::FindClass(const TCHAR\* ClassName) const  
UObject\* ClassPackage = ANY_PACKAGE;

UClass\* Result = FindObject&lt;UClass>(ClassPackage, ClassName);
```

*Reference From <https://answers.unrealengine.com/questions/92651/get-blueprint-class-by-string-in-c.html>*

##### Useful Utilities:

Compare if two UStructs (not C++ structs but UE4 USTRUCT meaning class type, property, etc) are the same:

- FStructUtils::ArePropertiesTheSame(PropA, PropB, false)
- FStructUtils::TheSameLayout(const UStruct\* StructA, const UStruct\* StructB, bool bCheckPropertiesNames)

##### Parse ufunction / Iterate through function parameters:

LISTFUNCS

LISTFUNC - List details about a function including parameters and byte sizes

You can also use a field iterator (look at UFunction::IsSignatureCompatibleWith):

TFieldIterator&lt;UProperty> **IteratorA**(ufunc);

Iterate through functions/fields:

```cpp
for (TFieldIterator&lt;UFunction> **FunctionIt**(this->GetClass(), EFieldIteratorFlags::ExcludeSuper); **FunctionIt**; ++**FunctionIt**)  
    {  
        UFunction\* **Function** = \***FunctionIt**;  
    }
```

**Iterate through all classes to find subclass:**

```cpp
// Construct list of non-abstract sound node classes.

 for(TObjectIterator&lt;UClass> It; It; ++It)

 {

 if(It->IsChildOf(USoundNode::StaticClass())

 && !It->HasAnyClassFlags(CLASS_Abstract))

 {

 SoundNodeClasses.Add(\*It);

 }

 }
```

**Compare two UFunctions for signatures:**

```cpp
UFunction::IsSignatureCompatibleWith(const UFunction\* OtherFunction, uint64 IgnoreFlags) const
```

**Programmatically Create UUserDefinedStruct:**

```cpp
return FStructureEditorUtils::CreateUserDefinedStruct(**InParent**, **Name**, **Flags**);

FStructureEditorUtils::AddVariable(**StructureDetailsSP**->GetUserDefinedStruct(), **InitialPinType**);
```

**Programmatically Construct Struct/UScriptStruct**

```cpp
template&lt;typename T>  
T ConstructTInlineValue(UScriptStruct\* **Struct**)

static void SetStructurePropertyByName(UObject\* **Object**, FName **PropertyName**, const T& **Value**)

UKismetSystemLibrary::Generic_SetStructurePropertyByName(**Object**, **PropertyName**, &**Value**);
```
