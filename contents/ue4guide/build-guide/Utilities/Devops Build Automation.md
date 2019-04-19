Some useful flags that we might need when we get Jenkins running:

UBT or RunUAT or AutomationTool.exe

-   -build

-   -compile

-   -NoHotReloadFromIDE

-   -NoHotReload

-   -nocompileeditor

-   -nocompile

-   -skipcompile

-   -NoDDC

-   -CleanLocal

-   -NoXGE (Just for code analysis)

-   -NoSign

-   -rununrealcodeanalyzer (BuildConfiguration.bRunUnrealCodeAnalyzer = true;)

-   -precompile

-   -enablecodeanalysis (BuildConfiguration.bEnableCodeAnalysis = true;)

 

**BuildGraph**

-   -target=\"Make Installed Build Win64\" (with default InstalledEngineBuild.xml)

-   -set:HostPlatformOnly=true

-   -set:WithWin32=false

-   -set:WithIOS=false

-   -set:PublishDir=\"L:\\\_Programming\\RocketBuilds\\\"

 

 

 

# ScratchPad Notes:

\*\*Using BuildGraph\*\*

 

\"D:\\Ikrima\\src\\Public-Development\\UnrealEngine\\Engine\\Build\\BatchFiles\\RunUAT.bat\" BuildGraph -script=\"D:\\Ikrima\\src\\Public-Development\\UnrealEngine\\Engine\\Build\\InstalledEngineBuild.xml\" -target=\"Make Installed Build Win64\" -set:HostPlatformOnly=true -set:WithWin32=false -set:WithIOS=false

 

Create InstalledBuild.txt and place in Engine\\Build

 

\*\*Sans BuildGraph\*\*

D:/Ikrima/src/Public-Development/UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 UE4Editor -project=\"D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\BBRProto.uproject\" -precompile

D:/Ikrima/src/Public-Development/UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 BBRProto -project=\"D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\BBRProto.uproject\" -useprecompiled

D:/Ikrima/src/Public-Development/UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 BBRProtoEditor -project=\"D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\BBRProto.uproject\" -useprecompiled

D:/Ikrima/src/Public-Development/UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 BBRProtoEditorBP -project=\"D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\BBRProto.uproject\" -useprecompiled

 

\*\*Add section to BaseEngine.ini\*\*

\[InstalledPlatforms\]

+InstalledPlatformConfigurations=(PlatformName=\"Win64\", Configuration=\"Development\", PlatformType=\"Editor\")

;+InstalledPlatformConfigurations=(PlatformName=\"Win64\", Configuration=\"Development\", PlatformType=\"Game\")

 

 

\*\*Generate project files:\*\*

D:/Ikrima/src/Public-Development/UnrealEngine/Engine/Binaries/DotNET/UnrealBuildTool.exe Development Win64 BBRProto -project=\"D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\BBRProto.uproject\" -useprecompiled -projectfiles -game -engine

 

Uncheck ShaderCompilerWorker dependency from BBRProto

 

 

 

 

Problems:

1-ShaderCompilerWorker is generated as a dependency to the GameProject. This causes project build to error out with -useprecompiled:

2\>EXEC : error : No modules found to build. All requested binaries were already built.

 

 

2.After VS compile, editor shows dialog error box saying game-dlls have been built with a different version of the engine. It kicks off a compilation that ends very quickly but still shouldn\'t be there at all

 

Editor Module

Plugin

Editor BP Module

 

3\. How do I build all the variants (e.g. a Rocket Build) so that artists can build client/server/game/editor + development/debug/debuggame/shipping/test variants?

 

4\. How do I decrease the size of the rocket build?

 
