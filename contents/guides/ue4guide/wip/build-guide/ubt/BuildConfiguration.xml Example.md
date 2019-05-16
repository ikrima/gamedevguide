---
sortIndex: 3
---

Located at: UnrealEngine\\Engine\\Saved\\UnrealBuildTool\\BuildConfiguration.xml

UnrealBuildTool reads settings from XML configuration files in the following locations:

\* Engine/Saved/UnrealBuildTool/BuildConfiguration.xml 
\* \*User Folder/AppData\*/Roaming/Unreal Engine/UnrealBuildTool/BuildConfiguration.xml 
\* \*My Documents\*/Unreal Engine/UnrealBuildTool/BuildConfiguration.xml

*Reference From https://docs.unrealengine.com/latest/INT/Programming/UnrealBuildSystem/Configuration/index.html*



<?xml version="1.0" encoding="utf-8" ?>

<Configuration xmlns="https://www.unrealengine.com/BuildConfiguration">

<BuildConfiguration>

<!-- Debug -->

<!-- &lt;bSupportEditAndContinue&gt;false&lt;/bSupportEditAndContinue&gt; /\* d=false \*/ -->

<!--***<bOmitPCDebugInfoInDevelopment&gt;true&lt;/bOmitPCDebugInfoInDevelopment&gt; /\* d=false */ -->

<!-- &lt;bDisableDebugInfoForGeneratedCode&gt;false&lt;/bDisableDebugInfoForGeneratedCode&gt;--&gt; &lt;!-- /* d=true \*/ -->

<!-- &lt;bAllowLTCG&gt;false&lt;/bAllowLTCG&gt; /\* d=false */ -->

<!-- Build -->

 <bAdaptiveUnityDisablesPCH>false</bAdaptiveUnityDisablesPCH>                        <!-- d=false -->

<ProcessorCountMultiplier>1</ProcessorCountMultiplier>                              <!-- d=1     -->

 <!--***
<MinFilesUsingPrecompiledHeaderOverride>1</MinFilesUsingPrecompiledHeaderOverride>  /* d=0    
*/ -->

 <!--<bFasterWithoutUnity>true</bFasterWithoutUnity>

<!--*\*\* &lt;bAllowRemotelyCompiledPCHs&gt;true&lt;/bAllowRemotelyCompiledPCHs&gt; /\* d=false \*/ -->

<!-- &lt;bUseIncrementalLinking&gt;true&lt;/bUseIncrementalLinking&gt; /\* d=false */ -->

<!--**\* &lt;bUseFastPDBLinking&gt;true&lt;/bUseFastPDBLinking&gt; /\* d=false */ -->

<!--*** <bAddFastPDBToProjects&gt;true&lt;/bAddFastPDBToProjects&gt; /\* d=false */ -->

<!-- <bUseUBTMakefiles>true</bUseUBTMakefiles> /\* d=true */ -->

<!--***<bUseUHTMakefiles>true</bUseUHTMakefiles&gt; /* d=false */ -->

&lt;!-- &lt;bUsePCHFiles&gt;true&lt;/bUsePCHFiles&gt; /\* d=true \*/ --&gt;

&lt;!-- &lt;bUseUnityBuild&gt;true&lt;/bUseUnityBuild&gt; /\* d=true \*/ --&gt;

&lt;!-- &lt;bForceUnityBuild&gt;false&lt;/bForceUnityBuild&gt; /\* d=false \*/ --&gt;

&lt;!-- &lt;bUseAdaptiveUnityBuild&gt;true&lt;/bUseAdaptiveUnityBuild&gt; /\* d=true \*/ --&gt;

&lt;!-- &lt;bForcePrecompiledHeaderForGameModules&gt;true&lt;/bForcePrecompiledHeaderForGameModules&gt; /\* d=true \*/ --&gt;

&lt;!-- Debug --&gt;

&lt;bPrintDebugInfo&gt;true&lt;/bPrintDebugInfo&gt; &lt;!-- d=false --&gt;

&lt;bPrintPerformanceInfo&gt;true&lt;/bPrintPerformanceInfo&gt; &lt;!-- d=false --&gt;

&lt;bStopXGECompilationAfterErrors&gt;true&lt;/bStopXGECompilationAfterErrors&gt; &lt;!-- d=true --&gt;

&lt;!-- &lt;bPrintToolChainTimingInfo&gt;true&lt;/bPrintToolChainTimingInfo&gt; --&gt;&lt;!-- d=false --&gt; &lt;!-- Passes /bt+ & /time+ --&gt;

&lt;!-- &lt;bDebugBuildsActuallyUseDebugCRT&gt;false&lt;/bDebugBuildsActuallyUseDebugCRT&gt; /\* d=false \*/ --&gt;

&lt;/BuildConfiguration&gt;

&lt;WindowsPlatform&gt;

&lt;!-- \*\*\*&lt;bStrictConformanceMode&gt;true&lt;/bStrictConformanceMode&gt; --&gt;

&lt;!-- \*\*\*&lt;StaticAnalyzer&gt;VisualCpp&lt;/StaticAnalyzer&gt; --&gt;

&lt;!-- \*\*\*&lt;StaticAnalyzer&gt;PVSStudio&lt;/StaticAnalyzer&gt; --&gt;

&lt;!-- &lt;Compiler&gt;VisualStudio2017&lt;/Compiler&gt; --&gt;

&lt;/WindowsPlatform&gt;

&lt;/Configuration&gt;
