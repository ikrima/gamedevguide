## Using BuildGraph

"D:\\Ikrima\\src\\Public-Development\\UnrealEngine\\Engine\\Build\\BatchFiles\\RunUAT.bat" BuildGraph -script="D:\\Ikrima\\src\\Public-Development\\UnrealEngine\\Engine\\Build\\InstalledEngineBuild.xml" -target="Make Installed Build Win64" -set:HostPlatformOnly=true -set:WithWin32=false -set:WithIOS=false

Create InstalledBuild.txt and place in Engine\\Build

## Sans BuildGraph

D:/Ikrima/src/Public-Development/UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 UE4Editor -project="D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\BBRProto.uproject" -precompile

D:/Ikrima/src/Public-Development/UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 BBRProto -project="D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\BBRProto.uproject" -useprecompiled

D:/Ikrima/src/Public-Development/UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 BBRProtoEditor -project="D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\BBRProto.uproject" -useprecompiled

D:/Ikrima/src/Public-Development/UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 BBRProtoEditorBP -project="D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\BBRProto.uproject" -useprecompiled

## Add section to BaseEngine.ini

\[InstalledPlatforms\]

+InstalledPlatformConfigurations=(PlatformName="Win64", Configuration="Development", PlatformType="Editor")

;+InstalledPlatformConfigurations=(PlatformName="Win64", Configuration="Development", PlatformType="Game")

## Generate project files:

D:/Ikrima/src/Public-Development/UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 BBRProto -project="D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\BBRProto.uproject" -useprecompiled -projectfiles -game -engine

Uncheck ShaderCompilerWorker dependency from BBRProto
