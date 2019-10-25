---
sortIndex: 2
---

Powershell script to add exclusions to windows defender.

***Important:*** You should verify each of the lines.

```powershell
$kl_bbassembladir    = $env:KL_BBASSEMBLADIR
$userPath            = $env:USERPROFILE
$pathExclusions      = New-Object System.Collections.ArrayList
$processExclusions   = New-Object System.Collections.ArrayList
$extensionExclusions = New-Object System.Collections.ArrayList

# Visual Studio 2017 Exclusions
$pathExclusions.Add('C:\Windows\Microsoft.NET') > $null
$pathExclusions.Add('C:\Windows\assembly') > $null
$pathExclusions.Add($userPath + '\AppData\Local\Microsoft\VisualStudio') > $null
$pathExclusions.Add($userPath + '\AppData\Roaming\Microsoft\VisualStudio') > $null
$pathExclusions.Add('C:\ProgramData\Microsoft\VisualStudio\Packages') > $null
$pathExclusions.Add('C:\Program Files (x86)\MSBuild') > $null
$pathExclusions.Add('C:\Program Files (x86)\Microsoft Visual Studio 14.0') > $null
$pathExclusions.Add('C:\Program Files (x86)\Microsoft Visual Studio') > $null
$pathExclusions.Add('C:\Program Files (x86)\Microsoft SDKs\NuGetPackages') > $null
$pathExclusions.Add('C:\Program Files (x86)\Microsoft SDKs') > $null
$pathExclusions.Add('C:\Program Files\dotnet') > $null
$pathExclusions.Add('C:\Program Files\Microsoft SDKs') > $null
$pathExclusions.Add('C:\Program Files (x86)\Windows Kits\10\bin') > $null
$pathExclusions.Add('C:\Program Files (x86)\Windows Kits\10\Debuggers') > $null

$processExclusions.Add('devenv.exe') > $null
$processExclusions.Add('cl.exe') > $null
$processExclusions.Add('dotnet.exe') > $null
$processExclusions.Add('msbuild.exe') > $null
$processExclusions.Add('node.exe') > $null
$processExclusions.Add('node.js') > $null
$processExclusions.Add('perfwatson2.exe') > $null
$processExclusions.Add('ServiceHub.Host.Node.x86.exe') > $null
$processExclusions.Add('vbcscompiler.exe') > $null
$processExclusions.Add('testhost.exe') > $null
$processExclusions.Add('datacollector.exe') > $null
$processExclusions.Add('IntelliTrace.exe') > $null
$processExclusions.Add('CodeCoverage.exe') > $null

# VSCode
$processExclusions.Add('C:\Program Files\Microsoft VS Code\Code.exe') > $null
$pathExclusions.Add('C:\Program Files\Microsoft VS Code') > $null

# Misc Dev
$extensionExclusions.Add(".h")   > $null
$extensionExclusions.Add(".c")   > $null
$extensionExclusions.Add(".cpp") > $null
$extensionExclusions.Add(".idb") > $null
$extensionExclusions.Add(".lib") > $null
$extensionExclusions.Add(".obj") > $null
$extensionExclusions.Add(".pdb") > $null
$extensionExclusions.Add(".sbr") > $null

$processExclusions.Add('git.exe') > $null
$processExclusions.Add('FBuild.exe') > $null
$processExclusions.Add('gitextensions.exe') > $null

# Unreal Specific
$processExclusions.Add('LPP_x64.exe') > $null
$processExclusions.Add('sublime_merge.exe') > $null
$processExclusions.Add('ShaderCompileWorker.exe') > $null
$processExclusions.Add('UE4Editor-Cmd.exe') > $null
$processExclusions.Add('UE4Editor.exe') > $null
$processExclusions.Add('UE4Editor-Win64-DebugGame.exe') > $null
$processExclusions.Add('UE4Editor-Win64-Debug.exe') > $null
$processExclusions.Add('UnrealHeaderTool.exe') > $null

# Bebylon Specific
$pathExclusions.Add($kl_bbassembladir) > $null

foreach ($exclusion in $pathExclusions)
{
    Write-Host "Adding Path Exclusion: " $exclusion -ForegroundColor Magenta -BackgroundColor Gray
    Add-MpPreference -ExclusionPath $exclusion
}

foreach ($exclusion in $processExclusions)
{
    Write-Host "Adding Process Exclusion: " $exclusion -ForegroundColor Magenta -BackgroundColor Gray
    Add-MpPreference -ExclusionProcess $exclusion
}

foreach ($exclusion in $extensionExclusions)
{
    Write-Host "Adding Extension Exclusion: " $exclusion -ForegroundColor Magenta -BackgroundColor Gray
    Add-MpPreference -ExclusionExtension $exclusion
}

Write-Host "" -ForegroundColor Magenta -BackgroundColor Gray
Write-Host "Your Exclusions:" -ForegroundColor Magenta -BackgroundColor Gray

$prefs = Get-MpPreference
$prefs.ExclusionPath
$prefs.ExclusionProcess
$prefs.ExclusionExtension

Write-Host "" -ForegroundColor Magenta -BackgroundColor Gray
Write-Host "Enjoy faster build times and coding!" -ForegroundColor Magenta -BackgroundColor Gray
Write-Host "" -ForegroundColor Magenta -BackgroundColor Gray
```
