---
sortIndex: 6
sidebar: ue4guide
---

# AutomationTool.exe Reference:

- Most of the command-line options/tools are done through engine commandlets

- AutomationTool.exe is what RunUAT.exe calls to cook/package, etc

- "UnrealEngine\\Engine\\Binaries\\DotNET\\AutomationTool.exe" -help will dump

      	 Automation.ParseCommandLine: Parsing command line: -Help
      	 CommandUtils.LogHelp:
      	 Automation Help:
      	 Executes scripted commands
      	 AutomationTool.exe \[-verbose\] \[-compileonly\] \[-p4\] Command0 \[-Arg0 -Arg1 -Arg2 .\] Command1 \[-Arg0 -Arg1 .\] Command2 \[-Arg0 .\] Commandn . \[EnvVar0=MyValue0 . EnvVarn=MyValuen\]

**Parameters:**

- verbose: Enables verbose logging
- nop4: Disables Perforce functionality (default if not run on a build machine)
- p4: Enables Perforce functionality (default if run on a build machine)
- compileonly Does not run any commands, only compiles them
- compile Dynamically compiles all commands (otherwise assumes they are already built)
- forcelocal Forces local execution
- help Displays helpe
- list Lists all available commands
- submit Allows UAT command to submit changes
- nosubmit Prevents any submit attempts
- nokill Does not kill any spawned processes on exit
- ignorejunk Prevents UBT from cleaning junk files
- UseLocalBuildStorage Allows you to use local storage for your root build storage dir (default of P:\\Builds (on PC) is changed to Engine\\Saved\\LocalBuilds). Used for local testing.


- AutomationTool.exe -list will dump Available commands:
  AnalyzeThirdPartyLibs
  BlameKeyword
  BuildCommonTools
  ZipProjectUp
  BuildCookRun
  BuildDerivedDataCache
  BuildPlugin
  BuildTarget
  BuildThirdPartyLibs
  CodeSurgery
  CookTarget
  CopyUAT
  FixupRedirects
  GenerateDSYM
  ListThirdPartySoftware
  IPhonePackager
  LauncherLocalization
  Localise
  MegaXGE
  StageTargetCommand
  TestP4_Info
  GitPullRequest
  TestFail
  TestSuccess
  TestMessage
  TestRecursion
  TestRecursionAuto
  TestMacZip
  TestP4_CreateChangelist
  TestP4_StrandCheckout
  TestP4_LabelDescription
  TestP4_ClientOps
  CleanDDC
  TestTestFarm
  TestArguments
  TestCombinePaths
  TestFileUtility
  TestLog
  TestChangeFileType
  TestGamePerf
  TestUATBuildProducts
  TestWatchdogTimer
  TestOSSCommands
  UBT
  ZeroEngineVersions
  SyncSource
  GenerateAutomationProject
  DumpBranch
  DebugSleep
  TestMcpConfigs
  TestBlame
  TestChanges
  TestKillAll
  TestCleanFormalBuilds
  TestStopProcess
  LookForOverlappingBuildProducts
  TestThreadedCopyFiles
  UpdateLocalVersion
  RebuildLightMaps
  ListMobileDevices
  UnrealSyncList
  UnrealSync
  BuildForUGS
  CleanFormalBuilds
  FinalizeInstalledBuild
  StreamCopyDescription
  UE4BuildUtilDummyBuildCommand
  BuildGraph
  Build
  TempStorageTests
  CleanTempStorage
  TestECJobErrorParse
  GUBP
  TestTempStorage

- AutomationTool.exe -Help [Commandlet] will dump the help for that commandlet. Example dump listed below

# AutomationTool.exe -help BuildCookRun/UnrealBuildTool Reference

Automation.ParseCommandLine: Parsing command line: -help BuildCookRun

Automation.Process: Setting up command environment.

```cpp
<FormatParams>d\_\_147.MoveNext: WARNING: Duplicated help parameter "-iterativecooking"

<FormatParams>d\_\_147.MoveNext: WARNING: Duplicated help parameter "-device"

<FormatParams>d\_\_147.MoveNext: WARNING: Duplicated help parameter "-RunAutomationTests"

<FormatParams>d\_\_147.MoveNext: WARNING: Duplicated help parameter "-NoXGE"
```

CommandUtils.LogHelp:

BuildCookRun Help:

## Builds/Cooks/Runs a project.

For non-uprojects project targets are discovered by compiling target rule files found in the project folder.

If -map is not specified, the command looks for DefaultMap entry in the project's DefaultEngine.ini and if not found, in BaseEngine.ini.

If no DefaultMap can be found, the command falls back to /Engine/Maps/Entry.

### Parameters:

\-project=Path Project path (required), i.e: -project=QAGame, -project=Samples\\BlackJack\\BlackJack.uproject, -project=D:\\Projects\\MyProject.uproject

\-destsample Destination Sample name

\-foreigndest Foreign Destination

\-targetplatform=PlatformName target platform for building, cooking and deployment (also -Platform)

\-servertargetplatform=PlatformName target platform for building, cooking and deployment of the dedicated server (also -ServerPlatform)

\-foreign Generate a foreign uproject from blankproject and use that

\-foreigncode Generate a foreign code uproject from platformergame and use that

\-CrashReporter true if we should build crash reporter

\-cook, -cookonthefly Determines if the build is going to use cooked data

\-skipcook use a cooked build, but we assume the cooked data is up to date and where it belongs, implies -cook

\-skipcookonthefly in a cookonthefly build, used solely to pass information to the package step

\-clean wipe intermediate folders before building

\-unattended assumes no operator is present, always terminates without waiting for something.

\-pak generate a pak file

\-signpak=keys sign the generated pak file with the specified key, i.e. -signpak=C:\\Encryption.keys. Also implies -signedpak.

\-prepak attempt to avoid cooking and instead pull pak files from the network, implies pak and skipcook

\-signed the game should expect to use a signed pak file.

\-skippak use a pak file, but assume it is already built, implies pak

\-stage put this build in a stage directory

\-skipstage uses a stage directory, but assumes everything is already there, implies -stage

\-manifests generate streaming install manifests when cooking data

\-createchunkinstall generate streaming install data from manifest when cooking data, requires -stage & -manifests

\-archive put this build in an archive directory

\-build True if build step should be executed

\-noxge True if XGE should NOT be used for building

\-CookPartialgc while cooking clean up packages as we are done with them rather then cleaning everything up when we run out of space

\-CookInEditor Did we cook in the editor instead of in UAT

\-IgnoreCookErrors Ignores cook errors and continues with packaging etc

\-nodebuginfo do not copy debug files to the stage

\-separatedebuginfo output debug info to a separate directory

\-MapFile generates a \*.map file

\-nocleanstage skip cleaning the stage directory

\-run run the game after it is built (including server, if -server)

\-cookonthefly run the client with cooked data provided by cook on the fly server

\-Cookontheflystreaming run the client in streaming cook on the fly mode (don't cache files locally instead force reget from server each file load)

\-fileserver run the client with cooked data provided by UnrealFileServer

\-dedicatedserver build, cook and run both a client and a server (also -server)

\-client build, cook and run a client and a server, uses client target configuration

\-noclient do not run the client, just run the server

\-logwindow create a log window for the client

\-package package the project for the target platform

\-distribution package for distribution the project

\-prereqs stage prerequisites along with the project

\-applocaldir location of prerequisites for applocal deployment

\-Prebuilt this is a prebuilt cooked and packaged build

\-deploy deploy the project for the target platform

\-getfile download file from target after successful run

\-IgnoreLightMapErrors Whether Light Map errors should be treated as critical

\-stagingdirectory=Path Directory to copy the builds to, i.e. -stagingdirectory=C:\\Stage

\-ue4exe=ExecutableName Name of the UE4 Editor executable, i.e. -ue4exe=UE4Editor.exe

\-archivedirectory=Path Directory to archive the builds to, i.e. -archivedirectory=C:\\Archive

\-archivemetadata Archive extra metadata files in addition to the build (e.g. build.properties)

\-createappbundle When archiving for Mac, set this to true to package it in a .app bundle instead of normal loose files

\-iterativecooking Uses the iterative cooking, command line: -iterativecooking or -iterate

\-CookMapsOnly Cook only maps this only affects usage of -cookall the flag

\-CookAll Cook all the things in the content directory for this project

\-SkipCookingEditorContent Skips content under /Engine/Editor when cooking

\-FastCook Uses fast cook path if supported by target

\-cmdline command line to put into the stage in UE4CommandLine.txt

\-bundlename string to use as the bundle name when deploying to mobile device

\-map map to run the game with

\-AdditionalServerMapParams Additional server map params, i.e ?param=value

\-device Devices to run the game on

\-serverdevice Device to run the server on

\-skipserver Skip starting the server

\-numclients=n Start extra clients, n should be 2 or more

\-addcmdline Additional command line arguments for the program

\-servercmdline Additional command line arguments for the program

\-clientcmdline Override command line arguments to pass to the client

\-nullrhi add -nullrhi to the client commandlines

\-fakeclient adds ?fake to the server URL

\-editortest rather than running a client, run the editor instead

\-RunAutomationTests when running -editortest or a client, run all automation tests, not compatible with -server

\-Crash=index when running -editortest or a client, adds commands like debug crash, debug rendercrash, etc based on index

\-deviceuser Linux username for unattended key genereation

\-devicepass Linux password

\-RunTimeoutSeconds timeout to wait after we lunch the game

\-SpecifiedArchitecture Determine a specific Minimum OS

\-UbtArgs extra options to pass to ubt

\-MapsToRebuildLightMaps List of maps that need light maps rebuilding

\-MapsToRebuildHLODMaps List of maps that need HLOD rebuilding

\-ForceMonolithic Toggle to combined the result into one executable

\-ForceDebugInfo Forces debug info even in development builds

\-ForceNonUnity Toggle to disable the unity build system

\-ForceUnity Toggle to force enable the unity build system

\-Licensee If set, this build is being compiled by a licensee

\-NoSign Skips signing of code/content files.

- UnrealEngine\\Engine\\Source\\Programs\\AutomationTool\\AutomationUtils\\**ProjectParams.cs** lists all of the parameters/options
