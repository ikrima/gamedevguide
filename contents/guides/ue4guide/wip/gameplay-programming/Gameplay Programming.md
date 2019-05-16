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

UCLASS(\[specifier, specifier, ...\], \[meta(key=value, key=value, ...)\])  
class ClassName : ParentName  
{  
GENERATED_UCLASS_BODY()  
}

### **Class Specifiers**

When declaring classes, specifiers can be added to the declaration to control how the class behaves with various aspects of the engine and editor.

- [Abstract]

- [AdvancedClassDisplay]

- [AssetRegistrySearchable]

- [AutoCollapseCategories]

- [AutoExpandCategories]

- [Blueprintable]

- [BlueprintType]

- [ClassGroup]

- [CollapseCategories]

- [Config]

- [Const]

- [ConversionRoot]

- [CustomConstructor]

- [DefaultToInstanced]

- [DependsOn]

- [Deprecated]

- [DontAutoCollapseCategories]

- [DontCollapseCategories]

- [EditInlineNew]

- [HeaderGroup]

- [HideCategories]

- [HideDropdown]

- [HideFunctions]

- [Intrinsic]

- [MinimalAPI]

- [NoExport]

- [NonTranisent]

- [NotBlueprintable]

- [NotPlaceable]

- [PerObjectConfig]

- [Placeable]

- [ShowCategories]

- [ShowFunctions]

- [Transient]

- [Within]

Constructors:

- FPostConstructInitializeProperties initializes class properties after constructor has been called

- Pattern of using static function scoped structs for complex one-time initialization in class constructors. ConstructorHelpers namespace has helpers to use in these situations

// Structure to hold one-time initialization  
                struct FConstructorStatics  
                {  
                        ConstructorHelpers::FObjectFinderOptional&lt;UTexture2D&gt; SpriteTexture;  
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
                        ArrowComponent-&gt;ArrowColor = FColor(150, 200, 255);  
                        ArrowComponent-&gt;bTreatAsASprite = true;  
                        ArrowComponent-&gt;SpriteInfo.Category = ConstructorStatics.ID_Wind;  
                        ArrowComponent-&gt;SpriteInfo.DisplayName = ConstructorStatics.NAME_Wind;  
                        ArrowComponent-&gt;AttachParent = Component;  
                        ArrowComponent-&gt;bIsScreenSizeScaled = true;  
                        ArrowComponent-&gt;bUseInEditorScaling = true;  
                }

if (SpriteComponent)  
                {  
                        SpriteComponent-&gt;Sprite = ConstructorStatics.SpriteTexture.Get();  
                        SpriteComponent-&gt;SpriteInfo.Category = ConstructorStatics.ID_Wind;  
                        SpriteComponent-&gt;SpriteInfo.DisplayName = ConstructorStatics.NAME_Wind;  
                        SpriteComponent-&gt;AttachParent = Component;  
                }

- Create components in the constructor using ConstructorHelpers::CreateComponent&lt;&gt;()

> ##### **Function Specifiers**
>
> When declaring functions, specifiers can be added to the declaration to control how the function behaves with various aspects of the engine and editor.

- [BlueprintAuthorityOnly]

- [BlueprintCallable]

- [BlueprintCosmetic]

- [BlueprintImplementableEvent]

- [BlueprintNativeEvent]

- [BlueprintPure]

- [Category]

- [Client]

- [CustomThunk]

- [Exec]

- [NetMulticast]

- [Reliable]

- [Server]

- [Unreliable]

> _From &lt;<https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/index.html>&gt;_

> **Delegates**
>
> Delegates allow you to call member functions on C++ objects in a generic, yet type-safe way. Using delegates, you can dynamically bind to a member function of an arbitrary object, then call functions on the object, even if the caller does not know the object's type.
>
> It is perfectly safe to copy delegate objects. Delegates can be passed around by value but this is generally not recommended since they do have to allocate memory on the heap. **You should always pass delegates by reference when possible.**
>
> Both single-cast and multi-cast delegates are supported, as well as **"dynamic" delegates which can be safely serialized to disk.**

- Single-cast

- [Multi-cast]

- [Events]

- [Dynamic (UObject, serializable)]

> See the [Delegates] page for reference and usage information.
>
> _From &lt;<https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/index.html>&gt;_

**Timer Management**

Timers are managed in a global FTimerManager, outside the confines of AActor, and can have any of the full range of delegate types assigned. There are several functions in FTimerManager available for managing timers. It is safe to use these functions inside of a timer delegate as the system is ok with manipulating timers while handling a timer. This means, for example, it is ok to set or clear timers inside a timer delegate.

The AActor::GetWorldTimerManager() function is used to access the timer manager instance for the current world.
