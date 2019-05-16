Manually through UE4:
=====================

-   Pass -StaticAnalyzer=VisualCPP (or PVSStudio) to UBT.exe build

-   Make sure to Do full build of project (clean then build)

-   Also make sure to disable XGE

-   Can also modify buildconfiguration.xml:

> &lt;WindowsPlatform&gt;
>
> &lt;StaticAnalyzer&gt;VisualCpp&lt;/StaticAnalyzer&gt;
>
> &lt;!-- &lt;StaticAnalyzer&gt;PVSStudio&lt;/StaticAnalyzer&gt; --&gt;
>
> &lt;/WindowsPlatform&gt;

 

Devops script:
==============

build.py -c development -t editor check pvs

 

 

UBT Command line:
=================

UnrealBuildTool.exe UE4Editor Win64 Development -staticanalyzer=pvsstudio

UnrealBuildTool.exe UE4Editor Win64 Development -staticanalyzer=visualcpp -nodebuginfo

 

*From &lt;<https://udn.unrealengine.com/questions/419598/how-to-integrate-pvs-studio-static-analysis.html>&gt;*

 

 

 

Manually setting up PVS Studio for Static Analysis
==================================================

1.  Download PVS Studio from <http://www.viva64.com/en/pvs-studio/>

2.  Launch standalone.exe, go to Tools-Options-Registration

3.  Name: PVS-Studio Free

4.  Key: FREE-FREE-FREE-FREE

5.  (For now, you need to have Incredibuild disabled. )

> Go to BBProto.Build.cs and add BuildConfiguration.bAllowXGE = false;

1.  Open a shell in the PVS Studio folder and run

> CLMonitor.exe monitor

1.  Do a full build of BBProto project

2.  Go back to the shell, and type

> CLMonitor.exe analyze -l "sample.plog"

1.  Double clicking sample.plog should launch the analysis results in PVS Studio.
