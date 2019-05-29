---
sortIndex: 1
---

C++ Macros:

- UCLASS()

- UFUNCTION()

- USTRUCT()

- UPROPERTY()

- UINTERFACE()

- GENERATED_UCLASS_BODY()

- GENERATED_USTRUCT_BODY()

- IMPLEMENT_CLASS ()

- IMPLEMENT_MODULE()

Class Declaration

UCLASS(\[specifier, specifier, ...], \[meta(key=value, key=value, ...)]) 
class ClassName : ParentName 
{ 
GENERATED_UCLASS_BODY() 
}

### Class Specifiers

When declaring classes, specifiers can be added to the declaration to control how the class behaves with various aspects of the engine and editor.

- [Abstract](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/Abstract/index.html)

- [AdvancedClassDisplay](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/S)

- [AssetRegistrySearchable](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/AssetRegistrySearchable/index.html)

- [AutoCollapseCategories](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/AutoCollapseCategories/index.html)

- [AutoExpandCategories](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/AutoExpandCategories/index.html)

- [Blueprintable](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/Blueprintable/index.html)

- [BlueprintType](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/BlueprintType/index.html)

- [ClassGroup](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/ClassGroup/index.html)

- [CollapseCategories](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/CollapseCategories/index.html)

- [Config](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/Config/index.html)

- [Const](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/Const/index.html)

- [ConversionRoot](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/ConversionRoot/index.html)

- [CustomConstructor](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/CustomConstructor/index.html)

- [DefaultToInstanced](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/DefaultToInstanced/index.html)

- [DependsOn](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/DependsOn/index.html)

- [Deprecated](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/Deprecated/index.html)

- [DontAutoCollapseCategories](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/DontAutoCollapseCategories/index.html)

- [DontCollapseCategories](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/DontCollapseCategories/index.html)

- [EditInlineNew](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/EditInlineNew/index.html)

- [HeaderGroup](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/HeaderGroup/index.html)

- [HideCategories](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/HideCategories/index.html)

- [HideDropdown](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/HideDropdown/index.html)

- [HideFunctions](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/HideFunctions/index.html)

- [Intrinsic](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/Intrinsic/index.html)

- [MinimalAPI](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/MinimalAPI/index.html)

- [NoExport](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/NoExport/index.html)

- [NonTranisent](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/NonTransient/index.html)

- [NotBlueprintable](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/NotBlueprintable/index.html)

- [NotPlaceable](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/NotPlaceable/index.html)

- [PerObjectConfig](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/PerObjectConfig/index.html)

- [Placeable](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/Placeable/index.html)

- [ShowCategories](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/ShowCategories/index.html)

- [ShowFunctions](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/ShowFunctions/index.html)

- [Transient](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/Transient/index.html)

- [Within](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/Specifiers/Within/index.html)

Constructors:

- FPostConstructInitializeProperties initializes class properties after constructor has been called

- Pattern of using static function scoped structs for complex one-time initialization in class constructors. ConstructorHelpers namespace has helpers to use in these situations

```cpp
// Structure to hold one-time initialization  
                struct FConstructorStatics  
                {  
                        ConstructorHelpers::FObjectFinderOptional&lt;UTexture2D> SpriteTexture;  
                        FName ID_Wind;  
                        FText NAME_Wind;  
                        FConstructorStatics()  
                                : SpriteTexture(TEXT("/Engine/EditorResources/S_WindDirectional"))  
                                , ID_Wind(TEXT("Wind"))  
                                , NAME_Wind(NSLOCTEXT("SpriteCategory", "Wind", "Wind"))  
                        {  
                        }  
                };  
                static FConstructorStatics ConstructorStatics;

if (ArrowComponent)  
                {  
                        ArrowComponent->ArrowColor = FColor(150, 200, 255);  
                        ArrowComponent->bTreatAsASprite = true;  
                        ArrowComponent->SpriteInfo.Category = ConstructorStatics.ID_Wind;  
                        ArrowComponent->SpriteInfo.DisplayName = ConstructorStatics.NAME_Wind;  
                        ArrowComponent->AttachParent = Component;  
                        ArrowComponent->bIsScreenSizeScaled = true;  
                        ArrowComponent->bUseInEditorScaling = true;  
                }

if (SpriteComponent)  
                {  
                        SpriteComponent->Sprite = ConstructorStatics.SpriteTexture.Get();  
                        SpriteComponent->SpriteInfo.Category = ConstructorStatics.ID_Wind;  
                        SpriteComponent->SpriteInfo.DisplayName = ConstructorStatics.NAME_Wind;  
                        SpriteComponent->AttachParent = Component;  
                }
```

- Create components in the constructor using ConstructorHelpers::CreateComponent&lt;>()

  ##### Function Specifiers

  When declaring functions, specifiers can be added to the declaration to control how the function behaves with various aspects of the engine and editor.

- [BlueprintAuthorityOnly](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/BlueprintAuthorityOnly/index.html)

- [BlueprintCallable](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/BlueprintCallable/index.html)

- [BlueprintCosmetic](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/BlueprintCosmetic/index.html)

- [BlueprintImplementableEvent](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/BlueprintImplementableEvent/index.html)

- [BlueprintNativeEvent](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/BlueprintNativeEvent/index.html)

- [BlueprintPure](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/BlueprintPure/index.html)

- [Category](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/Category/index.html)

- [Client](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/Client/index.html)

- [CustomThunk](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/CustomThunk/index.html)

- [Exec](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/Exec/index.html)

- [NetMulticast](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/NetMulticast/index.html)

- [Reliable](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/Reliable/index.html)

- [Server](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/Server/index.html)

- [Unreliable](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/Unreliable/index.html)

  *Reference From <https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/index.html>*

#### Delegates

 Delegates allow you to call member functions on C++ objects in a generic, yet type-safe way. Using delegates, you can dynamically bind to a member function of an arbitrary object, then call functions on the object, even if the caller does not know the object's type.

 It is perfectly safe to copy delegate objects. Delegates can be passed around by value but this is generally not recommended since they do have to allocate memory on the heap. **You should always pass delegates by reference when possible.**

 Both single-cast and multi-cast delegates are supported, as well as **"dynamic" delegates which can be safely serialized to disk.**

- Single-cast

- [Multi-cast](https://docs.unrealengine.com/en-us/Programming/UnrealArchitecture/Delegates/Multicast)

- [Events](https://docs.unrealengine.com/en-us/Programming/UnrealArchitecture/Delegates/Events)

- [Dynamic (UObject, serializable)](https://docs.unrealengine.com/en-us/Programming/UnrealArchitecture/Delegates/Dynamic)

  See the [Delegates](https://docs.unrealengine.com/en-us/Programming/UnrealArchitecture/Delegates) page for reference and usage information.

  *Reference From <https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/index.html>*

#### Timer Management

Timers are managed in a global FTimerManager, outside the confines of AActor, and can have any of the full range of delegate types assigned. There are several functions in FTimerManager available for managing timers. It is safe to use these functions inside of a timer delegate as the system is ok with manipulating timers while handling a timer. This means, for example, it is ok to set or clear timers inside a timer delegate.

The AActor::GetWorldTimerManager() function is used to access the timer manager instance for the current world.

*Reference From <https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Timers/index.html>*
