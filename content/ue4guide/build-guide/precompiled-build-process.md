---
sortindex: 8
sidebar: ue4guide
---

## Using BuildGraph

1. Create the installed build

```bat
"UnrealEngine\Engine\Build\BatchFiles\RunUAT.bat" BuildGraph -script="UnrealEngine\Engine\Build\InstalledEngineBuild.xml" -target="Make Installed Build Win64" -set:HostPlatformOnly=true -set:WithWin32=false -set:WithIOS=false
```

1. Create InstalledBuild.txt and place in UnrealEngine\\Engine\\Build

## Sans BuildGraph

```bat
UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 UE4Editor -project="BBR\BBR.uproject" -precompile
UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 BBR -project="BBR\BBR.uproject" -useprecompiled
UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 BBREditor -project="BBR\BBR.uproject" -useprecompiled

UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 BBREditorBP -project="BBR\BBR.uproject" -useprecompiled
```

## Add section to BaseEngine.ini

```ini
[InstalledPlatforms]

+InstalledPlatformConfigurations=(PlatformName="Win64", Configuration="Development", PlatformType="Editor")

;+InstalledPlatformConfigurations=(PlatformName="Win64", Configuration="Development", PlatformType="Game")
```

## Generate project files

```bat
UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 BBR -project="UnrealEngine\BBR\BBR.uproject" -useprecompiled -projectfiles -game -engine
```

Uncheck ShaderCompilerWorker dependency from BBR
