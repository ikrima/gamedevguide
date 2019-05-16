```
sortIndex: 1
```

#  TODO:

- Look into multiprocess cooking and how to enable if it's not on by default

## Useful Console Command Cooking:

## IMPORTANT: THESE HAVE TO BE PASSED DIRECTLY TO THE COOK COMMANDLET.

#### Check the variants for passing to project launcher/automation tool

- -NODEV pass itas a cooking command line switch to the cook commandlet to exclude content in developer folders
- **AUTOMATION VARIANT: -**AdditionalCookerOptions="-NODEV"

- -verbosecookerwarnings

  - **AUTOMATION VARIANT: -**AdditionalCookerOptions="-verbosecookerwarnings"

- -skipeditorcontent

  - **AUTOMATION VARIANT:** -SkipCookingEditorContent

- -LogCmds="global verbose"

  - For missing asset references, turn on LogRedirectors verbose logging to show property references to missing assets e.g. -LogCmds="LogRedirectors verbose"

  - **AUTOMATION VARIANT: -**AdditionalCookerOptions="-LogCmds=\\"global verbose\\""

- **IMPORTANT: Don't have a trailing quote in Additional Cooker Options**

  - GOOD: -AdditionalCookerOptions="-LogCmds=\\"LogRedirectors verbose\\" -nodev"

  - BAD: -AdditionalCookerOptions="-nodev -LogCmds=\\"LogRedirectors verbose\\""

## Packaging Test Build

- Go to your UE4/Engine/Build/BatchFiles folder, and run the following:

  "D:\\Ikrima\\src\\Public-Development\\UnrealEngine\\Engine\\Build\\BatchFiles\\RunUAT.bat" BuildCookRun -project="D:\\Ikrima\\src\\Assembla\\GENeuro\\Neuro.uproject" -windows-noeditor -cook -build -stage -pak -package -clientconfig=Test

## Packaging without cooking or building:

- "D:\\Ikrima\\src\\Public-Development\\UnrealEngine\\Engine\\Build\\BatchFiles\\RunUAT.bat" BuildCookRun -project="D:\\Ikrima\\src\\Assembla\\GENeuro\\Neuro.uproject" -windows-noeditor -skipcook -stage -pak -package -clientconfig=Test

## Only Cook Content:

- "D:\\Ikrima\\src\\Public-Development\\UnrealEngine\\Engine\\Build\\BatchFiles\\RunUAT.bat" BuildCookRun -project="D:\\Ikrima\\src\\Assembla\\GENeuro\\Neuro.uproject" -windows-noeditor -cook -iterate -clientconfig=Test

## Cooking content Detailed \[sometimes RunUAT fails but this direct command doesn't\]:

- UE4Editor.exe &lt;uproject&gt; -run=cook -targetplatformname=WindowsNoEditor -targetconfiguration=DebugGame -targetplatform=&lt;Plat1&gt;+&lt;Plat2&gt; \[-cookonthefly\] \[-iterate\] \[-map=&lt;Map1&gt;+&lt;Map2&gt;\]

- UE4Editor-Cmd.exe &lt;uproject&gt; -run=cook -targetplatformname=WindowsNoEditor -targetconfiguration=DebugGame -targetplatform=&lt;Plat1&gt;+&lt;Plat2&gt; \[-cookonthefly\] \[-iterate\] \[-map=&lt;Map1&gt;+&lt;Map2&gt;\]

## Cook On The Fly:

"D:\\Ikrima\\src\\Public-Development\\UnrealEngine\\Engine\\Binaries\\Win64\\UE4Editor.exe" "D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\BBRProto.uproject" -run=cook -targetplatform=Windows -cookonthefly -iterate -debug -log

"D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\Binaries\\Win64\\BBRProto-Win64-DebugGame.exe" -Game -debug -log -filehostip=127.0.0.1

"D:\\Ikrima\\src\\Public-Development\\UnrealEngine\\Engine\\Binaries\\Win64\\UE4Editor.exe" "D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\BBRProto.uproject" -targetplatform=Windows -Game -debug -log -filehostip=127.0.0.1

## Cooking on the Fly Notes

### Server

#### Basic Command Line

"D:\\Ikrima\\src\\Public-Development\\UnrealEngine\\Engine\\Binaries\\Win64\\UE4Editor.exe" "D:\\Ikrima\\src\\Assembla\\Bebylon\\BBRProto\\BBRProto.uproject" -run=cook -targetplatform=Windows -cookonthefly -iterate -debug -log

#### _Project File_

If you do not specify the Unreal project file, you will get a message box telling you paper2D is not present, and the program will exit when you click it.

#### _TargetPlatform_

When running the standalone version, the game will fail to connect to a cook server run with "-targetplatform=Windows"; it requires "-targetplatform=WindowsNoServer". The target platforms must match completely. I haven't tried it, but that should imply that the server requires "-targetplatform=WindowsServer". That means that a server cannot fulfill request to both a standalone game and a server. There is no command line argument for port number. Thus, to have both a client and a server running with data cooked on the fly requires two computers right now.

## Client

### Basic Command Line

"D:\\src\\Public-Development\\UnrealEngine\\Engine\\Binaries\\Win64\\UE4Editor-Win64-Debug.exe" "D:\\src\\Assembla\\Bebylon\\BBR\\BBR.uproject" -targetplatform=Windows -Game -debug -log -filehostip=127.0.0.1

#### _TargetPlatform_

The -targetplatform argument is ignored when running the standalone. It always attempts to connect as WindowsNoServer. I don't know if the other builds make requests based on the argument.
