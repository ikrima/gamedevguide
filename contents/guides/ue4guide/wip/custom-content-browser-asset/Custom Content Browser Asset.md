Great Simple Reference:

<https://github.com/ue4plugins/TextAsset>

-   Tutorial from Max Gerke: <https://vimeo.com/album/5022905/video/241039777>

<http://headcrash.industries/reference/adding-new-asset-types-to-ue4/>

Great Complex Reference: FaceFx UE4 Plugin: <https://github.com/FaceFX/FaceFX-UE4>

 

Creating a Content Browser Asset in UE4

<http://www.wraiyth.com/?p=209>

 

Custom Asset Picker

<https://kasundevblog.wordpress.com/2015/10/07/creating-assets-with-support-of-a-custom-class-picker-unreal-engine-4/>

 

Create Custom Content Browser Asset Category

You can register custom categories using the RegisterAdvancedAssetCategory function from the AssetToolsmodule. You'd then need to use the registered category flag in the GetCategories function of your custom type asset actions.

The AI module provides an example of doing this. See FAIModule::StartupModule for the registration, and FAssetTypeActions\_Blackboard::GetCategories for an example of using the registered flag in the asset type actions.

I notice that tutorial doesn't actually cover creating asset type actions, however they're pretty simple. FAssetTypeActions\_Enum provides a pretty basic example, just remember to register them with the AssetTools module (via RegisterAssetTypeActions).

 

*From &lt;<https://answers.unrealengine.com/questions/337715/custom-asset-category.html>&gt;*

 

 

Create New Asset Type + Asset Editor

1.  Derive UFactory

Easy to register custom Ufactory for hooking into overriding new asset creation

Look at UDataAssetFactory, UDataTableAssetFactory

Ufactory::ConfigureProperties()

-   This is where the custom SClassPickerDialog gets created

 

 

1.  Derive from FAssetTypeActions\_Base



1.  Implement FAssetEditorToolkit

 

1.  Make sure to override cooking process somehow so that any lazily referenced objects in your new asset are added to the cook & inclusion process

> Look at UDataTable::Serialize() & UWorld::AddReferencedObjects &
>
> UWorld::PreSaveRoot(const TCHAR\* **Filename**, TArray&lt;FString&gt;& **AdditionalPackagesToCook**)
