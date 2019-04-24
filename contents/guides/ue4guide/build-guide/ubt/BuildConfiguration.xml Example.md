Located at: UnrealEngine\\Engine\\Saved\\UnrealBuildTool\\BuildConfiguration.xml

UnrealBuildTool reads settings from XML configuration files in the following locations:

\* Engine/Saved/UnrealBuildTool/BuildConfiguration.xml  
\* \*User Folder/AppData\*/Roaming/Unreal Engine/UnrealBuildTool/BuildConfiguration.xml  
\* \*My Documents\*/Unreal Engine/UnrealBuildTool/BuildConfiguration.xml

 

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/UnrealBuildSystem/Configuration/index.html>&gt;*

 

 

 

&lt;?xml version="1.0" encoding="utf-8" ?&gt;

&lt;Configuration xmlns="https://www.unrealengine.com/BuildConfiguration"&gt;

&lt;BuildConfiguration&gt;

&lt;!-- Debug --&gt;

&lt;!-- &lt;bSupportEditAndContinue&gt;false&lt;/bSupportEditAndContinue&gt; /\* d=false \*/ --&gt;

&lt;!--\*\*\*&lt;bOmitPCDebugInfoInDevelopment&gt;true&lt;/bOmitPCDebugInfoInDevelopment&gt; /\* d=false \*/ --&gt;

&lt;!-- &lt;bDisableDebugInfoForGeneratedCode&gt;false&lt;/bDisableDebugInfoForGeneratedCode&gt;--&gt; &lt;!-- /\* d=true \*/ --&gt;

&lt;!-- &lt;bAllowLTCG&gt;false&lt;/bAllowLTCG&gt; /\* d=false \*/ --&gt;

 

&lt;!-- Build --&gt;

&lt;bAdaptiveUnityDisablesPCH&gt;false&lt;/bAdaptiveUnityDisablesPCH&gt; &lt;!-- d=false --&gt;

&lt;ProcessorCountMultiplier&gt;1&lt;/ProcessorCountMultiplier&gt; &lt;!-- d=1 --&gt;

&lt;!--\*\*\* &lt;MinFilesUsingPrecompiledHeaderOverride&gt;1&lt;/MinFilesUsingPrecompiledHeaderOverride&gt; /\* d=0 \*/ --&gt;

&lt;!-- &lt;bFasterWithoutUnity&gt;true&lt;/bFasterWithoutUnity&gt; /\* d=false \*/ --&gt;

&lt;!--\*\*\* &lt;bAllowRemotelyCompiledPCHs&gt;true&lt;/bAllowRemotelyCompiledPCHs&gt; /\* d=false \*/ --&gt;

 

&lt;!-- &lt;bUseIncrementalLinking&gt;true&lt;/bUseIncrementalLinking&gt; /\* d=false \*/ --&gt;

&lt;!--\*\*\* &lt;bUseFastPDBLinking&gt;true&lt;/bUseFastPDBLinking&gt; /\* d=false \*/ --&gt;

&lt;!--\*\*\* &lt;bAddFastPDBToProjects&gt;true&lt;/bAddFastPDBToProjects&gt; /\* d=false \*/ --&gt;

&lt;!-- &lt;bUseUBTMakefiles&gt;true&lt;/bUseUBTMakefiles&gt; /\* d=true \*/ --&gt;

&lt;!--\*\*\*&lt;bUseUHTMakefiles&gt;true&lt;/bUseUHTMakefiles&gt; /\* d=false \*/ --&gt;

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
