---
sortIndex: 2
---

**Custom TAssetPtr**

UHT knows about TAssetPtr and allows it to be used in a property even though it isn't declared as a USTRUCT. You can modify UHT to allow your custom asset pointer to work by going to HeaderParser.cpp and finding this line:

1. const bool bIsAssetPtrTemplate = VarType.Matches(TEXT("TAssetPtr"));

1. ... and then changing it to this:

1. const bool bIsAssetPtrTemplate = VarType.Matches(TEXT("TAssetPtr")) || VarType.Matches(TEXT("TCustomAssetPtr"));


Hope that helps.

*Reference From <https://udn.unrealengine.com/questions/364023/custom-tassetptr.html>*


**Custom UProperties:**

Adding generalised template support to UHT and the reflection system is considerably non-trivial.

But are you specifically wanting TOptional property support, rather than general templates? This is also non-trivial, but much more feasible.

You you could hack together a UOptionalProperty as a copy of something like UArrayProperty (as an optional is basically a zero-or-1-sized array).

Start in UnrealHeaderTool\\Private\\HeaderParser.cpp and search for "TArray" (with quotes) to find where it is first parsed. Then search for all instances of UArrayProperty in the rest of the UnrealHeaderTool source to see how it's handled and how the code generation is performed. You should just be able to copy the pattern here.

From the code generator, you'll see that you need to add something like an UE4CodeGen_Private::FOptionalPropertyParams to match the existing UE4CodeGen_Private::FArrayPropertyParams, with an associated new entry in UE4CodeGen_Private::EPropertyClass. All of these are in UObjectGlobals.h.

Then in UObjectGlobals.cpp, you should see where they get used at engine startup by UE4CodeGen_Private::ConstructUProperty(), where instances of each property type is constructed for runtime reflection.

Then you will likely need to look at all uses of TArray in the editor properties and engine in order to add proper support, unless you plan to synthesise structs at engine startup (like your FBBDamageEffectOptional) in order to simulate that support.

I hope this is sufficient information to get you going,

*Reference From <https://udn.unrealengine.com/questions/441180/view.html>*