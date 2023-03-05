---
sortIndex: 4
sidebar: ue4guide
---

# Overview of Engine Versioning:

<https://docs.unrealengine.com/en-us/Programming/UnrealArchitecture/Versioning-of-Assets-and-Packages>

- ## Engine version

  - defines the explicit major/minor/patch version of the engine, plus the changelist and branch name that it was built from.

  - Unique identifier and to infer that one engine was later than another

  - FEngineVersion::Current(), FEngineVersion::CompatibleWith(), ENGINE_CURRENT_CL_VERSION, ENGINE_COMPATIBLE_CL_VERSION

- ## Object version

  - (aka serialization version) is as a monotonically incrementing (but manually updated) integer, and is used to write one-way upgrade code in custom UObject serialization functions

  - should ONLY be updated by Epic, otherwise future engine merges may corrupt content.

- ## Licensee object version

  - For licensee, similar to object version. Don't actually use this tho

- ## Custom Object Version

  - Per uobject guid; use this

- ## Build Version

  - Opaque string specific to product being built. Should be used for identifying current application vs other applications built fwith same engine version

  - BUILD_VERSION macro

  - Default: "{BranchName}-CL-{Changelist}" (from Build.version)

  - Set in Target.cs for each target

- ## Network version/ Replay version

  - versioning the network and replay subsystems

  - default to the compatible engine version.

## Local Builds

Unreal's tagged property serialization is tolerant to properties being added and removed, so you can load content from pretty much any version of the editor unless someone changes a custom UObject::Serialize function. Developers are adding and removing properties all the time, so we always want to prevent artists loading content that someone created with a newer version of the editor, and losing properties when it's saved out because their version of the editor didn't load it. We normally do that by embedding the build CL into the compiled binaries, and it gets saved out into any assets created with those binaries.

Separately to that, some engine modules are discovered and loaded dynamically; commonly modules which add support for different target platforms that might be under NDA, or which may be licensed separately to the rest of the engine. Because these modules can be added or removed at any time, or moved from one location to another, we want the engine to be able to detect whether they are valid and up to date before trying to load them. We normally use the same embedded CL number to match up binaries from the same build of the engine.

This system doesn't work for people building locally because we don't know what CL number they are on. They may have a bunch of binaries that they compiled locally, mixed in with a bunch of other binaries that they've synced from source control. To identify a valid working set of DLLs for those users, we have a randomly generated "build id" which gets saved into a .modules file in each output directory, and we match up the build id with the one in the executable directory before loading anything.

There are some optimizations to try to locally recycle a build id when you're only touching game code to support a feature where you compile the engine binaries separately to the game code. To use that feature, you first build the game with the -precompile command line option to UBT, then with the -useprecompiled option every time after that.

Anyway, the problem you're seeing is that you're using the local iteration workflow - using the "build id" rather than CL number - but trying to check everything in. It's not meant to maintain consistency between machines in that way; it is deliberately random for each user to avoid collisions. Your easiest workaround is to check in binaries which have a hard coded CL number instead, which will remove the need for it to use the build id entirely. In Engine/Source/Runtime/Launch/Resources/Version.h, set ENGINE_IS_LICENSEE_VERSION to 1, and BUILT_FROM_CHANGELIST to any non-zero number you like.

I would encourage you to actually submit correctly versioned binaries to avoid accidental data loss due to the reasons I mentioned at the top though.

<https://udn.unrealengine.com/questions/310062/creating-a-custom-engine-build-for-internal-projec.html>

## Build ID

Unreal Engine 4 eliminates potential errors arising from outdated DLLs via the **Build ID** system. This system ensures that the Engine will only load DLLs that were compiled at the same time as the executable file itself, preventing not only crashes or failed library linkage, but also hard-to-track bugs that could arise from stale binaries. The Build ID is usually generated automatically at compile-time, producing a new, unique value every time the Engine is built, but it is possible to override with a manually-specified value.

### Automatically-Generated Build ID

At build time, every output directory containing at least one compiled DLL receives a JSON file with the “.modules” extension, such as “UE4Editor.modules”. This file lists each Module in the directory and the associated DLL for that Module, as well as a GUID for the build itself. Every time the Engine is compiled, a new GUID will be generated, so that DLLs not compiled in the same session as the executable will be recognized immediately and ignored by the Engine. When using source control to maintaining a binary build, the executable, all DLLs, and their associated “.modules” files must be checked in together to ensure that the Build ID matches.

### Manually-Specified Build ID

It is possible to force your Build ID to a specific value. This can be accomplished by adding a “BuildId” line to your “Build/Build.version” file, but it is not recommended, as it removes the check to prevent using incompatible Modules. It is particularly easy to run outdated code if using a forced Build ID with Plugins that may be shared between multiple projects.

*Reference From <https://docs.unrealengine.com/en-us/Programming/UnrealArchitecture/Versioning-of-Assets-and-Packages>*
