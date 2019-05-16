Get build configuration & UBT settings from C++

 

FGenericPlatformProperties, FWindowsPlatformProperties, FPlatformProperties

-   FPlatformProperties::IniPlatformName()

-   FPlatformProperties::PlatformName()

 

ITargetPlatformManagerModule\* TPM = GetTargetPlatformManager();

 

​	if (TPM)

​	{

​	const TArray&lt;ITargetPlatform\*&gt;& Platforms = TPM-&gt;GetActiveTargetPlatforms();

 

​	for (int32 Index = 0; Index &lt; Platforms.Num(); ++Index)

​	{

​	if (Platforms\[Index\]-&gt;PackageBuild(SourceDir))

​	}

​	}

​	}

 

Get build configuration & UBT settings from C++ at runtime:

​	EBuildConfigurations::Type FApp::GetBuildConfiguration()

​	{

​	#if UE\_BUILD\_DEBUG

​		return EBuildConfigurations::Debug;

 

​	#elif UE\_BUILD\_DEVELOPMENT

​	// Detect DebugGame using an extern variable in monolithic configurations, or a command line argument in modular configurations.

​	#if IS\_MONOLITHIC

​		extern const bool GIsDebugGame;

​			return GIsDebugGame? EBuildConfigurations::DebugGame : EBuildConfigurations::Development;

​		#else

​			return IsRunningDebug() ? EBuildConfigurations::DebugGame : EBuildConfigurations::Development;

​		#endif

 

​		#elif UE\_BUILD\_SHIPPING

​		return EBuildConfigurations::Shipping;

 

​	#elif UE\_BUILD\_TEST

​	return EBuildConfigurations::Test;

 

​	#else

​	return EBuildConfigurations::Unknown;

​	#endif

​	}

 

Other useful functions:

-   FApp::GetBuildVersion

-   FApp::GetBuildDate

-   FApp::GetEpicProductIdentifier

-   FApp::GetBranchName

-   FApp::GetProjectName

-   FApp::GetName() - Name of application ie UE4, Rocket, BBR

-   FPlatformMisc::GetUBTPlatform()

-   FPlatformMisc::GetUBTTarget()

-   FPlatformMisc::ProjectDir()

-   FPlatformMisc::RootDir()

-   FPlatformMisc::EngineDir()

-   FPlatformMisc::LaunchDir()

-   BuildSettings::IsLicenseeVersion()

-   BuildSettings::GetCurrentChangelist()

-   BuildSettings::GetCompatibleChangelist()

-   BuildSettings::GetBranchName()

-   BuildSettings::GetBuildVersion()

- Also available in FBuildVersion struct

  -   Fill it by calling:  
      
      ​	FBuildVersion::TryRead(FBuildVersion::GetDefaultFileName(), outBldVersion)

-   Also can use FEngineVersion::Current().GetChangelist())


