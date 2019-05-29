---
sortIndex: 3
---

# Asset Manager

<https://answers.unrealengine.com/storage/attachments/136465-runtimeassetmanagementin416.pdf>

<https://www.unrealengine.com/en-US/blog/optimizing-battle-breakers-for-chunked-downloading>

| **Asset Registry:**      | Repository of useful info about specific assets                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Streamable Managers:** | native structs that manage streaming                                                                           |
| **Primary Assets:**      | assets that can be manually loaded/unloaded based on game state (e.g. maps, inventory items,character classes) |
| **Secondary Assets:**    | Auto loaded/dependent assets based on Primary Assets (e.g. textures, sounds, etc)                              |
| **Asset Bundle:**        | Logical group of named list of assets that can be loaded together at runtime                                   |
| **Asset Manager**        | New singleton managing info about primary assets/asset bundles                                                 |

**FPrimaryAssetID:**

- **PrimaryAssetType**: Base type FName (e.g. AWeapon)

- **PrimaryAssetName:** FName of asset shortname (or longname for maps)

- **PrimaryAssetType:PrimaryAssetName -** forms unique pair across entire game (violations causes errors). Weapon:BattleAxe_Tier2 represents the same object as /Game/Items/Weapons/Axes/BattleAxe_Tier2.BattleAxe_Tier2_C

- Type and Name are saved directly as AssetRegistry tags, so once a primary asset has been saved to disk once you can search for it directly in the asset registry

- Maps inside /Game/Maps are set to be Primary Assets by default, everything else needs to be set up for your specific game

- PrimaryAssetLabels also live at the engine level and are special Primary Assets that are used to label other assets for chunking and cooking

**FStreamableManager** is a native structure that handles async loading objects and keeping them in memory until they are not needed.

- Multiple streamable managers for different use cases

- **FStreamableHandle** is a struct tracked by shared pointer that is returned from streaming operations. An ​active handle keeps the referenced assets loaded into memory, and all handles are active while loading. Once loading is finished, handles are active until canceled or released.

- **FStreamableHandle::ReleaseHandle()** can be explicitly called to release references, and will implicitly get called when all shared pointers to the handle are destroyed

- **FStreamableHandle::CancelHandle()** can be called to abort the load and stop the complete callback from happening

- **FStreamableHandle::WaitUntilComplete()** blocks until the requested assets have loaded. This pushes the requested asset to the top of the priority list, but does not flush all async loading so is usually faster than a LoadObject call

- **RequestAsyncLoad** is the primary streamable operation. If you pass in a list of StringAssetReferences it will attempt to load them all, call a callback when complete, and return a Streamable Handle for later use

  - **RequestSyncLoad** is the synchronous version. It will either start an async load and call WaitUntilComplete, or call LoadObject directly, whichever is faster

  - **LoadSynchronous** is a version of RequestSyncLoad that returns a single asset, and has templated type safe versions

- **bManageActiveHandle**, which if set will cause the streamable manager itself to hold an active reference to the request handle, until queried for with GetActiveHandles​ and released manually

**AssetManager** is a singleton UObject that provides operations for scanning for and loading Primary Assets at runtime. It is meant to replace the functionality that ObjectLibraries currently provide, and wraps a FStreamableManager to handle the actual async loading.

- **Get()**: Static function to return the active asset manager. Can call IsValid() to ensure validity

- **ScanPathsForPrimaryAssets(Type, Paths, BaseClass)​**: This functions scans the disk (or cooked asset registry) and parses FAssetData for primary assets of a specific type

- **GetPrimaryAssetPath(PrimaryAssetId)**: Converts Primary Asset to object path

- **GetPrimaryAssetIdForPath(StringReference)**: Converts an object path into a Type:Name pair if that path refers to a Primary Asset

Override UAssetManager::ShouldSetManager for your project, this is the function that figures out what Primary Assets "manage" other things. You could add a specific check where if your main menu primary asset is asking it it should reference Map primary assets, return DoNotSet. Fortnite does this so our "list of maps to display" asset doesn't acquire management over specific maps

*Reference From <https://udn.unrealengine.com/questions/452756/view.html>*

/\*\*

- External modules can have additional data associated with this UWorld.

- This is a list of per module world data objects. These aren't

- loaded/saved by default.

\*/

UPROPERTY(Transient)

TArray&lt;UObject\*>                                                        PerModuleDataObjects;

**Primary Asset Picker:**

```cpp
/**   
         * Creates a simple version of a Primary Asset Type selector, not bound to a PropertyHandle   
         * @param OnGetDisplayText Delegate that returns the text to display in body of combo box  
         * @param OnSetType Delegate called when type is changed  
         * @param bAllowClear If true, add None option to top  
         * @param bAlowAll If true, add All Types option to bottom, returns AllPrimaryAssetTypes if selected  
         */  
        static TSharedRef&lt;SWidget> MakePrimaryAssetTypeSelector(FOnGetPrimaryAssetDisplayText OnGetDisplayText, FOnSetPrimaryAssetType OnSetType, bool bAllowClear = true, bool bAllowAll = false);

/**   
         * Creates a simple version of a Primary Asset Id selector, not bound to a PropertyHandle  
         * @param OnGetDisplayText Delegate that returns the text to display in body of combo box  
         * @param OnSetId Delegate called when id is changed  
         * @param bAllowClear If true, add None option to top  
         */  
        static TSharedRef&lt;SWidget> MakePrimaryAssetIdSelector(FOnGetPrimaryAssetDisplayText OnGetDisplayText, FOnSetPrimaryAssetId OnSetId, bool bAllowClear = true, TArray&lt;FPrimaryAssetType> AllowedTypes = TArray&lt;FPrimaryAssetType>());

/** Called to get list of valid primary asset types */  
        static void GeneratePrimaryAssetTypeComboBoxStrings(TArray&lt; TSharedPtr&lt;FString> >> OutComboBoxStrings, TArray&lt;TSharedPtr&lt;SToolTip>>> OutToolTips, TArray&lt;bool>> OutRestrictedItems, bool bAllowClear, bool bAllowAll);
```
