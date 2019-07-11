---
sortIndex: 9
---

# Manually through UE4

- Pass -StaticAnalyzer=VisualCPP (or PVSStudio) to UBT.exe build
- Make sure to Do full build of project (clean then build)
- Also make sure to disable XGE
- Can also modify buildconfiguration.xml:

  ```xml
  <WindowsPlatform>
  <StaticAnalyzer>VisualCpp</StaticAnalyzer>
  <!-- <StaticAnalyzer>PVSStudio</StaticAnalyzer> -->
  <WindowsPlatform>
  ```

# Devops script

```batch
build.py -c development -t editor check pvs
```

# UBT Command line

```batch
UnrealBuildTool.exe UE4Editor Win64 Development -staticanalyzer=pvsstudio
UnrealBuildTool.exe UE4Editor Win64 Development -staticanalyzer=visualcpp -nodebuginfo
```

*Reference From <https://udn.unrealengine.com/questions/419598/how-to-integrate-pvs-studio-static-analysis.html>*

# Manually setting up PVS Studio for Static Analysis

1. Download PVS Studio from <http://www.viva64.com/en/pvs-studio>

1. Launch standalone.exe, go to Tools->Options->Registration

1. Name: PVS-Studio Free

1. Key: FREE-FREE-FREE-FREE

1. Add the following comments to every .cpp file

   ```cpp
   // This is an independent project of an individual developer. Dear PVS-Studio, please check it.
   // PVS-Studio Static Code Analyzer for C, C++, C#, and Java: http://www.viva64.com
   ```

1. (For now, you need to have Incredibuild disabled. )

   Go to BBProto.Build.cs and add `csharp>BuildConfiguration.bAllowXGE = false;`

1. Open a shell in the PVS Studio folder and run `batch>CLMonitor.exe monitor`

1. Do a full build of BBProto project

1. Go back to the shell, and type `batch>CLMonitor.exe analyze -l "sample.plog"`

1. Double clicking sample.plog should launch the analysis results in PVS Studio.
