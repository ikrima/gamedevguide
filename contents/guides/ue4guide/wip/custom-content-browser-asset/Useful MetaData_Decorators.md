A lot of these aren't specified in ObjectMacros.h

 

UPARAM(ref)

UPARAM(hidden)

UPARAM(DisplayName="X (Roll)")

 

 

**Get MetaData from a variable or uproperty:**

Property-&gt;HasMetaData(AnimationInputMetadataName)

 

 

**Blueprint Private/Protected:**

> You should be able to add BlueprintPrivate/Protected meta data to you UPROPERTY() decl, like this:
>
> UPROPERTY(..., meta=(BlueprintPrivate="true"))
>
>  
>
> To Mark blueprint properties as protected, just declare them natively inside of protected access specifier
>
>  
>
> For functions, you can do meta=(BlueprintProtected)
>
>  

**BlueprintThreadSafe/NotBlueprintThreadSafe:**

> Only valid on Blueprint Function Libraries. This specifier marks the functions in this class as callable on non-game threads in Animation Blueprints.

 

**RestrictedToClasses**

Used by Blueprint Function Library classes to restrict usage to the classes named in the list.

 

**CallableWithoutWorldContext:**

Used for BlueprintCallable functions that have a WorldContext pin to indicate that the function can be called even if its class does not implement the GetWorld function.

 

**KismetHideOverrides="Event1, Event2, .."**

List of blueprint events that are not be allowed to be overridden.

 

**UsesHierarchy**

Indicates the class uses hierarchical data. Used to instantiate hierarchical editing features in Details panels.

 

**HiddenByDefault**

Pins in Make Struct and Break Struct nodes are hidden by default.

 

<table><thead><tr class="header"><th><p><strong>AdvancedDisplay</strong>="Parameter1, Parameter2, .."</p><p>The comma-separated list of parameters will show up as advanced pins (requiring UI expansion).</p></th><th> </th></tr></thead><tbody><tr class="odd"><td><p><strong>AdvancedDisplay</strong>=N</p><p>Replace N with a number, and all parameters after the Nth will show up as advanced pins (requiring UI expansion). E.g. 'AdvancedDisplay=2' will mark all but the first two parameters as advanced).</p></td><td> </td></tr></tbody></table>

**ArrayParm="Parameter1, Parameter2, .."**

Indicates that a BlueprintCallable function should use a Call Array Function node and that the listed parameters should be treated as wild card array properties.

 

**ArrayTypeDependentParams="Parameter"**

When ArrayParm is used, this specifier indicates one parameter which will determine the types of all parameters in the ArrayParm list.

 

**BlueprintAutocast**

Used only by static BlueprintPure functions from a Blueprint Function Library. A Cast node will be automatically added for the return type and the type of the first parameter of the function.

 

**CallableWithoutWorldContext**

Used for BlueprintCallable functions that have a WorldContext pin to indicate that the function can be called even if its class does not implement the GetWorld function.

 

**CommutativeAssociativeBinaryOperator**

Indicates that a BlueprintCallable function should use the Commutative Associative Binary node. This node lacks pin names, but features an "Add Pin" button that creates additional input pins.

 

**DefaultToSelf**

For BlueprintCallable functions, this indicates that the Object property's named default value should be the self context of the node.

 

**ExpandEnumAsExecs="Parameter"**

For BlueprintCallable functions, this indicates that one input execution pin should be created for each entry in the enum used by the parameter. That the named parameter must be of an enumerated type recognized by the Engine via the UENUM tag.

 

**HidePin="Parameter"**

For BlueprintCallable functions, this indicates that the parameter pin should be hidden from the user's view. Note that only one parameter pin per function can be hidden in this manner.

 

**UnsafeDuringActorConstruction**

This function is not safe to call during Actor construction.

 

**WorldContext="Parameter"**

Used by BlueprintCallable functions to indicate which parameter determines the World that the operation is occurring within.

 

**CustomStructureParam="Parameter1, Parameter2, ..")**

The listed parameters are all treated as wildcards. This specifier requires the UFUNCTION-level specifier, CustomThunk, which will require the user to provide a custom exec function. In this function, the parameter types can be checked and the appropriate function calls can be made based on those parameter types. The base UFUNCTION should never be called, and should assert or log an error if it is.

 

### **Enum Bitflags/Bitmasks**

By default, UENUM Bitflags use the enum value as the bit index. To change it to use the value as a mask,

Create the UENUM like this:

> UENUM(BlueprintType, meta=(Bitflags, UseEnumValuesAsMaskValuesInEditor="true"))
>
> enum class EBBCombatMovementPhase : uint8
>
> {
>
> StartPhase = 0x01,
>
> ChargePhase = 0x02,
>
> ActivePhase = 0x04,
>
> ImpactStallPhase = 0x08,
>
> RecoveryPhase = 0x10,
>
> All = 0xff,
>
> };
>
>  

The property needs to be specified as:

> UPROPERTY(EditAnywhere, BlueprintReadWrite, Category=Moveset, meta=(Bitmask, BitmaskEnum="EBBCombatMovementPhase"))
>
> int32 AllowedMovement = int32(EBBCombatMovementPhase::StartPhase | EBBCombatMovementPhase::ChargePhase | EBBCombatMovementPhase::ActivePhase);

 

 

 

### **Property Metadata Specifiers**

<table><thead><tr class="header"><th><strong>Property Meta Tag</strong></th><th><strong>Effect</strong></th></tr></thead><tbody><tr class="odd"><td>AllowAbstract="true/false"</td><td>Used for Subclass and SoftClass properties. Indicates whether abstract class types should be shown in the class picker.</td></tr><tr class="even"><td>AllowedClasses="Class1, Class2, .."</td><td>Used for FSoftObjectPath properties. Comma delimited list that indicates the class type(s) of assets to be displayed in the Asset picker.</td></tr><tr class="odd"><td>AllowPreserveRatio</td><td>Used for FVector properties. It causes a ratio lock to be added when displaying this property in details panels.</td></tr><tr class="even"><td>ArrayClamp="ArrayProperty"</td><td>Used for integer properties. Clamps the valid values that can be entered in the UI to be between 0 and the length of the array property named.</td></tr><tr class="odd"><td>AssetBundles</td><td>Used for SoftObjectPtr or SoftObjectPath properties. List of Bundle names used inside Primary Data Assets to specify which Bundles this reference is part of.</td></tr><tr class="even"><td>BlueprintBaseOnly</td><td>Used for Subclass and SoftClass properties. Indicates whether only Blueprint classes should be shown in the class picker.</td></tr><tr class="odd"><td>BlueprintCompilerGeneratedDefaults</td><td>Property defaults are generated by the Blueprint compiler and will not be copied when the CopyPropertiesForUnrelatedObjects function is called post-compile.</td></tr><tr class="even"><td>ClampMin="N"</td><td>Used for float and integer properties. Specifies the minimum value N that may be entered for the property.</td></tr><tr class="odd"><td>ClampMax="N"</td><td>Used for float and integer properties. Specifies the maximum value N that may be entered for the property.</td></tr><tr class="even"><td>ConfigHierarchyEditable</td><td>This property is serialized to a config (.ini) file, and can be set anywhere in the config hierarchy.</td></tr><tr class="odd"><td>ContentDir</td><td>Used by FDirectoryPath properties. Indicates that the path will be picked using the Slate-style directory picker inside the Content folder.</td></tr><tr class="even"><td>DisplayName="Property Name"</td><td>The name to display for this property, instead of the code-generated name.</td></tr><tr class="odd"><td>DisplayThumbnail="true"</td><td>Indicates that the property is an Asset type and it should display the thumbnail of the selected Asset.</td></tr><tr class="even"><td>EditCondition="BooleanPropertyName"</td><td>Names a boolean property that is used to indicate whether editing of this property is disabled. Putting "!" before the property name inverts the test.</td></tr><tr class="odd"><td>EditFixedOrder</td><td>Keeps the elements of an array from being reordered by dragging.</td></tr><tr class="even"><td>ExactClass="true"</td><td>Used for FSoftObjectPath properties in conjunction with AllowedClasses. Indicates whether only the exact classes specified in AllowedClasses can be used, or if subclasses are also valid.</td></tr><tr class="odd"><td>ExposeFunctionCategories="Category1, Category2, .."</td><td>Specifies a list of categories whose functions should be exposed when building a function list in the Blueprint Editor.</td></tr><tr class="even"><td>ExposeOnSpawn="true"</td><td>Specifies whether the property should be exposed on a Spawn Actor node for this class type.</td></tr><tr class="odd"><td>FilePathFilter="filetype"</td><td>Used by FFilePath properties. Indicates the path filter to display in the file picker. Common values include "uasset" and "umap", but these are not the only possible values.</td></tr><tr class="even"><td>HideAlphaChannel</td><td>Used for FColor and FLinearColor properties. Indicates that the Alpha property should be hidden when displaying the property widget in the details.</td></tr><tr class="odd"><td>HideViewOptions</td><td>Used for Subclass and SoftClass properties. Hides the ability to change view options in the class picker.</td></tr><tr class="even"><td>InlineEditConditionToggle</td><td>Signifies that the boolean property is only displayed inline as an edit condition toggle in other properties, and should not be shown on its own row.</td></tr><tr class="odd"><td>LongPackageName</td><td>Used by FDirectoryPath properties. Converts the path to a long package name.</td></tr><tr class="even"><td>MakeEditWidget</td><td>Used for Transform or Rotator properties, or Arrays of Transforms or Rotators. Indicates that the property should be exposed in the viewport as a movable widget.</td></tr></tbody></table>

 

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Metadata/>&gt;*

 

/// \[PropertyMetadata\] Used for Subclass and StringClassReference properties. Shows the picker as a tree view instead of as a list



ShowTreeView

/// \[PropertyMetadata\] Used by FDirectoryPath properties. Indicates that the directory dialog will output a relative path when setting the property.

RelativePath



/// \[PropertyMetadata\] Used by FDirectoryPath properties. Indicates that the directory dialog will output a path relative to the game content directory when setting the property.

RelativeToGameContentDir

 

Specify specialized sequencer track class for property: SequencerTrackClass

Default Value for structs in blueprints or parameters: MakeStructureDefaultValue="1.0,0.0,0.0"

Default function parameter values:

UFUNCTION(BlueprintPure, Category="Bebylon", meta=(ItemVisualStyle="(TagName=\\"AssetTag.Item\\")",GameplayTagFilter="AssetTag.Item"))  
UBBItemVisualCfg\* GetItemVisualCfg(FBBAssetTag ItemVisualStyle) const;

 

Restrict types of classes selectable in fstringassetreference properties: meta=(AllowedClasses="LevelSequence")

-   Restrict to exact classes: ExactClass

 

Execute in Editor: CallInEditor

-   can also set GAllowActorScriptExecutionInEditor = true;

-   TGuardValue&lt;bool&gt; AutoRestore(GAllowActorScriptExecutionInEditor, true);

 

Customize Array Of Structs header with TitleProperty meta tag:

> USTRUCT(BlueprintType)
>
> struct FTestStructInner
>
> {
>
> GENERATED\_USTRUCT\_BODY()
>
> UPROPERTY(EditAnywhere)
>
> float Value1;
>
> UPROPERTY(EditAnywhere)
>
> float Value2;
>
> UPROPERTY(EditAnywhere)
>
> FString Value3;
>
> };
>
> USTRUCT(BlueprintType)
>
> struct FTestStructOuter
>
> {
>
> GENERATED\_USTRUCT\_BODY()
>
> UPROPERTY(EditAnywhere, meta = (TitleProperty = "Value2"))
>
> TArray&lt;FTestStructInner&gt; TestArray;
>
> };

a.  

![Useful_Metadata_Decorators_defaultvalue](C:\devguide\conversion\FINISHED\assets\Useful_Metadata_Decorators_defaultvalue.png)

*From &lt;<https://udn.unrealengine.com/questions/279525/create-custom-view-in-ue-for-tarray-of-ustructs.html>&gt;*

 

 

**Create Console Variable out of UPROPERTY:**

UPROPERTY(config, EditAnywhere, Category = "Advanced Settings", meta = (

> ConsoleVariable = "renderdoc.BinaryPath", DisplayName = "RenderDoc executable path",
>
> ToolTip = "Path to the main RenderDoc executable to use.",
>
> ConfigRestartRequired = true))

FString RenderDocBinaryPath;

 

 

**Force a uproperty to not be clearable:**

UPROPERTY(EditAnywhere, NoClear, BlueprintReadOnly)

 

**EditCondition**: EditCondition & InlineEditConditionToggle & PinHiddenByDefault

UPROPERTY(VisibleAnywhere, meta=(EditCondition="bIsSet"))

FBBDamageEffect Value;

 

UPROPERTY(VisibleAnywhere, meta=(InlineEditConditionToggle))

bool bIsSet;

 

Deprecate functions in UE4: a Blueprint exposed function by adding \_DEPRECATED to its name along with DeprecatedFunction metadata:

 

struct BLUEPRINTGRAPH\_API FBlueprintMetadata  
{  
public:  
        // Struct/Enum/Class:  
        // If true, this class, struct, or enum is a valid type for use as a variable in a blueprint  
        static const FName MD\_AllowableBlueprintVariableType;  

        // If true, this class, struct, or enum is not valid for use as a variable in a blueprint  
        static const FName MD\_NotAllowableBlueprintVariableType;  

        // Class:  
        // \[ClassMetadata\] If present, the component class can be spawned by a blueprint  
        static const FName MD\_BlueprintSpawnableComponent;  

        /\*\* If true, the class will be usable as a base for blueprints \*/  
        static const FName MD\_IsBlueprintBase;  
          
        /\*\* A listing of classes that this class is accessible from (and only those classes, if present).  Note that this determines the GRAPH CONTEXTS in which the node cannot be placed (e.g. right click menu, palette), and does NOT control menus when dragging off of a context pin (i.e. contextual drag) \*/  
        static const FName MD\_RestrictedToClasses;  

        /// \[ClassMetadata\] Used for Actor and Component classes. If the native class cannot tick, Blueprint generated classes based this Actor or Component can have bCanEverTick flag overridden even if bCanBlueprintsTickByDefault is false.  
        static const FName MD\_ChildCanTick;  

        /// \[ClassMetadata\] Used for Actor and Component classes. If the native class cannot tick, Blueprint generated classes based this Actor or Component can never tick even if bCanBlueprintsTickByDefault is true.  
        static const FName MD\_ChildCannotTick;  

        /// \[ClassMetadata\] Used to make the first subclass of a class ignore all inherited showCategories and hideCategories commands  
        static const FName MD\_IgnoreCategoryKeywordsInSubclasses;  

        //    function metadata  
        /\*\* Specifies a UFUNCTION as Kismet protected, which can only be called from itself \*/  
        static const FName MD\_Protected;  

        /\*\* Marks a UFUNCTION as latent execution \*/  
        static const FName MD\_Latent;  

        /\*\* Marks a UFUNCTION as unsafe for use in the UCS, which prevents it from being called from the UCS.  Useful for things that spawn actors, etc that should never happen in the UCS \*/  
        static const FName MD\_UnsafeForConstructionScripts;  

        // The category that a function appears under in the palette  
        static const FName MD\_FunctionCategory;  

        // \[FunctionMetadata\] Indicates that the function is deprecated  
        static const FName MD\_DeprecatedFunction;  

        // \[FunctionMetadata\] Supplies the custom message to use for deprecation  
        static const FName MD\_DeprecationMessage;  

        // \[FunctionMetadata\] Indicates that the function should be drawn as a compact node with the specified body title  
        static const FName MD\_CompactNodeTitle;  

        // \[FunctionMetadata\] Indicates that the function should be drawn with this title over the function name  
        static const FName MD\_DisplayName;  

        // \[FunctionMetadata\] Indicates that a particular function parameter is for internal use only, which means it will be both hidden and not connectible.  
        static const FName MD\_InternalUseParam;  

        //    property metadata  

        /\*\* UPROPERTY will be exposed on "Spawn Blueprint" nodes as an input  \*/  
        static const FName MD\_ExposeOnSpawn;  

        /\*\* UPROPERTY uses the specified function as a getter rather than reading from the property directly \*/  
        static const FName MD\_PropertyGetFunction;  

        /\*\* UPROPERTY uses the specified function as a setter rather than writing to the property directly \*/  
        static const FName MD\_PropertySetFunction;  

        /\*\* UPROPERTY cannot be modified by other blueprints \*/  
        static const FName MD\_Private;  

        /\*\* If true, the self pin should not be shown or connectable regardless of purity, const, etc. similar to InternalUseParam \*/  
        static const FName MD\_HideSelfPin;  

        /\*\* If true, the specified UObject parameter will default to "self" if nothing is connected \*/  
        static const FName MD\_DefaultToSelf;  

        /\*\* The specified parameter should be used as the context object when retrieving a UWorld pointer (implies hidden and default-to-self) \*/  
        static const FName MD\_WorldContext;  

        /\*\* For functions that have the MD\_WorldContext metadata but are safe to be called from contexts that do not have the ability to provide the world context (either through GetWorld() or ShowWorldContextPin class metadata \*/  
        static const FName MD\_CallableWithoutWorldContext;  

        /\*\* For functions that should be compiled in development mode only \*/  
        static const FName MD\_DevelopmentOnly;  

        /\*\* If true, an unconnected pin will generate a UPROPERTY under the hood to connect as the input, which will be set to the literal value for the pin.  Only valid for reference parameters. \*/  
        static const FName MD\_AutoCreateRefTerm;  

        /\*\* If true, the hidden world context pin will be visible when the function is placed in a child blueprint of the class. \*/  
        static const FName MD\_ShowWorldContextPin;  

        static const FName MD\_BlueprintInternalUseOnly;  
        static const FName MD\_NeedsLatentFixup;  

        static const FName MD\_LatentCallbackTarget;  

        /\*\* If true, properties defined in the C++ private scope will be accessible to blueprints \*/  
        static const FName MD\_AllowPrivateAccess;  

        /\*\* Categories of functions to expose on this property \*/  
        static const FName MD\_ExposeFunctionCategories;  

        // \[InterfaceMetadata\]  
        static const FName MD\_CannotImplementInterfaceInBlueprint;  
        static const FName MD\_ProhibitedInterfaces;  

        /\*\* Keywords used when searching for functions \*/  
        static const FName MD\_FunctionKeywords;  

        /\*\* Indicates that during compile we want to create multiple exec pins from an enum param \*/  
        static const FName MD\_ExpandEnumAsExecs;  

        static const FName MD\_CommutativeAssociativeBinaryOperator;  

        /\*\* Metadata string that indicates to use the MaterialParameterCollectionFunction node. \*/  
        static const FName MD\_MaterialParameterCollectionFunction;  

        /\*\* Metadata string that sets the tooltip \*/  
        static const FName MD\_Tooltip;  

        /\*\* Metadata string that indicates the specified event can be triggered in editor \*/  
        static const FName MD\_CallInEditor;  

        /\*\* Metadata to identify an DataTable Pin. Depending on which DataTable is selected, we display different RowName options \*/  
        static const FName MD\_DataTablePin;  

        /\*\* Metadata that flags make/break functions for specific struct types. \*/  
        static const FName MD\_NativeMakeFunction;  
        static const FName MD\_NativeBreakFunction;  

        /\*\* Used by DynamicOutputParam && DeterminesOutputType to control output type Metadata that flags function params that govern what type of object the function returns \*/  
        static const FName MD\_DynamicOutputType;  
        /\*\* Metadata that flags the function output param that will be controlled by the "MD\_DynamicOutputType" pin \*/  
        static const FName MD\_DynamicOutputParam;  

        static const FName MD\_ArrayParam;  
        static const FName MD\_ArrayDependentParam;  

        /\*\* Metadata that flags TSet parameters that will have their type determined at blueprint compile time \*/  
        static const FName MD\_SetParam;  

        /\*\* Metadata that flags TMap function parameters that will have their type determined at blueprint compile time \*/  
        static const FName MD\_MapParam;  
        static const FName MD\_MapKeyParam;  
        static const FName MD\_MapValueParam;  

        /\*\* Metadata that identifies an integral property as a bitmask. \*/  
        static const FName MD\_Bitmask;  
        /\*\* Metadata that associates a bitmask property with a bitflag enum. \*/  
        static const FName MD\_BitmaskEnum;  
        /\*\* Metadata that identifies an enum as a set of explicitly-named bitflags. \*/  
        static const FName MD\_Bitflags;  
        /\*\* Metadata that signals to the editor that enum values correspond to mask values instead of bitshift (index) values. \*/  
        static const FName MD\_UseEnumValuesAsMaskValuesInEditor;
