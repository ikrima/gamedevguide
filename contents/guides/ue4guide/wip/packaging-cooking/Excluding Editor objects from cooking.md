```
sortIndex: 3
```

Seems like this is a recurring question that gets answered partially all the time.

I'm updating this reply with answers I'm gleaning from my investigation while the question's answered.



#### WITH_EDITORONLY_DATA vs WITH_EDITOR

*WITH_EDITORONLY_DATA is a superset of WITH_EDITOR*

**WITH_EDITOR** means we are going to compile editor code.

**WITH_EDITORONLY_DATA** means we want to compile the metadata describing the compiled editor code. In general, only the editor cares about this metadata.



A program that needs editor metadata could define WITH_EDITORONLY_DATA, such as an editor plugin. Of course as the names suggest, run time code shouldn't use either of these.

CoreMiscDefines.h will set WITH_EDITORONLY_DATA to true if it is able (not already defined, platform supports it, isnt a server and isnt IOS).

If you declare a property in a class inside a WITH_EDITORONLY_DATA only block, then the cooker will detect that and not cook it, UNLESS you override the Serialize function, in which case you are taking serialization into your own hands.

If you specifically serialize content which is WITH_EDITORONLY_DATA though then it will get put in the package. You would need to handle the FArchive.IsFilterEditorOnly() case to have the custom serialize code handle this case.



**Excluding content for cooking/loading from dedicated Server or Client**

To exclude from dedicated server

Implement NeedsLoadForServer() and return false

<https://udn.unrealengine.com/questions/365330/determining-references-in-the-cooking-time-for-ded.html>

There's a NeedsLoadForClient(), virtual bool NeedsLoadForEditorGame() const override; virtual bool IsEditorOnly() const override calls



Also To exclude stuff from dedicated client:

\[CookSettings\]

DedicatedClientExclusion

DedicatedServerExclusion

<https://udn.unrealengine.com/questions/355061/is-there-existing-functionality-to-remove-server-b.html>



**Excluding directories from packaging**

You can add a PakBlackList-Debug.txt in Root/Build/Win64/ to exclude directories or packages from being included in the final build. These are configuration and platform target dependent (e.g. Development + Win64)

**Note for Windows:\*\* TargetPlatform should be Win64, not WindowsNoEditor

<https://answers.unrealengine.com/questions/364659/pakblacklist-developmenttxt.html>

https://docs.unrealengine.com/latest/INT/Platforms/Android/ReducingAPKSize/index.html#packageblacklist

**[Undocumented Magic Folders That Get Cooked:][https://github.com/EpicGames/UnrealEngine/blob/76085d1106078d8988e4404391428252ba1eb9a7/Engine/Source/Editor/UnrealEd/Private/CookOnTheFlyServer.cpp#L5321]**

If you have blueprints here, they & their dependencies will force get added (https://udn.unrealengine.com/questions/351014/packaging-always-includes-content.html)

Conversely, if you cook without Pak option on windows, UAT's stager will strip content in folders named UWP, XboxOne, PS4, etc (<https://answers.unrealengine.com/questions/241947/additional-asset-directories-not-copied-to-package.html>)



[UI]

+ContentDirectories=/Game/UI

+ContentDirectories=/Game/Widget

+ContentDirectories=/Game/Widgets

+ContentDirectories=/Engine/MobileResources



**Set CanSkipEditorReferencedPackagesWhenCooking to true**

The way the referenced by editor only packages works is that the package is attempted to be saved, then at save time flags are checked on the package to find out if it's been referenced only by editor only properties (properties within a WITH_EDITORONLY_DATA \#ifdef and UObjects that return IsEditorOnly() to true)

\*\*BUT\*\*, some operations will clear the isreferencedbyeditoronlyproperties flag on a package. Ex: Calling \*\*LoadObject(asset)\*\* in a class constructor because it makes sense the loader doesn't know that package is being loaded into an editor only property. Similarly, loading an asset from a config ini will do the same (\*\*LoadConfig()\*\*)



You can get around it with using static constructor helpers. See [here][https://udn.unrealengine.com/questions/374544/editor-only-data-appears-to-be-being-cooked.html] for more info.



**Override UObject::PreSave() to allow editor only objects to generate non-editor only data**

EditorOnly objects are processed in the cook to give them the opportunity to generate non-editor only content in their PreSave()



**Filtering FStringAssetReferences with LoadStringAssetReferenceInCook**

Your game can handle the FCoreDelegates::LoadStringAssetReferenceInCook function. Here you can decide what string asset references you want to be resolved at cook time. Just return false for everything and no string asset references will be cooked

"Epic uses this internally to remove all kinds of content from builds, mostly to prevent heros from being cooked which haven't been released yet."



\*\*Implementing CookModificationDelegate\*\*

You can use this to add extra packages to your cook and possibly filter existing ones



**Random Useful Info**

- Don't use multiprocess cooker. It's unreliable and seems like epic doesn't use it internally

- Since UDN's search functionality is lacking, combing through [daniel.lamb's][https://udn.unrealengine.com/users/5613/daniellamb.html?answerPage=1&answerPageSize=15&answerSort=active] previous answers is a good resource

- If -iterate is clearing out the cooking directory on every run, you may need to add

[CookSettings]

+ConfigSettingBlacklist=\*.EditorKeyBindings

+ConfigSettingBlacklist=\*.SourceControlSettings

+ConfigSettingBlacklist=\*.SourceControl.SourceControlSettings

- Use these settings to increase cooking performance and remove -FORCELOGFLUSH from the cook commandlet param

\[1\]: <https://github.com/EpicGames/UnrealEngine/blob/76085d1106078d8988e4404391428252ba1eb9a7/Engine/Source/Editor/UnrealEd/Private/CookOnTheFlyServer.cpp#L5321>

\[2\]: <https://udn.unrealengine.com/users/5613/daniellamb.html?answerPage=1&answerPageSize=15&answerSort=active>

<https://udn.unrealengine.com/answers/375077/edit.html>
