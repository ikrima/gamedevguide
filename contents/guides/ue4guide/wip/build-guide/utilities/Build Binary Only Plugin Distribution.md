---
sortIndex: 3
---

# Building the plugin

The first stage is to build the plugin for distribution in the normal manner. This can be done using the UnrealBuildTool with the following command:

*UE4Dir*\\Engine\\Build\\BatchFiles\\RunUAT.bat BuildPlugin -Rocket -Plugin=*Plugin*.uplugin -TargetPlatforms=Win64 -Package=*OutputDir*

where UE4Dir is the directory where UE4 is installed and OutputDir is the name of the directory you want the resulting build to be placed. The OutputDir will contain the source code, binaries, intermediate files and any extra required content your plugin needs to run. You would normally distribute this entire folder to users.

# Removing the source

In our case we want to remove the source. However, not all the source should be removed.

For each module within the Source directory, the **Private** directory should be deleted, but whether the corresponding **Public**/**Classes** folders should be removed depends on whether your module offers any functionality that can be used directly from C++.

For example, in our main Mercuna module we have several custom actor types and components that users can create and use in their code, so we leave the Source/Mercuna/Public directory in place. Whereas our MercunaPathfinding module is an internal module, so we delete Source/MercunaPathfinding/Public.

Finally, you will need to leave the **\*.build.cs** file intact for UE4 to be able to recognise the module.

# Editor Only

In our case we go an extra step and also delete the non-editor binaries (Binaries\\Win64\\\*.lib) and non-editor intermediate files (Intermediate\\Build\\Win64\\UE4). This allows users to run the plugin in the Unreal editor, but prevents them from creating a package game. This is perfect for us as we want users to be able to integrate the Mercuna evaluation into their active game projects and try it out, but we don’t want them to be able to create an actual game build that they could sell/distribute. Once they have purchased a licence from us we will supply either the missing files, or more commonly share with them the full source.

Finally we zip up the directory, ready to be still to users to try out Mercuna. For us the final content of our zip is:

- **Binaires/Win64/**UE4Editor.modules

- **Binaires/Win64/**UE4Editor-Mercuna.dll

- **Binaires/Win64/**UE4Editor-Mercuna.pdb

- **Content**

- **Intermediate/Build/Win64/UE4Editor**

- **Resources**

- **Source/Mercuna/Public**

- **Source/Mercuna/**Mercuna.Build.cs

- Mercuna.uplugin

# Limitations

Since you are not supplying the source that UE4 expects, there are several limitations of this method to be aware of:

1. **This approach has been only tested on Windows**, and resulting the compiled binaries are Windows only. This is not a problem for us, as restricting our evaluation version to Windows only is what we want.

1. **The resulting binary plugin can only be used as an Engine plugin**. If the plugin is used as a Game plugin then UE4 will try to build it when compiling the game and fail. *Actually a bug in the UnrealBuildTool for versions before UE4.20 meant that using it as a game plugin worked, sadly this has been fixed.*

1. **The binary plugin only works with the same version of the engine it was compiled with.** If you build your plugin using the Epic launcher version of UE4, then it doesn’t work with custom versions of the engine or people that have built the engine from source code. Thankfully it does work for all minor point releases, e.g. 4.20.X, so we only have to release an update when major UE4 versions are released.

*Reference From: <https://mercuna.com/building-binary-plugins-in-unreal-engine-4/>*
