---
sortIndex: 7
---

## Performance:

- **Set these buildconfiguration.xml settings**

  - <bPrintPerformanceInfo>true</bPrintPerformanceInfo>

  - <bLogDetailedActionStats>true</bLogDetailedActionStats>

  - <bPrintToolChainTimingInfo>true</bPrintToolChainTimingInfo>

## Debugging UBT/Unreal Build Tool

- **Useful command line flags** (put these in one line: -verbose -log=D:\\Log.txt )

      	UE4Editor Win64 Development -WaitMutex -FromMsBuild -DEPLOY
      	-Verbose or -VeryVerbose
      	-log=D:\\Log.txt
      	-xgeexport
      	-noxge
      	-installed

- Add <bPrintDebugInfo>true<bPrintDebugInfo>

- Also make sure to set working directory to Engine/Source for development profile project in vs

## Export documentation for build config/targetrules.cs/modulerules.cs props

-buildconfigurationdoc=D:\\buildcfgdoc.txt

-modulerulesdoc=D:\\modulerulesdoc.txt -

targetrulesdoc=D:\\targetrulesdoc.txt

## Verbose Logging:

- Add -verbose cmdline

- If using RunUAT, add -UbtArgs="-verbose" and -VeryVerbose

- <bLogDetailedActionStats>true</bLogDetailedActionStats>

- <bPrintDebugInfo>true</bPrintDebugInfo>

## Debugging outdated files:

If you run UBT with the -verbose option, it should print out a message showing the files that it considers out of date that trigger a build. Something like this:

`VERBOSE: UE4Editor-Core-Win64-Debug.lib: Prerequisite PCH.Core.h.obj is newer than the last execution of the action: 24/08/2017 13:06:43 vs 23/08/2017 12:41:24`

## Build & Environment variables:

Build steps can use $(EngineDir), $(ProjectDir), $(TargetName), $(TargetPlatform), $(TargetConfiguration), $(TargetType), \$(ProjectFile).

## Debugging compile flags & link switches

Would probably debug this by running UnrealBuildTool with the -xgeexport option. This will export a list of actions that need to be executed (in a format for consumption by Incredibuild, but that doesn't matter). That should show you the command line that produces every output file (or give you paths to the response files used to generate each).

## Debugging Frequent Rebuilds:

We made a change for 4.20 that always writes out this file; I didn't realize it didn't make it into the 4.19 release.

In 4.19, you should be able to add the "-verbose -log=D:\\Log.txt" arguments to the build command line to output the file (unfortunately it's very verbose, and writes to stdout as well, which we also fixed in 4.20). There should be log output saying things like "Produced item XXX was produced by outdated command line", describing everything that needed to be rebuilt. Can you reproduce the bug and attach the output?

The other option would be to look at the ActionGraph.IsActionOutdated() function in UBT. This function contains all the log output we're looking for - if you change all the Log.TraceLog() calls to Log.TraceInformation(), it will output the messages to stdout. You may have to place a breakpoint in this function to be able to debug what is changing.

_Reference From https://udn.unrealengine.com/questions/436096/frequent-ubt-code-rebuilds.html_

## Module Include/Header Paths:

- Header include paths no longer automatically bring every subdirectory (for perf in building)

- bLegacyPublicIncludePaths = false; is the setting that controls it in .Target.cs

- All entries in Public/PrivateIncludePaths are full paths, most easily done with "using [http://System.IO ];" at the top, then Path.Combine(ModuleDirectory, "relative/path")

- Commandlet to migrate old codebase to full path header includes:

  `RunUAT.bat RebasePublicIncludePaths -Project="path/to/temp-project.uproject" -UpdateDir="path/to/temp-project/Plugins" -write`

  _Reference From https://twitter.com/kantandev/status/1020017126806032384_

## How UBT Builds RulesObjects, Modules, Targets:

- Useful functions/files

- RulesCompiler.cs, CreateProjectRulesAssembly(),

  CreateEngineRulesAssembly(), FindAllRulesFiles(),
  CreateTarget(), CreateTargetRules(), CreateTargetRulesAssembly()

- RulesAssembly.cs

http://system.io ]: https://t.co/RMAGwHWMg1
