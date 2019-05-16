```
sortIndex: 9
```

# Config File Paths Locations:

For Cooked Builds that are run from editor, visual studio, or run.py, they are in

"BBR\\Saved\\Cooked\\WindowsNoEditor\\BBR\\Saved\\Config\\WindowsNoEditor\\"

Staged or Packaged Builds:

"BBR\\Saved\\StagedBuilds\\WindowsNoEditor\\BBR\\Config\\"

# **General Paths:**

### InstallDir/WindowsNoEditor/GameName/Binaries/Win64

//InstallDir/WindowsNoEditor/GameName/Binaries/Win64

```c++
const FString ThePath = FString(FPlatformProcess::BaseDir());
```

### InstallDir/WindowsNoEditor/

//InstallDir/WindowsNoEditor/

```c++
const FString ThePath = FPaths::ConvertRelativePathToFull(FPaths::RootDir());
```

### InstallDir/WindowsNoEditor/GameName

//InstallDir/WindowsNoEditor/GameName

```c++
const FString ThePath = FPaths::ConvertRelativePathToFull(FPaths::GameDir());
```

### InstallDir/WindowsNoEditor/GameName

//InstallDir/WindowsNoEditor/GameName/

```c++
const FString ThePath = FPaths::ConvertRelativePathToFull(FPaths::GameUserDir());
```

### InstallDir/WindowsNoEditor/GameName/Saved

//InstallDir/WindowsNoEditor/GameName/Saved

```c++
const FString ThePath = FPaths::ConvertRelativePathToFull(FPaths::GameSavedDir());
```

### InstallDir/WindowsNoEditor/GameName/Saved/Logs

//InstallDir/WindowsNoEditor/GameName/Saved/Logs

```c++
const FString ThePath = FPaths::ConvertRelativePathToFull(FPaths::GameLogDir());
```

Project Directory:

FPlatformMisc::ProjectDir()

FPlatformMisc::RootDir()

FPlatformMisc::EngineDir()

FPlatformMisc::LaunchDir()

_Reference From [https://wiki.unrealengine.com/Packaged_Game_Paths,\_Obtain_Directories_Based_on_Executable_Location](https://wiki.unrealengine.com/Packaged_Game_Paths,_Obtain_Directories_Based_on_Executable_Location)_
