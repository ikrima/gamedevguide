#### Overview of the reflection system:

<https://www.unrealengine.com/blog/unreal-property-system-reflection>

 

The type hierarchy for the property system looks like this:

> UField
>
> UStruct
>
> UClass (C++ class)
>
> UScriptStruct (C++ struct)
>
> UFunction (C++ function)
>
> UEnum (C++ enumeration)
>
> UProperty (C++ member variable or function parameter)
>
> (Many subclasses for different types)

 

UStruct is the basic type of aggregate structures (anything that contains other members, such as a C++ class, struct, or function), and shouldn’t be confused with a C++ struct (that's UScriptStruct). UClass can contain functions or properties as their children, while UFunction and UScriptStruct are limited to just properties.

 

To iterate over all members of a UStruct, use a TFieldIterator:

 

for (TFieldIterator&lt;UProperty&gt; PropIt(GetClass()); PropIt; ++PropIt)

{

UProperty\* Property = \*PropIt;

// Do something with the property

}

 

Each type has a unique set of flags (EClassFlags + HasAnyClassFlags, etc…), as well as a generic metadata storage system inherited from UField. 

 

#### **Look up / Find a property:**

FindField&lt;UProperty&gt;(**Struct**, **VarDesc**-&gt;**VarName**)

 

 

#### **Export/Import text from Uproperty:**

**Property**-&gt;ExportText\_InContainer(0, **PropertyValue**, **RowData**, **RowData**, nullptr, PPF\_None);

 

 

#### **Test for UProperty equality or if two properties are identical:**

UProperty::Identical( const void\* A, const void\* B, uint32 PortFlags=0 )

UProperty::Identical\_InContainer()

 

#### **Change UUserDefinedStruct's parent structure:**

In FStructureEditorUtils::CreateUserDefinedStruct():

((UUserDefinedStructEditorData\*)(Struct-&gt;EditorData))-&gt;NativeBase = FNativeBaseS::StaticStruct();

\* *

***Hook Into UObject/UProperty change modification delegates:***

> -[Listen on property changes and notifies/notifications:]
>
>  

**Specific callbacks:**

virtual void EditorApplyTranslation(const FVector& DeltaTranslation, bool bAltDown, bool bShiftDown, bool bCtrlDown) override;

virtual void EditorApplyRotation(const FRotator& DeltaRotation, bool bAltDown, bool bShiftDown, bool bCtrlDown) override;

virtual void EditorApplyScale(const FVector& DeltaScale, const FVector\* PivotLocation, bool bAltDown, bool bShiftDown, bool bCtrlDown) override;

virtual void PostEditMove(bool bFinished) override;

virtual void PostEditComponentMove(bool bFinished) override;

 

 

 

\* *

***How to check if a UFunction is latent:***

**bIsLatent** = (**Function**-&gt;HasMetaData(FBlueprintMetadata::MD\_Latent) != false);

 

**Export UStruct to text or ToString**

UScriptStruct\* **structClass** = FBBStadCamManip::StaticStruct();  
FString **outStr**;  
**structClass**-&gt;ExportText(**outStr**, &**stadCamManipVal**, nullptr, nullptr, PPF\_None, nullptr);

 

 

 

// Find an event with no parameters

this-&gt;GetClass()-&gt;FindFunctionByName("ReceiveBeginPlay", EIncludeSuperFlag::ExcludeSuper)UFunction\* **EventTarget** = **this**-&gt;FindFunction(**EventName**);  
if( **EventTarget** && **EventTarget**-&gt;NumParms == 0)  
{  
        **LSA**-&gt;ProcessEvent(**EventTarget**, *NULL*);  
        **bFoundEvent** = true;  
}

 

 

 

**Find Class or Ustruct by name:**

FClass\* FClasses::FindClass(const TCHAR\* ClassName) const  
UObject\* ClassPackage = ANY\_PACKAGE;

UClass\* Result = FindObject&lt;UClass&gt;(ClassPackage, ClassName);

 

*From &lt;<https://answers.unrealengine.com/questions/92651/get-blueprint-class-by-string-in-c.html>&gt;*

 

**Useful Utilities:**

Compare if two UStructs (not C++ structs but UE4 USTRUCT meaning class type, property, etc) are the same:

-   FStructUtils::ArePropertiesTheSame(PropA, PropB, false)

-   FStructUtils::TheSameLayout(const UStruct\* StructA, const UStruct\* StructB, bool bCheckPropertiesNames)

 

 

**Parse ufunction / Iterate through function parameters:**

LISTFUNCS

LISTFUNC - List details about a function including parameters and byte sizes

You can also use a field iterator (look at UFunction::IsSignatureCompatibleWith):

TFieldIterator&lt;UProperty&gt; **IteratorA**(ufunc);

 

Iterate through functions/fields:

for (TFieldIterator&lt;UFunction&gt; **FunctionIt**(this-&gt;GetClass(), EFieldIteratorFlags::ExcludeSuper); **FunctionIt**; ++**FunctionIt**)  
    {  
        UFunction\* **Function** = \***FunctionIt**;  
    }

 

 

**Iterate through all classes to find subclass:**

// Construct list of non-abstract sound node classes.

> for(TObjectIterator&lt;UClass&gt; It; It; ++It)
>
> {
>
> if(It-&gt;IsChildOf(USoundNode::StaticClass())
>
> && !It-&gt;HasAnyClassFlags(CLASS\_Abstract))
>
> {
>
> SoundNodeClasses.Add(\*It);
>
> }
>
> }
>
>  

**Compare two UFunctions for signatures:**

UFunction::IsSignatureCompatibleWith(const UFunction\* OtherFunction, uint64 IgnoreFlags) const

 

**Programmatically Create UUserDefinedStruct:**

return FStructureEditorUtils::CreateUserDefinedStruct(**InParent**, **Name**, **Flags**);

FStructureEditorUtils::AddVariable(**StructureDetailsSP**-&gt;GetUserDefinedStruct(), **InitialPinType**);

 

 

 

**Programmatically Construct Struct/UScriptStruct**

template&lt;typename T&gt;  
T ConstructTInlineValue(UScriptStruct\* **Struct**)

static void SetStructurePropertyByName(UObject\* **Object**, FName **PropertyName**, const T& **Value**)

UKismetSystemLibrary::Generic\_SetStructurePropertyByName(**Object**, **PropertyName**, &**Value**);

[Listen on property changes and notifies/notifications:]: onenote:#Detail%20Customization&section-id={37412B85-90BD-4C74-B6F2-230753E331ED}&page-id={C8BFDFFE-D107-4D63-936B-E81D8492F144}&object-id={9A92F9E1-B7DA-0D9A-1A24-63E7F8972A9A}&30&base-path=https://kitelightning-my.sharepoint.com/personal/ikrima_kiteandlightning_la/Documents/KiteLightning/Bebylon/Unreal.one
