---
sortIndex: 2
---

/// Enabled for builds that need to initialize the ApplicationCore module. Command line utilities do not normally need this.

bCompileAgainstApplicationCore

/// Specifies whether to share engine binaries and intermediates with other projects, or to create project-specific versions. By default,

/// editor builds always use the shared build environment (and engine binaries are written to Engine/Binaries/Platform), but monolithic builds

/// and programs do not (except in installed builds). Using the shared build environment prevents target-specific modifications to the build

/// environment.

//BuildEnvironment = TargetBuildEnvironment.Unique;

//bBuildAllPlugins = true;

//bOutputToEngineBinaries = true;

//LinkType = TargetLinkType.Modular;

Type = TargetType.Game;

ExtraModuleNames.Add("BBR");

//if (UEBuildConfiguration.bBuildDeveloperTools || (Target.Configuration != UnrealTargetConfiguration.Shipping && Target.Configuration != UnrealTargetConfiguration.Test))

//{

// ExtraModuleNames.Add("UnrealEnginePython");

// AdditionalPlugins.Add("UnrealEnginePython");

//}

//For program targets, specify the module to launch

//LaunchModuleName = "..."

//--------------------------------------------------------------

//Project specific Build Configuration

//--------------------------------------------------------------

//Config

//RelativeEnginePath = /\* ...\*/;

//Debug

//bOmitPCDebugInfoInDevelopment = true /\* d=false \*/;

//bSupportEditAndContinue = false /\* d=false \*/;

//bDisableDebugInfoForGeneratedCode = true /\* d=true \*/;

//bAllowLTCG = false /\* d=false \*/;

//Build

//bAllowRemotelyCompiledPCHs = true /\* d=false \*/;

//bUseIncrementalLinking = true /\* d=false \*/;

//bUseFastPDBLinking = true /\* d=false \*/;

//bAddFastPDBToProjects = true /\* d=false \*/;

//bUseUHTMakefiles = true /\* d=false \*/;

//bAdaptiveUnityDisablesOptimizations = true /\* d=false \*/;

//bUsePCHFiles = true /\* d=true \*/;

//bUseUnityBuild = true /\* d=true \*/;

//bForceUnityBuild = false /\* d=false \*/;

//bUseAdaptiveUnityBuild = true /\* d=true \*/;

//bForcePrecompiledHeaderForGameModules = true /\* d=true \*/;

//Debug

//bStopXGECompilationAfterErrors = false /\* d=true \*/;

//bDebugBuildsActuallyUseDebugCRT = false /\* d=false \*/;

//OutCPPEnvironmentConfiguration.AdditionalArguments = "/Zm850";

//Flags to see what's causing slow compilation

//OutCPPEnvironmentConfiguration.AdditionalArguments = "/d2cgsummary (/bt or /bt+)";

// /d1PP /d1reportAllClassLayout /d1reportSingleClassLayoutXXX

//OutLinkEnvironment.AdditionalArguments = "/time" or "/time+" or /d2:-cgsummary

//GlobalDefinitions.Add("ALLOW_LOG_FILE=0");

//OutCPPEnvironmentConfiguration.bOptimizeCode = false;
