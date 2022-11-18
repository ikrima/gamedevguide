---
sortIndex: 9
sidebar: ue4guide
---
# Enabling UE4 Static Analysis

## Manually through UE4

- Pass `-StaticAnalyzer=VisualCPP` (or PVSStudio) to UBT.exe build
- Make sure to Do full build of project (clean then build)
- Also make sure to disable XGE
- Can also modify buildconfiguration.xml
  ```xml
  <WindowsPlatform>
  <StaticAnalyzer>VisualCpp</StaticAnalyzer>
  <!-- <StaticAnalyzer>PVSStudio</StaticAnalyzer> -->
  </WindowsPlatform>
  ```

## Devops script
```shell
build.py bbr --analyzer=PVSStudio
```

## UBT Command line
```shell
UnrealBuildTool.exe UE4Editor Win64 Development -staticanalyzer=pvsstudio
UnrealBuildTool.exe UE4Editor Win64 Development -staticanalyzer=visualcpp -nodebuginfo
```
[Reference](https://udn.unrealengine.com/questions/419598/how-to-integrate-pvs-studio-static-analysis.html)

## Manually setting up PVS Studio for Static Analysis
- Download [PVS Studio](http://www.viva64.com/en/pvs-studio)
- Launch standalone.exe, go to `Tools->Options->Registration`
  - Name: PVS-Studio Free
  - Key: FREE-FREE-FREE-FREE
- Add the following comments to every .cpp file
   ```cpp
   // This is an independent project of an individual developer. Dear PVS-Studio, please check it.
   // PVS-Studio Static Code Analyzer for C, C++, C#, and Java: http://www.viva64.com
   ```
- for now, you need to have Incredibuild disabled
  - go to BBProto.Build.cs and add `#!csharp BuildConfiguration.bAllowXGE = false;`
- Open a shell in the PVS Studio folder and run `#!shell CLMonitor.exe monitor`
- Do a full build of BBProto project
- Go back to the shell, and type `#!shell CLMonitor.exe analyze -l "sample.plog"`
- Double clicking sample.plog should launch the analysis results in PVS Studio
