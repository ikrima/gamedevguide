---
sortIndex: 5
---

## 1. Use IWYU:

<https://docs.unrealengine.com/latest/INT/Programming/UnrealBuildSystem/IWYUReferenceGuide/index.html>

This means forward declaring everything, moving everything into implementation files as much as possible. For templated things, we forward declare them and then declare explicit template specializations. Obv not a good practice for library code, but for our own modules, it's fine.

You'll run into issues forward declaring references to structs in blueprint callable functions because of the generated thunk code from UHT so that's unavoidable. Also, inlined functions need to be in the header.

## 2. Useful build switches

- clean

- CleanLocal

- unattended

**Cooking:**

- DirectoriesToCook

- Compressed

- UnversionedCookedContent

- NumCookersToSpawn

- IterateSharedCookedBuild

**Staging:**

- prereqs

- iterativedeploy

**Automation running:**

\-skipserver

\-noclient

\-noserver

\-device

\-serverdevice

\-numclients=n

\-nullrhi

\-addcmdline

\-servercmdline

\-logwindow

the nuclear option is bOmitPCDebugInfoInDevelopment if you're iterating. For dev+debug, I turn on fastpdblinking & useUHTMakeFiles & bUseIncrementalLinking. In VS2017, it should be even faster

Just be careful with fastlinked PDBs if you share them with other devs bc that'll break. Build machine should also not use fastlinked pdbs

Also, bUseUBTMakefiles = true => means you have to force regenerate UBT Makefiles when you invalidate them.

/// Events that can invalidate the 'UBT Makefile':

///                - Adding/removing .cpp files

///                - Adding/removing .h files with UObjects

///                - Adding new UObject types to a file that didn't previously have any

///                - Changing global build settings (most settings in this file qualify.)

///                - Changed code that affects how Unreal Header Tool works

///

You can force regeneration of the 'UBT Makefile' by passing the '-gather' argument, or simply regenerating project files

//Config

//BuildConfiguration.RelativeEnginePath = /\* ...\*/;

//Debug

//---BuildConfiguration.bOmitPCDebugInfoInDevelopment = true /\* d=false \*/;

//BuildConfiguration.bSupportEditAndContinue = false /\* d=false \*/;

//BuildConfiguration.bDisableDebugInfoForGeneratedCode = true /\* d=true \*/;

//BuildConfiguration.bAllowLTCG = false /\* d=false \*/;

//Build

bEnforceIWYU = true;

PCHUsage = ModuleRules.PCHUsageMode.UseExplicitOrSharedPCHs;

BuildConfiguration.ProcessorCountMultiplier = 2 /\* d=1 \*/;

//---MinFilesUsingPrecompiledHeaderOverride = 1;

//---bFasterWithoutUnity = true;

//---BuildConfiguration.bAllowRemotelyCompiledPCHs = true /\* d=false \*/;

BuildConfiguration.bUseIncrementalLinking = true /\* d=false \*/;

BuildConfiguration.bUseFastPDBLinking = true /\* d=false \*/;

BuildConfiguration.bAddFastPDBToProjects = true /\* d=false \*/;

BuildConfiguration.bUseUBTMakefiles = true /\* d=true \*/;

BuildConfiguration.bUseUHTMakefiles = true /\* d=false \*/;

//BuildConfiguration.bUsePCHFiles = true /\* d=true \*/;

//BuildConfiguration.bUseUnityBuild = true /\* d=true \*/;

//BuildConfiguration.bForceUnityBuild = false /\* d=false \*/;

//BuildConfiguration.bUseAdaptiveUnityBuild = true /\* d=true \*/;

//BuildConfiguration.bForcePrecompiledHeaderForGameModules = true /\* d=true \*/;

BuildConfiguration.bPrintDebugInfo = true /\* d=false \*/;

BuildConfiguration.bPrintPerformanceInfo = true /\* d=false \*/;

BuildConfiguration.bStopXGECompilationAfterErrors = false /\* d=true \*/;

BuildConfiguration.bPrintToolChainTimingInfo = true /\* d=false (adds /bt+ &/time & /d2cgsummary) \*/

//BuildConfiguration.bEnableCodeAnalysis = true /\* d=false \*/;

//BuildConfiguration.bRunUnrealCodeAnalyzer = true /\* d=false \*/;

//BuildConfiguration.bUCACheckUObjectThreadSafety = true /\* d=false \*/;

//BuildConfiguration.bUCACheckPCHFiles = true /\* d=false \*/;

//BuildConfiguration.UCAUsageThreshold = 0.0f /\* d=100.0 \*/;

//BuildConfiguration.UCAModuleToAnalyze = "BBR" /\* d="" \*/;
