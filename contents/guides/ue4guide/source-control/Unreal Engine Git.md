---
sortIndex: 1
---

# Unreal Engine Git

# Setting Up Engine Github Repo

Add our own private github repo:

Our github repo is at <https://github.com/kitelightning/UnrealEngine>

Make sure to add an 'upstream' remote too:
```batch
git remote add upstream https://github.com/EpicGames/UnrealEngine
git fetch upstream
git checkout 4.1
git merge upstream/4.1
```

# Updating Engine Version

_**Note: Examples are assuming 4.21.2-release tag is on the release branch and is the base, Bebylon is forked from that, and we're trying to update to 4.22.2-release (tag) on the upstream/release branch**_

1. Sync from github into a clean directory so BBR subdirectory/game cruft or intermediate files aren't getting in the way

1. Create a patch from the bebylon branch ranging from it's parent in the release branch to current

   ```batch
   git checkout -b tmpsquash 4.21.2-release
   git merge --squash Bebylon
   git commit -a -m "Squashed 4.21.2 to Bebylon commits"
   git format-patch 4.21.2-release

   git checkout release
   git pull upstream release:release
   git branch -D tmpsquash
   ```

1. Create a new branch at the sync off point off of the new engine release branch (e.g. branch: release, tag: 4.22.2-release). Call it bebylon-{new engine version}-merge{oldversion} (eg bebylon-4.22.2-merged4.21.2)

   ```batch
   git checkout -f -b bebylon-4.22.2-merged4.21.2 4.22.2-release
   ```

1. Apply patch to new said branch & manually solve the conflicts. Push this up to github

   ```batch
   git am --3way --signoff 0001-Squashed-4.21.2-to-Bebylon-commits.patch
   ```

1. Sync down into proper directory and actually solve the conflicts to get UE4 building & compiling

1. Merge bebylon into the new branch with merge override from the new branch. We want to merge Bebylon with bebylon-4.22.2-merged4.21.2 but not actually do any merging but instead take bebylon-4.22.2-merged4.21.2 as authoritative.

   _**Note:** git merge -X theirs private won't work bc it will still apply a merge strategy when there is no conflict_

   Use these commands to do that:

   ```batch
   git merge -s ours Bebylon
   git checkout Bebylon
   git merge bebylon-4.22.2-merged4.21.2
   ```

   *Reference From <https://stackoverflow.com/questions/4624357/how-do-i-overwrite-rather-than-merge-a-branch-on-another-branch-in-git>*

1. Create tag at merge point bebylon-4.22.2-merged4.21.2

1. Now you can push Bebylon up to github

1. Reconcile for perforce:

   ```batch
   Utility/reconcile.py eng_upgrade_reconcile --uebinaries --uetemplatecontent --uecontent --uesrc --ueplugins --uedocs
   ```

1. Rebase our private branch on top of the new UE4 repository. Make sure everyone has their stuff checked in before you rebase + force push the history rewrite. Otherwise the rest of the team will want to burn you alive after de-syncing their git tree

   <http://stackoverflow.com/questions/14893399/rebase-feature-branch-onto-another-feature-branch>

# Building The Source

1. **Download the source** and unzip it to a folder, or [**create a fork**] and **clone the repository**. If you clone, don't forget to switch to the correct branch for this release! (The 'master' branch has unstable code, so you will want to make sure to choose a release branch.)

1. You should now have an *UnrealEngine* folder on your computer. All of the source and dependencies will go into this folder. The folder name might have a branch suffix (such as *UnrealEngine-4.1*), but that's totally fine.

1. Download the **required dependencies** files for the [latest release][]: [Required\_1of2.zip], [Required\_2of2.zip].

1. Unzip the dependencies into the *UnrealEngine* folder alongside the source. Be careful to make sure the folders are merged together correctly. On Mac, we recommend **Option + dragging** the unzipped files into the *UnrealEngine* folder, then selecting **Keep Newer** if prompted.

1. Okay, platform stuff comes next. Depending on whether you are on Windows or Mac, follow one of the sections below:

## Windows

1. Be sure to have [Visual Studio 2013](https://visualstudio.microsoft.com/vs/older-downloads/) installed. You can use any desktop version of Visual Studio 2013, including the free version: [Visual Studio 2013 Express for Windows Desktop](https://www.microsoft.com/en-us/download/details.aspx?id=40769)

1. Make sure you have [June 2010 DirectX runtime](https://www.microsoft.com/en-us/download/details.aspx?id=8109) installed. You don't need the SDK, just the runtime.

1. You'll need project files in order to compile. In the *UnrealEngine* folder, double-click on**GenerateProjectFiles.bat**. It should take less than a minute to complete. On Windows 8, a warning from SmartScreen may appear. Click "More info", then "Run anyway" to continue.

1. Load the project into Visual Studio by double-clicking on the **UE4.sln** file.

1. It's time to **compile the editor**! In Visual Studio, make sure your solution configuration is set to**Development Editor**, and your solution platform is set to **Win64**. Right click on the **UE4** target and select**Build**. It will take between 15 and 40 minutes to finish compiling, depending on your system specs.

1. After compiling finishes, you can **load the editor** from Visual Studio by setting your startup project to **UE4**and pressing **F5** to debug.

1. One last thing. You'll want to setup your Windows shell so that you can interact with .uproject files. Find the file named **UnrealVersionSelector-Win64-Shippping.exe** in the *UnrealEngine/Engine/Binaries/Win64/*folder and run it. Now, you'll be able to double-click .uproject files to load the project, or right click them to quickly update Visual Studio files.

*Reference From <https://github.com/EpicGames/UnrealEngine>*

# Visual Studio Customization

Generate VS2013 project files by running GenerateProjectFiles.bat

Command line parameters for Generate Project Files:

<https://docs.unrealengine.com/latest/INT/Programming/UnrealBuildSystem/ProjectFileGenerator/index.html>

Customize Toolbar to showcase UE4 Build Profiles/Targets:

<http://youtu.be/usjlNHPn-jo?t=6m46s>

Install the UnrealVS extension for UnrealVS Toolbar:

UnrealEngine\\Engine\\Extras\\UnrealVS\\VS2013

Install Visual Studio Unreal Extensions:

\\Engine\\Extras\\VisualStudioDebugging\\InstallVisualizers.bat

Run the UnrealVersion Selector:

"UnrealEngine\\Engine\\Binaries\\Win64\\UnrealVersionSelector-Win64-Shipping.exe"

Configure Visual Studio for Unreal Project:

<https://docs.unrealengine.com/latest/INT/Programming/Development/VisualStudioSetup/index.html>

# Build Configuration

Unreal Engine 4 and the UnrealBuildTool use different build configurations to determine how the engine is compiled. Which configuration you use will be determined by the purposes of the build you want to create.

Each build configuration contains two keywords. The first of these indicates the state of the engine and your game project. For instance, if you compile using a **Debug** configuration, you will be able to debug your game's code. The second keyword indicates the target you are building for. If you would like to open a project in Rocket, you need to build with the **Editor** target keyword, but if you are building an executable version of your game, you would need to build using the **empty** target keyword.

| Build Configuration: State | Description                                                                                                                                                                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Debug**                   | This configuration contains symbols for debugging. If you compile your project using the **Debug** configuration and want to open the project with the Rocket Editor, you must use the "-debug" flag in order to see your code changes reflected in your project. |
| **Development**             | This configuration is equivalent to Release. In order to see your project's code changes reflected when you open the project later in the Rocket Editor, you must compile in the **Development** configuration.                                                   |
| **Shipping**                | This is the configuration for optimal performance and shipping your game. This configuration strips out console commands, stats, and profiling tools.                                                                                                             |

| Build Configuration: Target | Description                                                                                                                                                                                                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [empty]                          | This configuration builds a stand-alone executable version of your project, but requires cooked content specific to the platform.                                                                                                                                            |
| **Editor**                       | To be able to open a project in Unreal Editor and see all code changes reflected, the project must be built in an **Editor** configuration.                                                                                                                                  |
| **Uncooked**                     | Projects built using configurations that have an **Uncooked** type should be opened in Unreal Editor with the "-game" flag. This runs your game with uncooked content, in a new window, and is equivalent to **Play in > New Window at Default Player Start** in the editor. |

# Generating Project Files

Not all configurations will appear by default. Edit the [GenerateProjectFiles.bat](https://docs.unrealengine.com/en-us/programming/buildtools/unrealbuildtool/projectfilesforides) file in the main UE4 directory to generate the project files for additional configurations as needed.

Unreal Engine 4 and the UnrealBuildTool use different build configurations to determine how the engine is compiled. Which configuration you use will be determined by the purposes of the build you want to create.

The available configurations:

| **Build Configuration** | **Description**                                                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Debug**               | This configuration builds both engine and game code in debug configuration.                                                                           |
| **DebugGame**           | This configuration builds the engine as optimized, but leaves the game code debuggable. This configuration is ideal for debugging only game modules.  |
| **Development**         | This configuration is equivalent to Release. Both engine and game code will be built in this configuration.                                           |
| **Shipping**            | This is the configuration for optimal performance and shipping your game. This configuration strips out console commands, stats, and profiling tools. |
| **Test**                | This configuration is the **Shipping** configuration, but with some console commands, stats, and profiling tools enabled.                             |

*Reference From: <https://docs.unrealengine.com/latest/INT/Programming/Development/BuildingUnrealEngine/index.html>*
