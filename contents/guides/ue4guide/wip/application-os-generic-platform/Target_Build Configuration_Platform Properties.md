---
sortIndex: 2
---

Get build configuration & UBT settings from C++

```cpp
FGenericPlatformProperties, FWindowsPlatformProperties, FPlatformProperties

- FPlatformProperties::IniPlatformName()

- FPlatformProperties::PlatformName()

ITargetPlatformManagerModule* TPM = GetTargetPlatformManager();

 if (TPM)

 {

 const TArray<ITargetPlatform\*>& Platforms = TPM->GetActiveTargetPlatforms();

 for (int32 Index = 0; Index < Platforms.Num(); ++Index)

 {

 if (Platforms\[Index]->PackageBuild(SourceDir))

 }

 }

 }
```

Get build configuration & UBT settings from C++ at runtime:

```cpp
 EBuildConfigurations::Type FApp::GetBuildConfiguration()

 {

 #if UE_BUILD_DEBUG

 return EBuildConfigurations::Debug;

 #elif UE_BUILD_DEVELOPMENT

 // Detect DebugGame using an extern variable in monolithic configurations, or a command line argument in modular configurations.

 #if IS_MONOLITHIC

 extern const bool GIsDebugGame;

 return GIsDebugGame? EBuildConfigurations::DebugGame : EBuildConfigurations::Development;

 #else

 return IsRunningDebug() ? EBuildConfigurations::DebugGame : EBuildConfigurations::Development;

 #endif

 #elif UE_BUILD_SHIPPING

 return EBuildConfigurations::Shipping;

 #elif UE_BUILD_TEST

 return EBuildConfigurations::Test;

 #else

 return EBuildConfigurations::Unknown;

 #endif

 }
```

Other useful functions:

- FApp::GetBuildVersion

- FApp::GetBuildDate

- FApp::GetEpicProductIdentifier

- FApp::GetBranchName

- FApp::GetProjectName

- FApp::GetName() - Name of application ie UE4, Rocket, BBR

- FPlatformMisc::GetUBTPlatform()

- FPlatformMisc::GetUBTTarget()

- FPlatformMisc::ProjectDir()

- FPlatformMisc::RootDir()

- FPlatformMisc::EngineDir()

- FPlatformMisc::LaunchDir()

- BuildSettings::IsLicenseeVersion()

- BuildSettings::GetCurrentChangelist()

- BuildSettings::GetCompatibleChangelist()

- BuildSettings::GetBranchName()

- BuildSettings::GetBuildVersion()

- Also available in FBuildVersion struct

  - Fill it by calling:

     FBuildVersion::TryRead(FBuildVersion::GetDefaultFileName(), outBldVersion)

- Also can use FEngineVersion::Current().GetChangelist())
