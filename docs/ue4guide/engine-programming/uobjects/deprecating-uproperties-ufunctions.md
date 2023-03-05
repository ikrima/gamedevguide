---
sortIndex: 7
sidebar: ue4guide
---

# UP­ROP­ER­TY

- Ap­pend­ing `_DEPRECATED` to their name and re­mov­ing all meta­da­ta at­tributes.
- This will al­low blue­prints to still com­pile. I rec­om­mend re­mov­ing all us­es of the dep­re­cat­ed prop­er­ty dur­ing re­name in­stead of just refac­tor­ing the name of the sym­bol.
- Spec­i­fy DeprecatedProperty and DeprecationMessage in the UPROPERTY() macro for some ad­di­tion in­for­ma­tion to the us­er.

  ```cpp
  UPROPERTY(EditAnywhere)
  int32 Count;

  UPROPERTY(meta=(DeprecatedProperty, DeprecationMessage="Use Size instead."))
  int32 Count_DEPRECATED;
  ```

# UFUNC­TION

- Adding the meta spec­i­fiers. You do not need to re­move the oth­er spec­i­fiers here nor re­name the func­tion.

  ```cpp
  UPROPERTY(BlueprintPure)
  int GetAnswerToEverything() const {…}

  UPROPERTY(BlueprintPure, meta=(DeprecatedFunction,  DeprecationMessage="Use GetEarth() and GetAnswer() instead."))
  int GetAnswerToEverything() const {…}
  ```

# UCLASS

- These have a spe­cial Deprecated spec­i­fi­er that you should use to mark the class.
- You will need to re­name it:

  ```cpp
  UCLASS()
  class UMyObject : public UObject {
      GENERATED_BODY()
      /* ... */
  };

  UCLASS(Deprecated)
  class UDEPRECATED_MyObject : public UObject {
      GENERATED_BODY()
      /* ... */
  };
  ```

# UENUM

- These don’t seem to have grace­ful means for be­ing dep­re­cat­ed.
- In the en­gine’s code you can find enum val­ues that are dep­re­cat­ed by suf­fix­ing them with _DEPRECATED.
- That is not nec­es­sar­i­ly “grace­ful” on its own, as in it isn’t picked up by the blue­print sys­tem and will cause com­pile er­rors there.

  ```cpp
  UENUM()
  enum class EMyEnum : uint32 {
      MyValue = 0,
      YourValue = 1,
      /* ... */
  };

  // After
  /* @deprecated This was removed in version XY */
  UENUM()
  enum class EMyEnum_DEPRECATED : uint32 {
      /* @deprecated This was removed in version XY */
      MyValue_DEPRECATED = 0,
      /* @deprecated This was removed in version XY */
      YourValue_DEPRECATED = 1,
      /* ... */
  };
  ```

- To en­sure blue­prints keep com­pil­ing, you can add redi­rects, e.g. in your DefaultEngine.ini:

  ```ini
  +EnumRedirects=(OldName="/Script/MyGame.EMyEnum",
      NewName="/Script/MyGame.EMyEnum_DEPRECATED",
      ValueChanges=(("MyValue","MyValue_DEPRECATED"), ("YourValue","YourValue_DEPRECATED")))
  ```

- Blue­prints will not is­sue a warn­ing, the us­er will at least see that _DEPRECATED suf­fix. hope­ful­ly hov­er over some­thing that shows the code com­ments in a tooltip and make nec­es­sary changes.
- Un­re­al En­gine Doc­u­men­ta­tion > Pro­gram­ming Guide > Core Re­di­rects for more in­for­ma­tion on redi­rects.

# US­TRUCT

- Don’t seem to have grace­ful means of dep­re­ca­tion ei­ther. I sug­gest to ei­ther dep­re­cate the C++ side grace­ful­ly (see Non-Blue­print Types) and then dep­re­cate all the at­tributes:

  ```cpp
  // Before
  USTRUCT()
  struct FMyStruct {
      GENERATED_BODY()
      /* ... */

      UPROPERTY()
      FString Name;
  };

  // After
  USTRUCT()
  struct DEPRECATED(4.20, "MyStruct is deprecated, use YourStruct instead.") FMyStruct {
      GENERATED_BODY()
      /* ... */

      UPROPERTY(meta=(Deprecated, DeprecationMessage="MyStruct is deprecated, use YourStruct instead."))
      FString Name_DEPRECATED;
  };
  ```

# Non-Blue­print Types

- `#!cpp DEPRECATED(version, message)` macro:

  ```cpp
  virtual void foo();

  DEPRECATED(4.20, "Use bar() instead.")
  virtual void foo();
  ```
