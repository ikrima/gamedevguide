---
sortIndex: 7
---

**UPROPERTY**

- Appending \_DEPRECATED to their name and removing all metadata attributes.

- This will allow blueprints to still compile. I recommend removing all uses of the deprecated property during rename instead of just refactoring the name of the symbol.

- Specify DeprecatedProperty and DeprecationMessage in the UPROPERTY() macro for some ad­di­tion in­for­ma­tion to the us­er.

```cpp
*UPROPERTY(EditAnywhere)*

*int32 Count;*

*UPROPERTY(meta=(DeprecatedProperty, DeprecationMessage="Use Size instead."))*

*int32 Count_DEPRECATED;*
```

**UFUNCTION**

- Adding the meta specifiers. You do not need to remove the other specifiers here nor rename the function.

```cpp
*UPROPERTY(BlueprintPure)*

*int GetAnswerToEverything() const {…}*

*UPROPERTY(BlueprintPure, meta=(DeprecatedFunction, DeprecationMessage="Use GetEarth() and GetAnswer() instead."))*

*int GetAnswerToEverything() const {…}*
```

**UCLASS**

- These have a special Deprecated specifier that you should use to mark the class.

- You will need to rename it:

```cpp
*UCLASS()*

*class UMyObject : public UObject {*

*GENERATED_BODY()*

*/\* ... \*/*

*};*

*UCLASS(Deprecated)*

*class UDEPRECATED_MyObject : public UObject {*

*GENERATED_BODY()*

*/\* ... \*/*

*};*
```

**UENUM**

- These don’t seem to have graceful means for being deprecated.

- In the engine’s code you can find enum values that are deprecated by suffixing them with \_DEPRECATED.

- That is not necessarily “graceful” on its own, as in it isn’t picked up by the blueprint system and will cause compile errors there.

```cpp
*UENUM()*

*enum class EMyEnum : uint32 {*

*MyValue = 0,*

*YourValue = 1,*

*/\* ... \*/*

*};*

*// After*

*/\* @deprecated This was removed in version XY \*/*

*UENUM()*

*enum class EMyEnum_DEPRECATED : uint32 {*

*/\* @deprecated This was removed in version XY \*/*

*MyValue_DEPRECATED = 0,*

*/\* @deprecated This was removed in version XY \*/*

*YourValue_DEPRECATED = 1,*

*/\* ... \*/*

*};*
```

- To ensure blueprints keep compiling, you can add redirects, e.g. in your DefaultEngine.ini:

```cpp
*+EnumRedirects=(OldName="/Script/MyGame.EMyEnum",*

*NewName="/Script/MyGame.EMyEnum_DEPRECATED",*

*ValueChanges=(("MyValue","MyValue_DEPRECATED"), ("YourValue","YourValue_DEPRECATED")))*
```

- Blueprints will not issue a warning, the user will at least see that \_DEPRECATED suffix. hopefully hover over something that shows the code com­ments in a tooltip and make necessary changes.

- Unreal Engine Documentation > Programming Guide > Core Redirects for more information on redirects.

**USTRUCT**

- Don’t seem to have graceful means of deprecation either. I suggest to either deprecate the C++ side gracefully (see Non-Blueprint Types) and then deprecate all the attributes:

```cpp
*// Before*

*USTRUCT()*

*struct FMyStruct {*

*GENERATED_BODY()*

*/\* ... \*/*

*UPROPERTY()*

*FString Name;*

*};*
```

```cpp
 *// After*

 *USTRUCT()*

 *struct DEPRECATED(4.20, "MyStruct is deprecated, use YourStruct instead.") FMyStruct {*

 *GENERATED_BODY()*

 */\* ... \*/*

 *UPROPERTY(meta=(Deprecated, DeprecationMessage="MyStruct is deprecated, use YourStruct instead."))*

 *FString Name_DEPRECATED;*

 *};*
```

**Non-Blueprint Types**

```cpp
- DEPRECATED(version, message) macro:

 *virtual void foo();*

 *DEPRECATED(4.20, "Use bar() instead.")*

 *virtual void foo();*
```
