---
sortIndex: 3
---

Located at: UnrealEngine\\Engine\\Saved\\UnrealBuildTool\\BuildConfiguration.xml

UnrealBuildTool reads settings from XML configuration files in the following locations:

\* Engine/Saved/UnrealBuildTool/BuildConfiguration.xml \* \*User Folder/AppData\*/Roaming/Unreal Engine/UnrealBuildTool/BuildConfiguration.xml \* \*My Documents\*/Unreal Engine/UnrealBuildTool/BuildConfiguration.xml

*Reference From <https://docs.unrealengine.com/latest/INT/Programming/UnrealBuildSystem/Configuration/index.html>*

```cpp
<?xml version="1.0" encoding="utf-8" ?>

<Configuration xmlns="https://www.unrealengine.com/BuildConfiguration">

<BuildConfiguration>

<!-- Debug -->

<!-- <bSupportEditAndContinue>false</bSupportEditAndContinue> /\* d=false \*/ -->

<!--***<bOmitPCDebugInfoInDevelopment&gt;true&lt;/bOmitPCDebugInfoInDevelopment> /\* d=false */ -->

<!-- <bDisableDebugInfoForGeneratedCode>false</bDisableDebugInfoForGeneratedCode>--> <!-- /* d=true \*/ -->

<!-- <bAllowLTCG>false</bAllowLTCG> /\* d=false */ -->

<!-- Build -->

 <bAdaptiveUnityDisablesPCH>false</bAdaptiveUnityDisablesPCH>                        <!-- d=false -->

<ProcessorCountMultiplier>1</ProcessorCountMultiplier>                              <!-- d=1     -->

 <!--***
<MinFilesUsingPrecompiledHeaderOverride>1</MinFilesUsingPrecompiledHeaderOverride>  /* d=0
*/ -->

 <!--<bFasterWithoutUnity>true</bFasterWithoutUnity>

<!--*\*\* <bAllowRemotelyCompiledPCHs>true</bAllowRemotelyCompiledPCHs> /\* d=false \*/ -->

<!-- <bUseIncrementalLinking>true</bUseIncrementalLinking> /\* d=false */ -->

<!--**\* <bUseFastPDBLinking>true</bUseFastPDBLinking> /\* d=false */ -->

<!--*** <bAddFastPDBToProjects>true</bAddFastPDBToProjects> /\* d=false */ -->

<!-- <bUseUBTMakefiles>true</bUseUBTMakefiles> /\* d=true */ -->

<!--***<bUseUHTMakefiles>true</bUseUHTMakefiles&gt; /* d=false */ -->

<!-- <bUsePCHFiles&gt;true&lt;/bUsePCHFiles&gt; /\* d=true \*/ -->

<!-- &lt;bUseUnityBuild&gt;true&lt;/bUseUnityBuild&gt; /\* d=true */ -->

<!-- <bForceUnityBuild&gt;false&lt;/bForceUnityBuild&gt; /\* d=false */ -->

<!-- <bUseAdaptiveUnityBuild&gt;true&lt;/bUseAdaptiveUnityBuild&gt; /\* d=true \*/ -->

<!-- bForcePrecompiledHeaderForGameModules>true</bForcePrecompiledHeaderForGameModules> /* d=true \*/ -->

<!-- Debug -->

<bPrintDebugInfo>true</bPrintDebugInfo> <!-- d=false -->

<bPrintPerformanceInfo>true</bPrintPerformanceInfo> <!-- d=false -->

<bStopXGECompilationAfterErrors>true</bStopXGECompilationAfterErrors><!-- d=true -->

<!-- <bPrintToolChainTimingInfo>true</bPrintToolChainTimingInfo> --> <!-- d=false --> <!-- Passes /bt+ & /time+ -->

<!-- <bDebugBuildsActuallyUseDebugCRT>false</bDebugBuildsActuallyUseDebugCRT> /\* d=false \*/ -->

</BuildConfiguration>

<WindowsPlatform>

<!-- \*\*\*<bStrictConformanceMode>true</bStrictConformanceMode> -->

<!-- \*\*\*<StaticAnalyzer>VisualCpp</StaticAnalyzer> -->

<!-- \*\*\*<StaticAnalyzer>PVSStudio</StaticAnalyzer> -->

<!-- <Compiler>VisualStudio2017</Compiler> -->

</WindowsPlatform>

</Configuration>
```
