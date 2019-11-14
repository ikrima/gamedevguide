---
sortIndex: 10
sidebar: ue4guide
---

# Config File Paths Locations:

For Cooked Builds that are run from editor, visual studio, or run.py, they are in

```cpp
"BBR\Saved\Cooked\WindowsNoEditor\BBR\Saved\Config\WindowsNoEditor\"

Staged or Packaged Builds:

"BBR\Saved\StagedBuilds\WindowsNoEditor\BBR\Config\"
```

# General Paths:

### InstallDir/WindowsNoEditor/GameName/Binaries/Win64

```cpp
//InstallDir/WindowsNoEditor/GameName/Binaries/Win64

const FString ThePath = FString(FPlatformProcess::BaseDir());
```

### InstallDir/WindowsNoEditor/

```cpp
//InstallDir/WindowsNoEditor/

const FString ThePath = FPaths::ConvertRelativePathToFull(FPaths::RootDir());
```

### InstallDir/WindowsNoEditor/GameName

```cpp
//InstallDir/WindowsNoEditor/GameName

const FString ThePath = FPaths::ConvertRelativePathToFull(FPaths::GameDir());
```

### InstallDir/WindowsNoEditor/GameName

```cpp
//InstallDir/WindowsNoEditor/GameName/

const FString ThePath = FPaths::ConvertRelativePathToFull(FPaths::GameUserDir());
```

### InstallDir/WindowsNoEditor/GameName/Saved

```cpp
//InstallDir/WindowsNoEditor/GameName/Saved

const FString ThePath = FPaths::ConvertRelativePathToFull(FPaths::GameSavedDir());
```

### InstallDir/WindowsNoEditor/GameName/Saved/Logs

```cpp
//InstallDir/WindowsNoEditor/GameName/Saved/Logs

const FString ThePath = FPaths::ConvertRelativePathToFull(FPaths::GameLogDir());
```

Project Directory:

```cpp
FPlatformMisc::ProjectDir()

FPlatformMisc::RootDir()

FPlatformMisc::EngineDir()

FPlatformMisc::LaunchDir()
```

*Reference From <https://wiki.unrealengine.com/Packaged_Game_Paths,_Obtain_Directories_Based_on_Executable_Location>*
